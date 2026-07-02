#!/usr/bin/env python3
"""Remove 'full grain' from quoted strings in catalog files (safe — preserves indentation)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ROOT / "src/lib/data.ts",
    ROOT / ".cursor/rules/product-catalog-conventions.mdc",
]


def clean_string(s: str) -> str:
    s = re.sub(r"Premium Full Grain Leather", "Premium Leather", s, flags=re.I)
    s = re.sub(r"Full Grain Leather", "Leather", s, flags=re.I)
    s = s.replace(" на основе кожи full grain", "")
    s = s.replace("(кожа full grain)", "")
    s = re.sub(r"(кож[аи]|Кож[аи])\s+full\s+grain", r"\1", s, flags=re.I)
    s = re.sub(r"\bfull\s+grain\b", "", s, flags=re.I)
    s = re.sub(r"  +", " ", s)
    s = re.sub(r" ,", ",", s)
    return s


def process(text: str) -> str:
    out: list[str] = []
    i = 0
    in_str = False
    quote = ""
    buf: list[str] = []

    while i < len(text):
        c = text[i]
        if not in_str and c in "\"'":
            in_str = True
            quote = c
            out.append("".join(buf))
            buf = [c]
        elif in_str:
            buf.append(c)
            if c == quote and (i == 0 or text[i - 1] != "\\"):
                in_str = False
                raw = "".join(buf)
                inner = clean_string(raw[1:-1])
                out.append(quote + inner + quote)
                buf = []
        else:
            buf.append(c)
        i += 1

    if buf:
        out.append("".join(buf))
    return "".join(out)


def main() -> int:
    for path in TARGETS:
        if not path.exists():
            print(f"skip missing: {path}")
            continue
        original = path.read_text()
        updated = process(original)
        if updated != original:
            path.write_text(updated)
            print(f"updated {path.relative_to(ROOT)}")
        else:
            print(f"unchanged {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
