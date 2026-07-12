#!/usr/bin/env python3
"""Create safe, versioned 4:5 card crops from current product gallery heroes.

The script never segments or recolors the product. It only crops/extends the
complete source image, resizes it to a 4:5 canvas, applies mild sharpening, and
updates matching image paths in ``src/lib/data.ts``.
"""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
DATA_TS = ROOT / "src/lib/data.ts"
PUBLIC = ROOT / "public"
TARGET_SIZE = (1024, 1280)
TARGET_BG = np.array((248, 246, 243), dtype=np.int16)
MAX_ZOOM = 1.30
TARGET_FILL = 0.82
LIGHT_WORDS = (
    "white",
    "ivory",
    "cream",
    "beige",
    "off-white",
    "light-grey",
    "light-gray",
    "silver",
    "platinum",
)


def matching_bracket(text: str, start: int, opening: str, closing: str) -> int:
    depth = 0
    in_string = False
    escaped = False
    for index in range(start, len(text)):
        char = text[index]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
            continue
        if char == '"':
            in_string = True
        elif char == opening:
            depth += 1
        elif char == closing:
            depth -= 1
            if depth == 0:
                return index
    raise ValueError(f"Unclosed {opening} at {start}")


def top_level_objects(text: str, array_start: int) -> list[tuple[int, int]]:
    array_end = matching_bracket(text, array_start, "[", "]")
    objects: list[tuple[int, int]] = []
    index = array_start + 1
    while index < array_end:
        if text[index] == "{":
            end = matching_bracket(text, index, "{", "}")
            objects.append((index, end + 1))
            index = end + 1
        else:
            index += 1
    return objects


def hero_paths(text: str) -> list[str]:
    marker = "export const products: Product[] = ["
    products_start = text.index(marker)
    products_array = text.index("[", text.index("=", products_start))
    paths: list[str] = []
    for product_start, product_end in top_level_objects(text, products_array):
        product = text[product_start:product_end]
        colors_marker = product.find("colors: [")
        if colors_marker < 0:
            continue
        colors_array = product.index("[", colors_marker)
        for color_start, color_end in top_level_objects(product, colors_array):
            color = product[color_start:color_end]
            images_marker = color.find("images: [")
            if images_marker < 0:
                continue
            images_array = color.index("[", images_marker)
            image_objects = top_level_objects(color, images_array)
            if not image_objects:
                continue
            first_start, first_end = image_objects[0]
            first = color[first_start:first_end]
            match = re.search(r'src:\s*"(/products/[^"]+)"', first)
            if match and match.group(1) not in paths:
                paths.append(match.group(1))
    return paths


def is_light_path(web_path: str) -> bool:
    name = Path(web_path).name.lower()
    return any(word in name for word in LIGHT_WORDS)


def is_existing_card_asset(web_path: str) -> bool:
    stem = Path(web_path).stem.lower()
    return "-front-card" in stem or "-card-v" in stem or stem.endswith("-card")


def border_color(rgb: np.ndarray) -> np.ndarray:
    height, width = rgb.shape[:2]
    band = max(2, int(round(min(height, width) * 0.03)))
    border = np.zeros((height, width), dtype=bool)
    border[:band, :] = True
    border[-band:, :] = True
    border[:, :band] = True
    border[:, -band:] = True
    return np.median(rgb[border].reshape(-1, 3), axis=0)


def content_bbox(image: Image.Image) -> tuple[tuple[int, int, int, int], float]:
    preview = image.convert("RGB")
    preview.thumbnail((480, 480))
    rgb = np.asarray(preview, dtype=np.int16)
    height, width = rgb.shape[:2]
    background = border_color(rgb)

    band = max(2, int(round(min(height, width) * 0.03)))
    border = np.zeros((height, width), dtype=bool)
    border[:band, :] = True
    border[-band:, :] = True
    border[:, :band] = True
    border[:, -band:] = True
    border_distance = np.linalg.norm(rgb[border] - background, axis=1)
    threshold = max(11.0, float(np.percentile(border_distance, 99)) + 4.0)

    distance = np.linalg.norm(rgb - background, axis=2)
    luminance = rgb.mean(axis=2)
    saturation = rgb.max(axis=2) - rgb.min(axis=2)
    background_luminance = float(background.mean())
    mask = (
        (distance > threshold)
        | ((saturation > 22) & (luminance < background_luminance + 10))
        | (luminance < background_luminance - 20)
    )
    mask = ndimage.binary_opening(mask, iterations=1)
    mask = ndimage.binary_closing(mask, iterations=2)

    labels, count = ndimage.label(mask)
    kept = np.zeros_like(mask)
    minimum_area = max(16, int(width * height * 0.0006))
    for label in range(1, count + 1):
        component = labels == label
        if int(component.sum()) >= minimum_area:
            kept |= component

    ys, xs = np.where(kept)
    if len(xs) == 0:
        return (0, 0, image.width, image.height), 0.0

    left, top, right, bottom = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    bbox_area = (right - left) * (bottom - top)
    confidence = min(1.0, bbox_area / max(1, width * height * 0.12))
    touches_three_edges = sum(
        (
            left <= 1,
            top <= 1,
            right >= width - 1,
            bottom >= height - 1,
        )
    ) >= 3
    if touches_three_edges:
        return (0, 0, image.width, image.height), 0.1

    scale_x = image.width / width
    scale_y = image.height / height
    return (
        int(left * scale_x),
        int(top * scale_y),
        int(math.ceil(right * scale_x)),
        int(math.ceil(bottom * scale_y)),
    ), confidence


