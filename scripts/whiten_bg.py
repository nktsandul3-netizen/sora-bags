#!/usr/bin/env python3
"""Safe studio-background cleaner for product photos.

Strategy (conservative, protects light/white bags):
  1. Detect studio shots only (uniform light border). Lifestyle / scene
     photos are skipped entirely.
  2. Background = light + low-saturation pixels that are connected to the
     image border via a flood fill, where strong EDGES act as walls. A bag's
     outline (even a faint white-on-white one) plus its drop shadow stop the
     fill from leaking into the product.
  3. binary_fill_holes re-solidifies the product so we never punch holes
     inside the bag.
  4. Safety guard: if too little product remains (bag would be destroyed),
     the file is left untouched.

Modes:
  test  -> writes results + gray-composite previews to an output dir, never
           touches originals.
  apply -> backs up each original under .image-backups/ then rewrites it,
           auto-reverting any file that fails the safety guard.
"""
from __future__ import annotations

import argparse
import os
import shutil
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

# --- tunables ---------------------------------------------------------------
LIGHT_MIN = 222          # min channel value to count as "light" (studio test)
LOWSAT_MAX = 24          # max(channel) - min(channel) to count as low-sat
BORDER_BAND_FRAC = 0.03  # outer ring used to judge "is this a studio shot"
STUDIO_BORDER_LIGHT = 0.90
STUDIO_BORDER_LUM_STD = 22.0
EDGE_THRESHOLD = 60.0    # sobel magnitude treated as a wall
MIN_PRODUCT_REMAIN = 0.10  # abort if product would be < 10% of the image
BG_COLOR_TOL = 12        # per-channel tolerance around the sampled bg color
BG_SAT_MAX = 14          # max channel spread to still count as background


def _masks(rgb: np.ndarray):
    r, g, b = (rgb[..., i].astype(int) for i in range(3))
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    light = (mn > LIGHT_MIN) & ((mx - mn) < LOWSAT_MAX)
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    return light, gray


def _is_studio(light: np.ndarray, gray: np.ndarray):
    h, w = light.shape
    band = max(2, int(round(min(h, w) * BORDER_BAND_FRAC)))
    border = np.zeros_like(light)
    border[:band, :] = True
    border[-band:, :] = True
    border[:, :band] = True
    border[:, -band:] = True
    blf = float(light[border].mean())
    bstd = float(gray[border].std())
    ok = blf >= STUDIO_BORDER_LIGHT and bstd <= STUDIO_BORDER_LUM_STD
    return ok, blf, bstd


def _bg_color(rgb: np.ndarray, light: np.ndarray) -> np.ndarray:
    """Median color of the light border ring = the real backdrop color."""
    h, w = light.shape
    band = max(2, int(round(min(h, w) * BORDER_BAND_FRAC)))
    border = np.zeros((h, w), bool)
    border[:band, :] = True
    border[-band:, :] = True
    border[:, :band] = True
    border[:, -band:] = True
    sel = border & light
    if sel.sum() < 50:
        sel = border
    return np.median(rgb[sel].reshape(-1, 3), axis=0)


def compute_background(rgb: np.ndarray):
    """Return (bg_mask, info). bg_mask is None when the file should be skipped."""
    light, gray = _masks(rgb)
    studio, blf, bstd = _is_studio(light, gray)
    info = {"border_light": round(blf, 3), "border_lum_std": round(bstd, 1)}
    if not studio:
        info["reason"] = "not-studio"
        return None, info

    # Background candidate = pixels close to the *sampled backdrop color*
    # (not merely "light"), so off-white / cream / white bag bodies are spared.
    bgc = _bg_color(rgb, light)
    diff = np.abs(rgb.astype(int) - bgc.astype(int))
    r, g, b = (rgb[..., i].astype(int) for i in range(3))
    spread = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)
    near_bg = (diff <= BG_COLOR_TOL).all(axis=2) & (spread <= BG_SAT_MAX)
    info["bg_color"] = [int(x) for x in bgc.round()]

    sx = ndimage.sobel(gray, axis=0)
    sy = ndimage.sobel(gray, axis=1)
    grad = np.hypot(sx, sy)
    edge = grad > EDGE_THRESHOLD

    passable = near_bg & (~edge)
    lbl, _ = ndimage.label(passable)
    border_labels = set(lbl[0, :]) | set(lbl[-1, :]) | set(lbl[:, 0]) | set(lbl[:, -1])
    border_labels.discard(0)
    if not border_labels:
        info["reason"] = "no-border-bg"
        return None, info
    bg = np.isin(lbl, list(border_labels))

    # grab the faint anti-aliased ring (pixels near bg color just inside wall)
    bg = ndimage.binary_dilation(bg, iterations=1) & near_bg
    # re-solidify the product so no holes are punched inside the bag
    product = ndimage.binary_fill_holes(~bg)
    bg = ~product

    remain = float(product.mean())
    info["product_remain"] = round(remain, 3)
    info["removed"] = round(float(bg.mean()), 3)
    if remain < MIN_PRODUCT_REMAIN:
        info["reason"] = "would-destroy-product"
        return None, info
    return bg, info


