import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#FAF5EC')
draw = ImageDraw.Draw(img)

# Luxury double border
margin = 22
draw.rectangle([margin, margin, W - margin, H - margin], outline='#B98A4E', width=2)
draw.rectangle([margin + 6, margin + 6, W - margin - 6, H - margin - 6], outline='#E2D3BD', width=1)

# Corner floral / ornamental brackets
def draw_corner(cx, cy, dx, dy):
    L = 36
    draw.line([(cx, cy), (cx + dx*L, cy)], fill='#B98A4E', width=2)
    draw.line([(cx, cy), (cx, cy + dy*L)], fill='#B98A4E', width=2)
    draw.line([(cx + dx*8, cy + dy*8), (cx + dx*L, cy + dy*8)], fill='#E2D3BD', width=1)
    draw.line([(cx + dx*8, cy + dy*8), (cx + dx*8, cy + dy*L)], fill='#E2D3BD', width=1)
    draw.polygon([(cx, cy-4*dy), (cx+4*dx, cy), (cx, cy+4*dy), (cx-4*dx, cy)], fill='#B98A4E')

draw_corner(margin+10, margin+10, 1, 1)
draw_corner(W-margin-10, margin+10, -1, 1)
draw_corner(margin+10, H-margin-10, 1, -1)
draw_corner(W-margin-10, H-margin-10, -1, -1)

# Helper for star ornament
def draw_star(x, y, r=4, color='#B98A4E'):
    draw.polygon([
        (x, y-r), (x+r*0.35, y-r*0.35), (x+r, y), (x+r*0.35, y+r*0.35),
        (x, y+r), (x-r*0.35, y+r*0.35), (x-r, y), (x-r*0.35, y-r*0.35)
    ], fill=color)

# Arched photo helper
def make_arch_mask(w, h, r):
    mask = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.rectangle([0, r, w, h], fill=255)
    d.ellipse([0, 0, w, 2*r], fill=255)
    return mask

# Photos
hero = Image.open('public/images/couple-hero.png').convert('RGB')
royal = Image.open('public/images/couple-royal.jpg').convert('RGB')

# Back frame (Royal)
bw, bh = 265, 435
royal_fit = ImageOps.fit(royal, (bw, bh), method=Image.Resampling.LANCZOS, centering=(0.5, 0.38))
mask_royal = make_arch_mask(bw, bh, 56)

# Front frame (Heritage)
fw, fh = 285, 465
hero_fit = ImageOps.fit(hero, (fw, fh), method=Image.Resampling.LANCZOS, centering=(0.5, 0.34))
mask_hero = make_arch_mask(fw, fh, 64)

# Drop shadows
def make_arch_shadow(w, h, r, blur=14, alpha=85):
    s = Image.new('RGBA', (w + 40, h + 40), (0,0,0,0))
    m = make_arch_mask(w, h, r)
    s_core = Image.new('RGBA', (w, h), (55, 42, 30, alpha))
    s.paste(s_core, (20, 20), m)
    return s.filter(ImageFilter.GaussianBlur(blur))

s_royal = make_arch_shadow(bw, bh, 56, 12, 75)
s_hero = make_arch_shadow(fw, fh, 64, 15, 95)

rx_back, ry_back = 650, 85
rx_front, ry_front = 855, 105

# Paste royal back frame
img.paste(s_royal, (rx_back - 20, ry_back - 20), s_royal)
border_r = Image.new('RGB', (bw + 8, bh + 8), '#B98A4E')
img.paste(border_r, (rx_back - 4, ry_back - 4), make_arch_mask(bw + 8, bh + 8, 60))
img.paste(royal_fit, (rx_back, ry_back), mask_royal)

# Paste hero front frame
img.paste(s_hero, (rx_front - 20, ry_front - 20), s_hero)
border_h = Image.new('RGB', (fw + 10, fh + 10), '#B98A4E')
img.paste(border_h, (rx_front - 5, ry_front - 5), make_arch_mask(fw + 10, fh + 10, 68))
img.paste(hero_fit, (rx_front, ry_front), mask_hero)

# Left Side Content
font_eyebrow = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 13)
font_script = ImageFont.truetype('C:/Windows/Fonts/VIVALDII.TTF', 62)
font_amp = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 38)
font_fullnames = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 13)
font_date = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 17)
font_venue_title = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 15)
font_venue_desc = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
font_tag = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 17)

lx = 76

# Eyebrow
draw_star(lx + 8, 80, 5, '#B98A4E')
draw.text((lx + 24, 73), 'WEDDING INVITATION', font=font_eyebrow, fill='#B98A4E')
draw_star(lx + 230, 80, 5, '#B98A4E')
draw.line([(lx, 102), (lx + 320, 102)], fill='#B98A4E', width=1)

# Couple Script Names
draw.text((lx, 122), 'Sushmita', font=font_script, fill='#46392C')
draw.text((lx + 245, 136), '&', font=font_amp, fill='#B98A4E')
draw.text((lx + 288, 122), 'Bhaskar', font=font_script, fill='#46392C')

# Full Names
draw.text((lx, 212), 'SUSHMITA PAUL CHOUDHURY  &  BHASKAR MONDAL', font=font_fullnames, fill='#7A6652')
draw.line([(lx, 240), (lx + 500, 240)], fill='#E5D3B8', width=1)

# Date badge
badge_w = 475
badge_h = 48
badge_y = 260
draw.rectangle([lx, badge_y, lx + badge_w, badge_y + badge_h], fill='#F4EDE0', outline='#B98A4E', width=1)
draw_star(lx + 22, badge_y + 24, 4, '#B98A4E')
draw.text((lx + 42, badge_y + 14), 'WEDNESDAY, 25TH NOVEMBER 2026', font=font_date, fill='#B98A4E')
draw_star(lx + badge_w - 22, badge_y + 24, 4, '#B98A4E')

# Wedding Venue Box
vy1 = 332
draw_star(lx + 6, vy1 + 8, 3, '#B98A4E')
draw.text((lx + 18, vy1), 'Wedding Ceremony · 11:00 AM Onwards', font=font_venue_title, fill='#46392C')
draw.text((lx + 18, vy1 + 24), 'Nepali Puja Mandap, Akongre, Tura, Meghalaya - 794001', font=font_venue_desc, fill='#695847')

# Reception Venue Box
vy2 = 406
draw_star(lx + 6, vy2 + 8, 3, '#B98A4E')
draw.text((lx + 18, vy2), 'Grand Reception · Saturday, 28th Nov 2026', font=font_venue_title, fill='#46392C')
draw.text((lx + 18, vy2 + 24), '224, Chalantapara pt 4, Bongaigaon, Assam - 783388', font=font_venue_desc, fill='#695847')

# Bottom Tagline
draw.line([(lx, 484), (lx + 500, 484)], fill='#E5D3B8', width=1)
draw.text((lx + 10, 502), 'Together since childhood. Forever begins now.', font=font_tag, fill='#8A7662')

# Save lossless with maximum compression
output_path = 'public/og-image.png'
img.save(output_path, format='PNG', optimize=True, compress_level=9)
print(f'Successfully saved lossless og-image.png ({os.path.getsize(output_path):,} bytes)')
