"""Generate warm, elegant placeholder photos for the wedding invitation template.

Every image is a soft gradient composition with abstract botanical shapes so the
template looks premium out of the box and every photo is replaceable via config.
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)

# Warm romantic palette
PALETTES = [
    ["#f7ede2", "#eed9c4", "#e2c4a8"],
    ["#f5e8dd", "#e9d3c0", "#d9b8a0"],
    ["#f8f0e6", "#ecdcC8".lower(), "#dcc3a5"],
    ["#f6ebe0", "#e8d5be", "#d4b595"],
    ["#f9f1e7", "#efe0cd", "#e0c8ac"],
    ["#f4e6d8", "#e6d0b8", "#d2b294"],
    ["#f8ece1", "#ead8c2", "#dabfa2"],
    ["#f5e9de", "#e7d4bd", "#d6b899"],
]
GOLD = (196, 154, 92)
DARK = (122, 96, 66)


def vertical_gradient(size, colors):
    w, h = size
    base = Image.new("RGB", size, colors[0])
    top = Image.new("RGB", size, colors[2])
    mask = Image.linear_gradient("L").resize(size)
    return Image.composite(base, top, mask)


def add_blob(draw, cx, cy, r, color, alpha=60):
    overlay_color = color + (alpha,)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=overlay_color)


def add_leaf_sprig(draw, cx, cy, angle, length, color, alpha=110):
    """Draw a simple elegant leaf sprig."""
    dx, dy = math.cos(angle), math.sin(angle)
    ex, ey = cx + dx * length, cy + dy * length
    draw.line([cx, cy, ex, ey], fill=color + (alpha,), width=max(2, length // 40))
    steps = 5
    for i in range(1, steps + 1):
        t = i / (steps + 1)
        px, py = cx + dx * length * t, cy + dy * length * t
        for side in (-1, 1):
            la = angle + side * 0.9
            lr = length * 0.16 * (1 - t * 0.5)
            lx, ly = px + math.cos(la) * lr, py + math.sin(la) * lr
            lw = lr * 0.45
            draw.ellipse([min(px, lx) - lw * 0.4, min(py, ly) - lw * 0.4,
                          max(px, lx) + lw * 0.4, max(py, ly) + lw * 0.4],
                         fill=color + (alpha - 20,))


def make_image(name, size, palette, seed, silhouettes=None):
    random.seed(seed)
    img = vertical_gradient(size, palette).convert("RGBA")
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    w, h = size

    # soft light blobs
    for _ in range(6):
        cx, cy = random.randint(0, w), random.randint(0, h)
        r = random.randint(w // 8, w // 3)
        add_blob(d, cx, cy, r, (255, 252, 246), alpha=random.randint(24, 55))

    # optional human-like silhouettes (soft abstract figures)
    if silhouettes:
        for sx, sy, sr, col in silhouettes:
            add_blob(d, sx, sy, sr, col, alpha=70)
            add_blob(d, sx, sy - int(sr * 1.6), int(sr * 0.55), col, alpha=70)

    # botanical sprigs in corners
    for corner in [(w * 0.08, h * 0.12, 0.6), (w * 0.92, h * 0.88, -2.4),
                   (w * 0.9, h * 0.1, 2.2), (w * 0.1, h * 0.9, -0.6)]:
        add_leaf_sprig(d, corner[0], corner[1], corner[2],
                       random.randint(w // 6, w // 4), DARK, alpha=70)

    # scattered petals
    for _ in range(10):
        cx, cy = random.randint(0, w), random.randint(0, h)
        r = random.randint(4, 12)
        add_blob(d, cx, cy, r, GOLD, alpha=random.randint(30, 70))

    layer = layer.filter(ImageFilter.GaussianBlur(6))
    img = Image.alpha_composite(img, layer)

    # vignette
    vign = Image.new("L", size, 0)
    vd = ImageDraw.Draw(vign)
    vd.ellipse([-w * 0.25, -h * 0.25, w * 1.25, h * 1.25], fill=255)
    vign = vign.filter(ImageFilter.GaussianBlur(w // 6))
    dark = Image.new("RGBA", size, (90, 70, 50, 255))
    img = Image.composite(img, dark, vign)

    # fine grain
    grain = Image.effect_noise(size, 14).convert("L")
    img = Image.composite(img, Image.new("RGBA", size, (60, 45, 30, 255)),
                          grain.point(lambda p: 255 - p // 14))
    img.convert("RGB").save(OUT / name, quality=88)
    print("wrote", name)


SKIN = (236, 200, 168)
SUIT = (210, 188, 152)
DRESS = (252, 250, 246)
HAIR = (150, 118, 88)

# Childhood photo placeholders (square frames)
make_image("childhood-groom.jpg", (900, 900), PALETTES[0], 11,
           silhouettes=[(450, 560, 190, SKIN)])
make_image("childhood-bride.jpg", (900, 900), PALETTES[1], 22,
           silhouettes=[(450, 560, 190, (242, 208, 178))])

# Realistic portrait placeholders (the "grown-up" reveal)
make_image("portrait-groom.jpg", (900, 1200), PALETTES[2], 33,
           silhouettes=[(450, 760, 230, SUIT)])
make_image("portrait-bride.jpg", (900, 1200), PALETTES[3], 44,
           silhouettes=[(450, 760, 230, DRESS)])
make_image("couple-portrait.jpg", (1400, 1000), PALETTES[4], 55,
           silhouettes=[(520, 640, 220, SUIT), (880, 640, 220, DRESS)])

# Gallery (masonry: mixed aspect ratios)
make_image("gallery-1.jpg", (900, 1200), PALETTES[0], 61)
make_image("gallery-2.jpg", (900, 700), PALETTES[1], 62)
make_image("gallery-3.jpg", (900, 1100), PALETTES[2], 63)
make_image("gallery-4.jpg", (900, 900), PALETTES[3], 64)
make_image("gallery-5.jpg", (900, 1300), PALETTES[4], 65)
make_image("gallery-6.jpg", (900, 750), PALETTES[5], 66)
make_image("gallery-7.jpg", (900, 1050), PALETTES[6], 67)
make_image("gallery-8.jpg", (900, 950), PALETTES[7], 68)

# Family portraits
make_image("family-bride.jpg", (1200, 800), PALETTES[5], 71,
           silhouettes=[(400, 500, 140, DRESS), (800, 500, 140, SUIT)])
make_image("family-groom.jpg", (1200, 800), PALETTES[6], 72,
           silhouettes=[(400, 500, 140, SUIT), (800, 500, 140, DRESS)])

print("done ->", OUT)