def apply_to_image(path: str, bg: np.ndarray, mode_bg: str) -> Image.Image:
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    if mode_bg == "white":
        arr[..., 0][bg] = 255
        arr[..., 1][bg] = 255
        arr[..., 2][bg] = 255
        arr[..., 3] = 255
        return Image.fromarray(arr, "RGBA").convert("RGB")
    # transparent
    arr[..., 3][bg] = 0
    return Image.fromarray(arr, "RGBA")


def gray_preview(path: str, bg: np.ndarray) -> Image.Image:
    """Composite the cut-out over flat gray so eaten areas are obvious."""
    im = Image.open(path).convert("RGB")
    arr = np.array(im)
    arr[bg] = (190, 190, 190)
    return Image.fromarray(arr, "RGB")


def process_one(path: str, mode: str, mode_bg: str, out_dir: str, backup_root: str):
    try:
        rgb = np.array(Image.open(path).convert("RGB"))
    except Exception as e:  # noqa: BLE001
        return ("error", path, str(e))

    bg, info = compute_background(rgb)
    if bg is None:
        return ("skip", path, info)

    ext = os.path.splitext(path)[1].lower()
    is_jpg = ext in (".jpg", ".jpeg")
    out_bg = "white" if is_jpg else mode_bg

    if mode == "test":
        rel = os.path.relpath(path, "public/products").replace(os.sep, "__")
        os.makedirs(out_dir, exist_ok=True)
        result = apply_to_image(path, bg, out_bg)
        result.save(os.path.join(out_dir, "AFTER__" + rel.rsplit(".", 1)[0] + ".png"))
        gray_preview(path, bg).save(
            os.path.join(out_dir, "CHECK__" + rel.rsplit(".", 1)[0] + ".png")
        )
        return ("test", path, info)

    # apply
    backup_path = os.path.join(backup_root, os.path.relpath(path, "public/products"))
    if not os.path.exists(backup_path):
        os.makedirs(os.path.dirname(backup_path), exist_ok=True)
        shutil.copy2(path, backup_path)
    result = apply_to_image(path, bg, out_bg)
    save_path = path
    if is_jpg:
        result.save(save_path, quality=92)
    else:
        result.save(save_path)
    return ("apply", path, info)


def gather(paths):
    exts = {".png", ".webp", ".jpg", ".jpeg"}
    files = []
    for p in paths:
        if os.path.isdir(p):
            for root, _dirs, names in os.walk(p):
                for n in names:
                    if os.path.splitext(n)[1].lower() in exts:
                        files.append(os.path.join(root, n))
        elif os.path.splitext(p)[1].lower() in exts:
            files.append(p)
    return sorted(files)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", choices=["test", "apply"], default="test")
    ap.add_argument("--bg", choices=["transparent", "white"], default="transparent")
    ap.add_argument("--out", default="/tmp/whiten_test")
    ap.add_argument("--backup", default=".image-backups")
    ap.add_argument("--skip-lifestyle", action="store_true", default=True)
    ap.add_argument("paths", nargs="+")
    args = ap.parse_args()

    files = gather(args.paths)
    counts = {"apply": 0, "test": 0, "skip": 0, "error": 0}
    skip_reasons = {}
    for f in files:
        if args.skip_lifestyle and "lifestyle" in os.path.basename(f).lower():
            counts["skip"] += 1
            skip_reasons["lifestyle"] = skip_reasons.get("lifestyle", 0) + 1
            continue
        status, path, info = process_one(f, args.mode, args.bg, args.out, args.backup)
        counts[status] += 1
        if status == "skip":
            reason = info.get("reason", "?")
            skip_reasons[reason] = skip_reasons.get(reason, 0) + 1
        if status in ("test", "apply") or status == "error":
            print(f"{status:6} {os.path.relpath(path,'public/products')}  {info}")
    print("---")
    print("counts:", counts)
    print("skip reasons:", skip_reasons)


if __name__ == "__main__":
    main()
