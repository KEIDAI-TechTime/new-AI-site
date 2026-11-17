"""Search Console で sitemap.xml を送信する。ログインは人が窓で行う（パスワードは扱わない）。
プロファイル ~/.pw-google-tt は TechTime 専用。ログインはここに残るので、次回は入力不要。"""
import os, sys, time, re, urllib.parse
from playwright.sync_api import sync_playwright
OUT = sys.argv[1]
LOG = open(os.path.join(OUT, "log.txt"), "a", buffering=1)
def log(*a): print(time.strftime("%H:%M:%S"), *a, file=LOG)
CANDS = ["https://techtime-jp.com/", "sc-domain:techtime-jp.com"]
URL = lambda r: "https://search.google.com/search-console/sitemaps?resource_id=" + urllib.parse.quote(r, safe="")
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        os.path.expanduser("~/.pw-google-tt"), headless=False,
        executable_path="/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome",
        args=["--disable-blink-features=AutomationControlled"], ignore_default_args=["--enable-automation"],
        viewport={"width": 1280, "height": 860}, locale="ja-JP")
    pg = ctx.pages[0] if ctx.pages else ctx.new_page()
    pg.goto(URL(CANDS[0]))
    log("窓を開いた。ログインを待つ")
    t0 = time.time()
    while True:
        u = pg.url
        if "search.google.com" in u and "search-console" in u and "accounts.google" not in u:
            break
        if int(time.time() - t0) % 30 < 3: log("待機中の URL:", re.sub(r"[?#].*", "", u))
        if time.time() - t0 > 600:
            log("10分たってもログインが済まなかったので終える"); ctx.close(); sys.exit(2)
        time.sleep(3)
    log("ログインを確認した:", re.sub(r"[?#].*", "", pg.url))
    mu = re.search(r"/u/(\d+)/", pg.url)
    if mu:
        n = mu.group(1)
        URL = lambda r, n=n: f"https://search.google.com/u/{n}/search-console/sitemaps?resource_id=" + urllib.parse.quote(r, safe="")
    done = False
    for r in CANDS:
        pg.goto(URL(r)); pg.wait_for_load_state("networkidle"); time.sleep(4)
        body = pg.inner_text("body")
        inp = pg.locator('input[type="text"]:visible')
        log(f"プロパティ {r}: 入力欄 {inp.count()}")
        if inp.count() == 0:
            log("  画面の文字:", re.sub(r"\s+", " ", body)[:300]); continue
        btn = pg.get_by_role("button", name=re.compile(r"^(送信|SUBMIT|Submit)$"))
        log("  送信ボタン:", btn.count())
        if btn.count() == 0:
            log("  送信ボタンが見つからない"); continue
        # 入力欄の名前を記録し、入力すると送信ボタンが押せるようになる欄だけを使う（URL 検査の欄には入れない）
        picked = None
        for k in range(inp.count()):
            el = inp.nth(k)
            name = " / ".join(x for x in [el.get_attribute("aria-label"), el.get_attribute("placeholder")] if x)
            log(f"  入力欄{k}: {name or '（名前なし）'}")
        for k in range(inp.count()):
            el = inp.nth(k)
            name = (el.get_attribute("aria-label") or "") + (el.get_attribute("placeholder") or "")
            if re.search(r"検査|inspect|検索|search", name, re.I): continue
            el.click(); el.fill("sitemap.xml"); time.sleep(1)
            if btn.first.get_attribute("aria-disabled") != "true":
                picked = k; break
            el.fill(""); time.sleep(0.5)
        if picked is None:
            log("  入力しても送信ボタンが押せる状態にならない。送信しない"); continue
        log(f"  使った入力欄: {picked}")
        btn.first.click(); time.sleep(6)
        after = re.sub(r"\s+", " ", pg.inner_text("body"))
        m = re.search(r"(サイトマップを送信しました|Sitemap submitted successfully|送信しました|取得できませんでした|Couldn't fetch|エラー)[^。]{0,80}", after)
        log("  送信後の表示:", m.group(0) if m else after[:300])
        pg.screenshot(path=os.path.join(OUT, "after_submit.png"))
        ok = pg.get_by_role("button", name=re.compile(r"^(OK|了解|閉じる|GOT IT|Got it)$"))
        if ok.count(): ok.first.click(); time.sleep(3)
        pg.reload(); pg.wait_for_load_state("networkidle"); time.sleep(5)
        table = re.sub(r"\s+", " ", pg.inner_text("body"))
        i = table.find("sitemap.xml"); log("  一覧の行:", table[max(0, i - 40): i + 200] if i >= 0 else "（一覧に sitemap.xml が見当たらない）")
        pg.screenshot(path=os.path.join(OUT, "list.png"))
        done = True; break
    log("終了" if done else "送信できなかった。窓はそのまま 3分開けておく")
    time.sleep(20 if done else 180)
    ctx.close()
