"""Post-process hero body PNGs:
1. Erase the AI watermark strip (bottom-left).
2. Detect the transparent 'frame hole' bounding box so the real photo can be
   positioned exactly behind it. Prints relative coords for the Hero component.
"""
from pathlib import Path

import numpy as np
from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "public" / "images"


def hole_bbox(alpha: np.ndarray):
    """BBox of transparent pixels not connected to the border (the card hole)."""
    h, w = alpha.shape
    small = np.array(Image.fromarray(alpha).resize((w // 4, h // 4), Image.NEAREST))
    sh, sw = small.shape
    exterior = np.zeros_like(small, dtype=bool)
    stack = []
    for x in range(sw):
        for y in (0, sh - 1):
            if small[y, x] < 128 and not exterior[y, x]:
                stack.append((y, x))
    for y in range(sh):
        for x in (0, sw - 1):
            if small[y, x] < 128 and not exterior[y, x]:
                stack.append((y, x))
    while stack:
        y, x = stack.pop()
        if exterior[y, x] or small[y, x] >= 128:
            continue
        exterior[y, x] = True
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < sh and 0 <= nx < sw and not exterior[ny, nx] and small[ny, nx] < 128:
                stack.append((ny, nx))
    hole = (small < 128) & ~exterior
    ys, xs = np.where(hole)
    if len(ys) == 0:
        return None
    return xs.min() / sw, ys.min() / sh, xs.max() / sw, ys.max() / sh


for name in ("body-groom.png", "body-bride.png"):
    p = IMG / name
    im = Image.open(p).convert("RGBA")
    a = np.array(im)

    # 1. erase watermark strip (bottom-left)
    h, w = a.shape[:2]
    a[int(h * 0.925):, : int(w * 0.22), 3] = 0

    # 2. measure hole BEFORE flattening
    bbox = hole_bbox(a[:, :, 3])

    Image.fromarray(a).save(p)
    if bbox:
        print(f"{name}: hole left={bbox[0]:.4f} top={bbox[1]:.4f} right={bbox[2]:.4f} bottom={bbox[3]:.4f}")
    else:
        print(f"{name}: NO HOLE FOUND")