def crop_box(
    size: tuple[int, int],
    bbox: tuple[int, int, int, int],
    confidence: float,
    conservative: bool,
) -> tuple[float, float, float, float]:
    width, height = size
    left, top, right, bottom = bbox
    bbox_width = max(1.0, right - left)
    bbox_height = max(1.0, bottom - top)

    base_width = min(width, height * 0.8)
    if confidence < 0.35:
        desired_width = base_width
    else:
        desired_width = max(
            bbox_width / TARGET_FILL,
            bbox_height * 0.8 / TARGET_FILL,
        )
        desired_width = max(desired_width, base_width / (1.12 if conservative else MAX_ZOOM))

    desired_width = min(desired_width, base_width * 1.22)
    desired_height = desired_width / 0.8
    center_x = (left + right) / 2

    # Keep a stable premium baseline: roughly 10% below the product.
    crop_bottom = bottom + desired_height * 0.10
    crop_top = crop_bottom - desired_height
    if crop_top > top - desired_height * 0.08:
        crop_top = top - desired_height * 0.08
    crop_left = center_x - desired_width / 2
    return crop_left, crop_top, crop_left + desired_width, crop_top + desired_height


def sampled_canvas_color(image: Image.Image) -> tuple[int, int, int]:
    rgb = np.asarray(image.convert("RGB"), dtype=np.int16)
    sampled = np.rint(border_color(rgb)).astype(np.int16)
    if int(np.max(np.abs(sampled - TARGET_BG))) <= 2:
        sampled = TARGET_BG
    return tuple(int(value) for value in sampled)


def render_card_image(
    source: Path,
    destination: Path,
    conservative: bool,
) -> dict[str, object]:
    image = Image.open(source).convert("RGB")
    bbox, confidence = content_bbox(image)
    left, top, right, bottom = crop_box(image.size, bbox, confidence, conservative)

    pad_left = max(0, int(math.ceil(-left)))
    pad_top = max(0, int(math.ceil(-top)))
    pad_right = max(0, int(math.ceil(right - image.width)))
    pad_bottom = max(0, int(math.ceil(bottom - image.height)))
    if any((pad_left, pad_top, pad_right, pad_bottom)):
        canvas = Image.new(
            "RGB",
            (
                image.width + pad_left + pad_right,
                image.height + pad_top + pad_bottom,
            ),
            sampled_canvas_color(image),
        )
        canvas.paste(image, (pad_left, pad_top))
        image = canvas
        left += pad_left
        right += pad_left
        top += pad_top
        bottom += pad_top

    cropped = image.crop(
        (
            int(round(left)),
            int(round(top)),
            int(round(right)),
            int(round(bottom)),
        )
    )
    rendered = cropped.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
    rendered = rendered.filter(ImageFilter.UnsharpMask(radius=0.8, percent=45, threshold=3))
    destination.parent.mkdir(parents=True, exist_ok=True)
    rendered.save(destination, "WEBP", quality=93, method=6)
    return {
        "sourceSize": list(Image.open(source).size),
        "bbox": list(bbox),
        "confidence": round(confidence, 3),
        "crop": [round(value, 1) for value in (left, top, right, bottom)],
        "lightConservative": conservative,
    }


def versioned_card_path(web_path: str) -> str:
    path = Path(web_path)
    stem = path.stem
    version_match = re.search(r"-v(\d+)$", stem)
    source_version = int(version_match.group(1)) if version_match else 1
    base = re.sub(r"-v\d+$", "", stem)
    if "-card" not in base:
        base += "-card"
    version = source_version + 1
    candidate = path.with_name(f"{base}-v{version}.webp")
    while (PUBLIC / str(candidate).lstrip("/")).exists():
        version += 1
        candidate = path.with_name(f"{base}-v{version}.webp")
    return "/" + str(candidate).lstrip("/")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--include-existing-card", action="store_true")
    parser.add_argument("--only-non-45", action="store_true")
    parser.add_argument(
        "--report",
        default="scripts/premium-card-photo-report.json",
    )
    args = parser.parse_args()

    text = DATA_TS.read_text()
    heroes = hero_paths(text)
    report: dict[str, object] = {
        "heroCount": len(heroes),
        "processed": [],
        "skippedExistingCard": [],
        "skippedAlready45": [],
        "skippedLifestyle": [],
        "missing": [],
    }
    replacements: dict[str, str] = {}

    for web_path in heroes:
        source = PUBLIC / web_path.lstrip("/")
        if not source.exists():
            report["missing"].append(web_path)
            continue
        if "lifestyle" in source.name.lower():
            report["skippedLifestyle"].append(web_path)
            continue
        if args.only_non_45:
            with Image.open(source) as image:
                if abs(image.width / image.height - 0.8) <= 0.01:
                    report["skippedAlready45"].append(web_path)
                    continue
        if is_existing_card_asset(web_path) and not args.include_existing_card:
            report["skippedExistingCard"].append(web_path)
            continue

        new_web_path = versioned_card_path(web_path)
        entry: dict[str, object] = {
            "source": web_path,
            "output": new_web_path,
        }
        if args.apply:
            entry.update(
                render_card_image(
                    source,
                    PUBLIC / new_web_path.lstrip("/"),
                    conservative=is_light_path(web_path),
                )
            )
            replacements[web_path] = new_web_path
        report["processed"].append(entry)

    if args.apply:
        for old_path, new_path in replacements.items():
            text = text.replace(f'src: "{old_path}"', f'src: "{new_path}"')
        DATA_TS.write_text(text)

    report_path = ROOT / args.report
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print(
        json.dumps(
            {
                "heroes": len(heroes),
                "processed": len(report["processed"]),
                "existingCard": len(report["skippedExistingCard"]),
                "already45": len(report["skippedAlready45"]),
                "lifestyle": len(report["skippedLifestyle"]),
                "missing": len(report["missing"]),
                "applied": args.apply,
            },
            ensure_ascii=False,
        )
    )
    return 0 if not report["missing"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
