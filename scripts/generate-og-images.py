#!/usr/bin/env python3
"""
Generate OG images (1200x630) for each page of the TechTime website.
Each image features the page title, description, and TechTime branding.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import textwrap

# Constants
WIDTH = 1200
HEIGHT = 630
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'og')
LOGO_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'logo-white.png')

# Colors
BG_COLOR = (10, 22, 40)        # #0A1628
ACCENT_COLOR = (0, 217, 255)   # #00D9FF
TEXT_WHITE = (255, 255, 255)
TEXT_GRAY = (156, 163, 175)
ACCENT_DARK = (0, 100, 120)

# Fonts
JP_FONT_PATH = '/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf'
EN_FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

# Page definitions: route -> (title, description, icon_text)
PAGES = {
    'home': {
        'title': 'AI駆動の低価格\n基幹システム開発',
        'description': '従来の半分以下のコストで御社専用の基幹システムを構築',
        'icon': 'AI',
        'accent': (0, 217, 255),
    },
    'web-design': {
        'title': 'Webサイト制作',
        'description': 'コーポレートサイトからEC、Webアプリまで\nAI駆動のデザイン・開発で高品質なWebサイトを制作',
        'icon': 'Web',
        'accent': (123, 97, 255),
    },
    'systems': {
        'title': '対応システム',
        'description': '文書管理、在庫管理、顧客管理など\n各種基幹システムに対応',
        'icon': 'SYS',
        'accent': (0, 217, 255),
    },
    'simulator': {
        'title': '見積もり\nシミュレーター',
        'description': 'システム種別と規模を選択するだけで\n概算金額をその場で算出',
        'icon': '¥',
        'accent': (16, 185, 129),
    },
    'ai-development': {
        'title': 'AI駆動開発',
        'description': '設計書作成からコーディング、テストまで\nAIが開発を加速',
        'icon': 'AI',
        'accent': (139, 92, 246),
    },
    'quality-assurance': {
        'title': '品質保証',
        'description': '多段階レビューと自動テストで\n確実な品質を担保',
        'icon': 'QA',
        'accent': (245, 158, 11),
    },
    'about': {
        'title': '会社概要',
        'description': 'AI駆動開発で企業の基幹システム開発に\n革新をもたらします',
        'icon': 'Co.',
        'accent': (59, 130, 246),
    },
    'contact': {
        'title': 'お問い合わせ',
        'description': 'システム開発に関するご相談\nお見積もりのご依頼はこちら',
        'icon': '✉',
        'accent': (236, 72, 153),
    },
    'blog': {
        'title': 'ブログ',
        'description': 'AI駆動開発、システム開発のノウハウなど\n役立つ情報を発信',
        'icon': 'Blog',
        'accent': (34, 197, 94),
    },
    'cases': {
        'title': '開発事例',
        'description': '様々な業種・規模の\nプロジェクト実績をご紹介',
        'icon': '★',
        'accent': (251, 146, 60),
    },
}


def draw_rounded_rect(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    x0, y0, x1, y1 = xy
    draw.rectangle([x0 + radius, y0, x1 - radius, y1], fill=fill)
    draw.rectangle([x0, y0 + radius, x1, y1 - radius], fill=fill)
    draw.pieslice([x0, y0, x0 + 2 * radius, y0 + 2 * radius], 180, 270, fill=fill)
    draw.pieslice([x1 - 2 * radius, y0, x1, y0 + 2 * radius], 270, 360, fill=fill)
    draw.pieslice([x0, y1 - 2 * radius, x0 + 2 * radius, y1], 90, 180, fill=fill)
    draw.pieslice([x1 - 2 * radius, y1 - 2 * radius, x1, y1], 0, 90, fill=fill)


def generate_og_image(page_key, page_data):
    """Generate an OG image for a specific page."""
    accent = page_data['accent']

    # Create base image
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Draw gradient background
    for i in range(HEIGHT):
        r = int(BG_COLOR[0] + (i / HEIGHT) * 8)
        g = int(BG_COLOR[1] + (i / HEIGHT) * 12)
        b = int(BG_COLOR[2] + (i / HEIGHT) * 25)
        draw.line([(0, i), (WIDTH, i)], fill=(r, g, b))

    # Draw accent strip at top
    draw.rectangle([(0, 0), (WIDTH, 5)], fill=accent)

    # Draw decorative circles in background
    for cx, cy, cr, opacity in [(950, 100, 200, 15), (1100, 500, 150, 10), (100, 550, 100, 8)]:
        for ring in range(cr, 0, -1):
            alpha = int(opacity * (ring / cr))
            color = (accent[0] * alpha // 255, accent[1] * alpha // 255, accent[2] * alpha // 255)
            bg_blend = tuple(
                min(255, BG_COLOR[c] + color[c]) for c in range(3)
            )
            draw.ellipse([cx - ring, cy - ring, cx + ring, cy + ring], outline=bg_blend)

    # Load fonts
    try:
        font_title = ImageFont.truetype(JP_FONT_PATH, 60)
        font_desc = ImageFont.truetype(JP_FONT_PATH, 26)
        font_brand = ImageFont.truetype(JP_FONT_PATH, 20)
        font_icon = ImageFont.truetype(EN_FONT_PATH, 36)
        font_url = ImageFont.truetype(EN_FONT_PATH, 18)
    except Exception:
        font_title = ImageFont.load_default()
        font_desc = font_title
        font_brand = font_title
        font_icon = font_title
        font_url = font_title

    # Draw icon badge
    icon_text = page_data['icon']
    badge_x, badge_y = 80, 80
    badge_size = 70
    draw_rounded_rect(draw, (badge_x, badge_y, badge_x + badge_size, badge_y + badge_size), 15, accent)
    icon_bbox = draw.textbbox((0, 0), icon_text, font=font_icon)
    icon_w = icon_bbox[2] - icon_bbox[0]
    icon_h = icon_bbox[3] - icon_bbox[1]
    draw.text(
        (badge_x + (badge_size - icon_w) // 2, badge_y + (badge_size - icon_h) // 2 - 2),
        icon_text, fill=BG_COLOR, font=font_icon
    )

    # Draw title
    title_y = 185
    for line in page_data['title'].split('\n'):
        draw.text((80, title_y), line, fill=TEXT_WHITE, font=font_title)
        title_y += 75

    # Draw accent underline below title
    draw.rectangle([(80, title_y + 5), (280, title_y + 9)], fill=accent)

    # Draw description
    desc_y = title_y + 35
    for line in page_data['description'].split('\n'):
        draw.text((80, desc_y), line, fill=TEXT_GRAY, font=font_desc)
        desc_y += 38

    # Draw bottom bar with branding
    bar_y = HEIGHT - 70
    draw.rectangle([(0, bar_y), (WIDTH, HEIGHT)], fill=(8, 16, 32))
    draw.rectangle([(0, bar_y), (WIDTH, bar_y + 1)], fill=(255, 255, 255, 20))

    # Load and paste logo in bottom bar
    try:
        logo = Image.open(LOGO_PATH).convert('RGBA')
        logo_h = 30
        logo_scale = logo_h / logo.height
        logo_w = int(logo.width * logo_scale)
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        temp = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
        temp.paste(logo, (80, bar_y + 20), logo)
        img = Image.alpha_composite(img.convert('RGBA'), temp).convert('RGB')
        draw = ImageDraw.Draw(img)
    except Exception:
        draw.text((80, bar_y + 22), "TechTime", fill=TEXT_WHITE, font=font_brand)

    # Draw URL on the right side of bottom bar
    url_text = "techtime-jp.com"
    url_bbox = draw.textbbox((0, 0), url_text, font=font_url)
    url_w = url_bbox[2] - url_bbox[0]
    draw.text((WIDTH - 80 - url_w, bar_y + 25), url_text, fill=TEXT_GRAY, font=font_url)

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for page_key, page_data in PAGES.items():
        img = generate_og_image(page_key, page_data)
        filename = f'{page_key}.png'
        filepath = os.path.join(OUTPUT_DIR, filename)
        img.save(filepath, 'PNG', optimize=True)
        size_kb = os.path.getsize(filepath) / 1024
        print(f'Generated: {filename} ({size_kb:.1f} KB)')

    print(f'\nAll {len(PAGES)} OG images generated in {OUTPUT_DIR}')


if __name__ == '__main__':
    main()
