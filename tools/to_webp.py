"""public/images の下の jpg から、表示用の WebP を作る（jpg は検索向けの構造化データで使うので残す）。
   図やサンプルの頁の画像を作り直したあとに実行する。 python3 tools/to_webp.py"""
import glob, os
from PIL import Image
root = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
for f in glob.glob(os.path.join(root, 'assess', '*.jpg')) + glob.glob(os.path.join(root, 'blog', '*.jpg')):
    Image.open(f).convert('RGB').save(f[:-4] + '.webp', 'WEBP', quality=80, method=6)
    print(os.path.basename(f), '->', os.path.getsize(f[:-4] + '.webp') // 1024, 'KB')
