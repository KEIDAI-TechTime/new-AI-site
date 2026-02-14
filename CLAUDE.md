# CLAUDE.md - TechTime プロジェクトガイド

## プロジェクト概要

- Astro + React + Tailwind CSS のサイト（techtime-jp.com）
- Vercel にデプロイ（`vercel.json` でリダイレクト・リライト設定あり）
- デモ画面は `public/demo/{デモ名}/` に静的ファイルとして配置

---

## デモ画面の実装・配置プロセス

### 必須ルール

デモは必ず **ビルド済みの静的ファイル** として配置すること。
生のソースコード（.tsx, .ts, package.json 等）を `public/demo/` に直接配置してはいけない。

### 正しいディレクトリ構成

```
public/demo/{デモ名}/
├── index.html          # エントリーHTML（ビルド生成物）
└── assets/
    ├── index-{hash}.js  # バンドル済みJS
    └── index-{hash}.css # （あれば）バンドル済みCSS
```

### ソースからの配置手順

1. **ソースを一時ディレクトリにコピー**
   ```bash
   cp -r {ソースディレクトリ} /tmp/{デモ名}-build
   ```

2. **index.html のエントリーポイントを修正**
   - importmap を削除（Vite がバンドルするため不要）
   - `<script type="module" src="./index.tsx"></script>` にする（相対パス）
   - `<link rel="stylesheet" href="/index.css">` のようなルート相対パスを削除

3. **vite.config.ts で base パスを設定**
   ```ts
   base: '/demo/{デモ名}/',
   ```
   これにより、ビルド後のアセット参照が `/demo/{デモ名}/assets/...` になる

4. **依存関係をインストールしてビルド**
   ```bash
   cd /tmp/{デモ名}-build
   npm install
   npx vite build
   ```

5. **ビルド出力を public に配置**
   ```bash
   # public/demo/{デモ名}/ 内の既存ソースファイルを全て削除
   rm -rf public/demo/{デモ名}/*
   # ビルド出力をコピー
   cp -r /tmp/{デモ名}-build/dist/* public/demo/{デモ名}/
   ```

6. **配置後の検証チェックリスト**
   - [ ] `index.html` が存在する
   - [ ] `assets/` ディレクトリにビルド済み JS/CSS がある
   - [ ] `.tsx`, `.ts`, `package.json`, `node_modules` 等のソースファイルが残っていない
   - [ ] `index.html` 内のスクリプト参照パスが `/demo/{デモ名}/assets/...` になっている
   - [ ] viewport メタタグが設定されている: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Google AI Studio からエクスポートされたプロジェクトの注意点

AI Studio のエクスポートには以下の特徴があるので注意:
- `importmap` で esm.sh からモジュールを読み込む形式（ブラウザ直接実行用）
- エントリーが `src="/index.tsx"` のルート絶対パス（サブディレクトリでは動作しない）
- `.tsx` ファイルはブラウザが直接実行できないため、必ず Vite でビルドが必要

### レスポンシブデザイン要件

- `<body>` に `overflow-hidden` を付けない（モバイルでスクロールできなくなる）
- デスクトップ固定レイアウト（ダッシュボード系）には、以下のモバイル対応CSSを index.html の `<style>` に追加:

```css
@media (max-width: 767px) {
  body { overflow: auto !important; }
  nav[class*="border-r"] { display: none !important; }
}
```

---

## 既存デモ一覧と状態

| パス | 状態 | 形式 |
|------|------|------|
| `/demo/sap/` | ビルド済み | index.html + assets/ |
| `/demo/crm/` | ビルド済み | index.html + assets/ |
| `/demo/dms/` | ビルド済み | index.html + assets/ |
| `/demo/bi/` | ビルド済み | index.html + assets/ |
| `/demo/harlow/` | ビルド済み | index.html + assets/ |
| `/demo/code-adventure/` | ビルド済み | index.html + assets/ |
| `/demo/tesshin-kogyo/` | ビルド済み | index.html + assets/ + images/ |

---

## 過去の障害と教訓

| 障害 | 原因 | 教訓 |
|------|------|------|
| DMS デモが表示されない | 生ソース(.tsx)を直接配置、パスがルート相対 | 必ずビルドしてから配置 |
| SAP レスポンシブ崩壊 | body に overflow-hidden、サイドバー固定幅 | モバイル対応CSSを必ず付与 |
