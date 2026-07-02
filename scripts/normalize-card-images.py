#!/usr/bin/env python3
"""Normalize product card hero images to 4:5 white canvas for seamless grid display."""

from __future__ import annotations

import re
import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DATA_TS = ROOT / "src/lib/data.ts"
PUBLIC = ROOT / "public"

TARGET_W = 1024
TARGET_H = 1280  # 4:5 portrait — matches aspect-[4/5] cards
BG = (255, 255, 255)
FILL = 0.9  # max fraction of canvas used by product


def is_similar(a: tuple[int, int, int], b: tuple[int, int, int], tol: int = 18) -> bool:
    return max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2])) <= tol


def background_mask(im: Image.Image) -> list[list[bool]]:
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    visited = [[False] * w for _ in range(h)]
    bg = [[False] * w for _ in range(h)]

    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    for sx, sy in seeds:
        if visited[sy][sx]:
            continue
        ref = px[sx, sy]
        q: deque[tuple[int, int]] = deque([(sx, sy)])
        visited[sy][sx] = True
        while q:
            x, y = q.popleft()
            if not is_similar(px[x, y], ref):
                continue
            bg[y][x] = True
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                    visited[ny][nx] = True
                    q.append((nx, ny))
    return bg


def content_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    bg = background_mask(im)

    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if bg[y][x]:
                continue
            r, g, b = px[x, y]
            if r > 252 and g > 252 and b > 252:
                continue
            found = True
            minx, miny = min(minx, x), min(miny, y)
            maxx, maxy = max(maxx, x), max(maxy, y)

    if not found:
        return 0, 0, w, h

    pad_x = int((maxx - minx) * 0.02) + 8
    pad_y = int((maxy - miny) * 0.02) + 8
    return (
        max(0, minx - pad_x),
        max(0, miny - pad_y),
        min(w, maxx + pad_x),
        min(h, maxy + pad_y),
    )


def normalize_image(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    box = content_bbox(im)
    cropped = im.crop(box)

    cw, ch = cropped.size
    max_w = int(TARGET_W * FILL)
    max_h = int(TARGET_H * FILL)
    scale = min(max_w / cw, max_h / ch)
    nw, nh = max(1, int(cw * scale)), max(1, int(ch * scale))
    resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (*BG, 255))
    ox = (TARGET_W - nw) // 2
    oy = (TARGET_H - nh) // 2
    canvas.paste(resized, (ox, oy), resized)
    canvas.convert("RGB").save(dst, "PNG", optimize=True)


def card_paths_from_data() -> list[str]:
    text = DATA_TS.read_text()
    blocks = re.split(r"\n  \{", text)
    paths: set[str] = set()
    for block in blocks:
        if 'galleryFit: "contain"' not in block:
            continue
        for match in re.finditer(r'images: \[\s*\{ src: "([^"]+)"', block):
            paths.add(match.group(1))
    return sorted(paths)


def main() -> int:
    paths = card_paths_from_data()
    updated: list[tuple[str, str]] = []
    skipped = 0

    for web_path in paths:
        src = PUBLIC / web_path.lstrip("/")
        if not src.exists():
            print(f"skip missing: {web_path}")
            skipped += 1
            continue
        stem = src.stem
        if stem.endswith("-card"):
            continue
        dst = src.with_name(f"{stem}-card.png")
        try:
            normalize_image(src, dst)
            updated.append((web_path, web_path.rsplit(".", 1)[0] + "-card.png"))
            print(f"ok {web_path} -> {dst.name}")
        except Exception as exc:  # noqa: BLE001
            print(f"fail {web_path}: {exc}")
            skipped += 1

    if not updated:
        print("No images processed.")
        return 1

    text = DATA_TS.read_text()
    for old, new in updated:
        text = text.replace(f'src: "{old}"', f'src: "{new}"')
    DATA_TS.write_text(text)
    print(f"\nProcessed {len(updated)} images, skipped {skipped}. Updated data.ts.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
