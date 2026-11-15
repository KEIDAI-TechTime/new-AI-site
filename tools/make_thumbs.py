"""ブログの一覧のカードに載せる絵を作る。各記事の中の図を1つ撮って public/images/blog/<slug>.jpg にする。
開発サーバー（http://localhost:4391）を動かしてから実行する：
  ~/.venvs/playwright/bin/python tools/make_thumbs.py            … 全記事
  ~/.venvs/playwright/bin/python tools/make_thumbs.py <slug> …    … 指定の記事だけ
どの図を使うかは PICK に書く（書かなければ図1）。"""
import glob, os, re, sys
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images", "blog"); os.makedirs(OUT, exist_ok=True)
PICK = {
    "answer-with-probability": 2,
    "recheck-add-ons-against-standard": 4,
    "check-code-against-design": 2,
    "decide-the-meeting-goal": 4,
    "ai-runs-integration-tests": 4,
    "measure-ai-without-counterfactual": 3,
    "keep-using-ai": 1,
}
src = open(os.path.join(ROOT, "src", "data", "posts.ts"), encoding="utf-8").read()
slugs = sys.argv[1:] or re.findall(r"slug: '([^']+)'", src)
exe = glob.glob(os.path.expanduser("~/Library/Caches/ms-playwright/chromium-*/chrome-mac-arm64/*.app/Contents/MacOS/*"))[0]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe, headless=True)
    pg = b.new_page(viewport={"width": 1100, "height": 900}, device_scale_factor=1.5)
    for s in slugs:
        n = PICK.get(s, 1)
        pg.goto(f"http://localhost:4391/blog/{s}", wait_until="networkidle")
        fig = pg.locator(".fig").nth(n - 1)
        pg.evaluate(f"document.querySelectorAll('.fig')[{n - 1}].scrollIntoView({{block:'center'}})")
        pg.wait_for_timeout(6500)   # 図の動きが進み、要素がそろった頃に撮る
        fig.locator(".fig__b").screenshot(path=os.path.join(OUT, f"{s}.jpg"), type="jpeg", quality=82)
        print("撮った", s, "図", n)
    b.close()
