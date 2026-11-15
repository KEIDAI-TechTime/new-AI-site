"""共有したときの画像（1200×630）を作る。記事は src/data/posts.ts から読む。
使い方: ~/.venvs/playwright/bin/python tools/make_og.py  → public/og/*.jpg
記事を足したら、もう一度実行する。"""
import glob, html, os, re
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og"); os.makedirs(OUT, exist_ok=True)
src = open(os.path.join(ROOT, "src", "data", "posts.ts"), encoding="utf-8").read()
items = []
for m in re.finditer(r"\{\s*slug: '([^']+)',\s*no: '([^']+)',\s*cat: '([^']+)',\s*title: '([^']+)'", src):
    slug, no, cat, title = m.groups()
    items.append(dict(file=f"{slug}.jpg", kicker=cat, no=no, title=title, foot="ブログ　導入と保守の現場から"))
items += [
    dict(file="site.jpg", kicker="SAP の導入と保守への、新しい入り方", no="", title="SAP 導入に、<br><em>AIチーム</em>という選択肢を。", foot="工数ではなく、プロジェクトに残る仕組みを納めます"),
    dict(file="assessment.jpg", kicker="アセスメント", no="", title="SAP 導入のプロジェクトを、<br><em>資料から診断</em>する。", foot="全件を読み、統計で測り、根拠を並べる"),
    dict(file="blog.jpg", kicker="ブログ", no="", title="効果があった進め方を、<br><em>手順と測り方</em>まで書く。", foot="要件定義から運用保守まで"),
    dict(file="contact.jpg", kicker="相談", no="", title="いまの進め方を、<br><em>聞かせてください。</em>", foot="導入の検討中でも、途中でも、稼働したあとでも"),
]
CSS = """
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Shippori+Mincho+B1:wght@800&family=Zen+Kaku+Gothic+New:wght@500;700&display=swap');
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f2eee4;color:#1c1b18;font-family:'Zen Kaku Gothic New',sans-serif;position:relative;overflow:hidden;
 background-image:linear-gradient(rgba(28,27,24,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(28,27,24,.09) 1px,transparent 1px),linear-gradient(rgba(28,27,24,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(28,27,24,.035) 1px,transparent 1px);
 background-size:120px 120px,120px 120px,24px 24px,24px 24px}
.fr{position:absolute;inset:22px;border:2px solid #1c1b18}
.fr span{position:absolute;top:-12px;background:#f2eee4;padding:0 14px;font:500 15px 'DM Mono',monospace;letter-spacing:.08em;color:#57544c}
.fr .l{left:30px}.fr .r{right:30px}
.in{position:absolute;left:84px;right:84px;top:84px;bottom:76px;display:flex;flex-direction:column}
.k{display:flex;align-items:center;gap:16px;font-weight:700;font-size:24px;color:#57544c}
.k b{background:#1c1b18;color:#f2eee4;padding:2px 16px}
.k i{font:500 24px 'DM Mono',monospace;color:#d4412a;font-style:normal}
h1{flex:1;display:flex;align-items:center;font-family:'Shippori Mincho B1',serif;font-weight:800;line-height:1.42;letter-spacing:.01em}
h1 em{font-style:normal;color:#d4412a}
.f{display:flex;justify-content:space-between;align-items:flex-end;border-top:2px solid #1c1b18;padding-top:20px}
.f span{font-size:22px;font-weight:500;color:#57544c}
.logo{font-family:'Shippori Mincho B1',serif;font-weight:800;font-size:38px;display:flex;align-items:center;gap:10px}
.logo i{width:13px;height:13px;background:#d4412a;display:block}
"""
exe = glob.glob(os.path.expanduser("~/Library/Caches/ms-playwright/chromium-*/chrome-mac-arm64/*.app/Contents/MacOS/*"))[0]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe, headless=True)
    pg = b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
    for it in items:
        t = it["title"] if "<em>" in it["title"] else html.escape(it["title"])
        n = max(len(x) for x in re.sub(r"<(?!br)[^>]+>", "", t).split("<br>")) * (1 if "<br>" in t else 1)
        size = 66 if n <= 22 else 58 if n <= 30 else 50 if n <= 40 else 44
        no = f"<i>{it['no']}</i>" if it["no"] else ""
        doc = f"""<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="fr"><span class="l">TECHTIME CO., LTD.</span><span class="r">techtime-jp.com</span></div>
<div class="in"><p class="k"><b>{html.escape(it['kicker'])}</b>{no}</p><h1 style="font-size:{size}px"><span>{t}</span></h1>
<div class="f"><span>{html.escape(it['foot'])}</span><span class="logo">TechTime<i></i></span></div></div></body></html>"""
        pg.set_content(doc, wait_until="networkidle"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        # 題が溢れたら文字を小さくする
        for _ in range(6):
            over = pg.evaluate("(()=>{const h=document.querySelector('h1');return h.scrollHeight>h.clientHeight+2})()")
            if not over: break
            size -= 4; pg.evaluate(f"document.querySelector('h1').style.fontSize='{size}px'")
        pg.screenshot(path=os.path.join(OUT, it["file"]), type="jpeg", quality=86)
    b.close()
print(len(items), "枚を作った:", OUT)
