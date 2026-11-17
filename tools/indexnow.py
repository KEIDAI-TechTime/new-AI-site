"""本番に出したあと、sitemap にある全ページの更新を IndexNow（Bing ほか）に知らせる。
   python3 tools/indexnow.py            … 全ページ
   python3 tools/indexnow.py /blog/xxx  … 指定したページだけ"""
import json, os, re, sys, urllib.request
HOST = 'techtime-jp.com'
KEY = open(os.path.join(os.path.dirname(__file__), 'indexnow_key.txt')).read().strip()
if len(sys.argv) > 1:
    urls = [f'https://{HOST}{p}' for p in sys.argv[1:]]
else:
    xml = urllib.request.urlopen(f'https://{HOST}/sitemap.xml').read().decode()
    urls = re.findall(r'<loc>([^<]+)</loc>', xml)
body = json.dumps({'host': HOST, 'key': KEY, 'keyLocation': f'https://{HOST}/{KEY}.txt', 'urlList': urls}).encode()
req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, headers={'Content-Type': 'application/json; charset=utf-8'})
try:
    r = urllib.request.urlopen(req); print('送った件数', len(urls), '応答', r.status)
except Exception as e:
    print('失敗', e, getattr(e, 'code', ''))
