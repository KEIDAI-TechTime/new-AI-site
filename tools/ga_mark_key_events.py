"""アナリティクスで、指定のイベントをキーイベント（星印）にする。
イベントが管理画面の「最近のイベント」に出るまで待つ（30分ごと・最長48時間）。
ログインは TechTime 専用のプロファイル ~/.pw-google-tt を使う。
使い方: ~/.venvs/playwright/bin/python tools/ga_mark_key_events.py <ログのファイル> generate_lead sample_download"""
import os, re, sys, time
from playwright.sync_api import sync_playwright
P = "a381604053p521091738"
LOGF, NAMES = sys.argv[1], sys.argv[2:]
log = open(LOGF, "a", buffering=1)
def say(*a): print(time.strftime("%m/%d %H:%M"), *a, file=log)
def check_once():
    done = {}
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(os.path.expanduser("~/.pw-google-tt"), headless=True,
            executable_path="/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome",
            args=["--disable-blink-features=AutomationControlled"], ignore_default_args=["--enable-automation"],
            viewport={"width": 1440, "height": 1100}, locale="ja-JP")
        pg = ctx.pages[0] if ctx.pages else ctx.new_page()
        try:
            pg.goto(f"https://analytics.google.com/analytics/web/#/{P}/admin", wait_until="domcontentloaded"); time.sleep(12)
            if "accounts.google" in pg.url: say("ログインが切れている"); return None
            pg.locator("a.admin-events").first.click(); time.sleep(10)
            pg.get_by_role("tab", name=re.compile("最近のイベント")).first.click(); time.sleep(8)
            for n in NAMES:
                row = pg.locator("mat-row", has=pg.locator("mat-cell.mat-column-name", has_text=re.compile(rf"^\s*{n}\s*$")))
                if row.count() == 0: done[n] = "まだ無い"; continue
                btn = row.first.locator("button.mark-as-key-event-button")
                if btn.get_attribute("aria-pressed") == "true": done[n] = "登録済み"; continue
                btn.click(); time.sleep(4)
                ok = pg.get_by_role("button", name=re.compile(r"^(確認|キーイベントとしてマーク|OK)$"))
                if ok.count(): ok.first.click(); time.sleep(3)
                done[n] = "登録した" if btn.get_attribute("aria-pressed") == "true" else "押したが状態が変わらない"
            pg.screenshot(path=LOGF.replace(".txt", ".png"))
        finally:
            ctx.close()
    return done
t0 = time.time()
while time.time() - t0 < 48 * 3600:
    try:
        r = check_once()
    except Exception as e:
        r = None; say("失敗:", str(e)[:200])
    if r is not None:
        say(r)
        if all(v in ("登録した", "登録済み") for v in r.values()):
            say("完了"); break
    time.sleep(1800)
else:
    say("48時間たっても登録できなかった")
