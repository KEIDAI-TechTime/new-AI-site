import sys, glob, os
from playwright.sync_api import sync_playwright
src, dst = sys.argv[1], sys.argv[2]
exe = glob.glob(os.path.expanduser("~/Library/Caches/ms-playwright/chromium-*/chrome-mac-arm64/*.app/Contents/MacOS/*"))[0]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe, headless=True)
    pg = b.new_page()
    pg.goto("file://" + src, wait_until="networkidle")
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(800)
    # 頁ごとに、中身が頁に収まる範囲でいちばん大きい倍率にする（文字を読みやすくし、余白を減らす）
    zooms = pg.evaluate("""() => [...document.querySelectorAll('.pg')].map((s) => {
      const b = s.querySelector('.body'); if (!b) return null;
      const fits = () => { const lim = (s.querySelector('.cta') || s.querySelector('footer')).getBoundingClientRect().top;
        return Math.max(...[...b.children].map(k => k.getBoundingClientRect().bottom)) <= lim - 6; };
      let z = 1.36; for (; z > 1.0; z -= 0.02) { b.style.zoom = z; if (fits()) break; }
      if (z <= 1.0) b.style.zoom = 1; return Math.round(z * 100) / 100;
    })""")
    print("倍率:", zooms)
    # はみ出しの検査：各頁の中身が頁の高さに収まっているか
    over = pg.evaluate("""() => [...document.querySelectorAll('.pg')].map((s, i) => {
      const b = s.querySelector('.body'); if (!b) return null;
      const f = s.querySelector('footer').getBoundingClientRect(), r = s.getBoundingClientRect();
      const kids = [...b.children]; const bottom = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
      const limit = (s.querySelector('.cta') || s.querySelector('footer')).getBoundingClientRect().top;
      return {page: i + 1, over: Math.round(bottom - limit), footOut: Math.round(f.bottom - r.bottom)};
    }).filter(x => x && (x.over > 0 || x.footOut > 0))""")
    print("はみ出し:", over)
    pg.pdf(path=dst, width="297mm", height="210mm", print_background=True, margin={"top":"0","bottom":"0","left":"0","right":"0"})
    b.close()
