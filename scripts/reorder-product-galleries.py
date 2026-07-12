#!/usr/bin/env python3
"""Put product gallery images into a consistent premium viewing sequence."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_TS = ROOT / "src/lib/data.ts"


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


def image_objects(text: str, array_start: int) -> list[str]:
    array_end = matching_bracket(text, array_start, "[", "]")
    objects: list[str] = []
    index = array_start + 1
    while index < array_end:
        if text[index] == "{":
            end = matching_bracket(text, index, "{", "}")
            objects.append(text[index : end + 1])
            index = end + 1
        else:
            index += 1
    return objects


def source_path(image_object: str) -> str:
    match = re.search(r'src:\s*"([^"]+)"', image_object)
    return match.group(1) if match else ""


def gallery_rank(image_object: str, original_index: int) -> tuple[int, int]:
    name = Path(source_path(image_object)).stem.lower()
    if "lifestyle" in name:
        return 70, original_index
    if "-front-card" in name or "-card-v" in name or name.endswith("-card"):
        return 0, original_index
    if "front-alt" in name or "angle" in name:
        return 10, original_index
    if "front" in name:
        return 5, original_index
    if "back" in name:
        return 20, original_index
    if "side" in name:
        return 30, original_index
    if "open" in name or "inside" in name:
        return 40, original_index
    if any(marker in name for marker in ("detail", "top", "set")):
        return 50, original_index
    return 60, original_index


def main() -> int:
    text = DATA_TS.read_text()
    marker = "export const products: Product[] = ["
    products_start = text.index(marker)
    products_array = text.index("[", text.index("=", products_start))
    products_end = matching_bracket(text, products_array, "[", "]")

    arrays: list[tuple[int, int]] = []
    for match in re.finditer(r"\bimages:\s*\[", text[products_array:products_end]):
        array_start = products_array + match.end() - 1
        arrays.append((array_start, matching_bracket(text, array_start, "[", "]")))

    changed = 0
    for array_start, array_end in reversed(arrays):
        objects = image_objects(text, array_start)
        if len(objects) < 2:
            continue
        ranked = sorted(
            enumerate(objects),
            key=lambda item: gallery_rank(item[1], item[0]),
        )
        reordered = [image_object for _, image_object in ranked]
        if reordered == objects:
            continue

        line_start = text.rfind("\n", 0, array_start) + 1
        property_indent = re.match(r"\s*", text[line_start:array_start]).group(0)
        item_indent = property_indent + "  "
        content = "\n" + item_indent + (",\n" + item_indent).join(reordered)
        content += ",\n" + property_indent
        text = text[: array_start + 1] + content + text[array_end:]
        changed += 1

    DATA_TS.write_text(text)
    print(f"gallery arrays: {len(arrays)}, reordered: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
