# デモサイトの追加とモバイル対応ワークフロー

このドキュメントでは、新しいデモをGitHubリポジトリに追加し、モバイルレスポンシブデザインに対応させる手順をまとめています。

## 📋 目次

1. [概要](#概要)
2. [前提条件](#前提条件)
3. [手順](#手順)
4. [トラブルシューティング](#トラブルシューティング)
5. [参考情報](#参考情報)

---

## 概要

このワークフローは以下の作業をカバーします：

- ✅ 新しいデモプロジェクトのGitHubへの追加
- ✅ React/Viteプロジェクトのビルド設定
- ✅ モバイルレスポンシブデザインの実装
- ✅ プロダクションビルドとデプロイ

**対象プロジェクト例**: 文書管理システム（DMS）デモ

---

## 前提条件

### 必要なツール

- Node.js (v18以上)
- npm または yarn
- Git
- テキストエディタ（VS Code推奨）

### プロジェクト構成

```
public/demo/
├── dms/                    # デモプロジェクト
│   ├── index.html         # エントリーポイント
│   ├── index.tsx          # Reactエントリー
│   ├── App.tsx            # メインアプリ
│   ├── vite.config.ts     # Vite設定
│   ├── package.json       # 依存関係
│   ├── pages/             # ページコンポーネント
│   ├── components/        # 再利用可能コンポーネント
│   ├── assets/            # ビルド成果物
│   └── .gitignore         # Git無視設定
```

---

## 手順

### ステップ 1: デモプロジェクトの準備

#### 1.1 依存関係のインストール

```bash
cd public/demo/dms
npm install
```

#### 1.2 Vite設定の確認

`vite.config.ts` にベースパスを設定：

```typescript
export default defineConfig(({ mode }) => {
  return {
    base: '/demo/dms/',  // 重要: デプロイパスを指定
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
  };
});
```

#### 1.3 .gitignoreの作成

```bash
# public/demo/dms/.gitignore
node_modules
dist
dist-ssr
*.local
public

.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
```

---

### ステップ 2: GitHubへの初回コミット

#### 2.1 作業ブランチの作成

```bash
cd /home/user/new-AI-site
git checkout -b claude/add-demo-card-XXXXX
```

#### 2.2 初回ビルドの実行

```bash
cd public/demo/dms
npm run build
```

#### 2.3 ビルド成果物のコピー

```bash
# index.htmlとassetsをデモディレクトリにコピー
cp dist/index.html .
cp -r dist/assets .
```

#### 2.4 Gitへの追加とコミット

```bash
cd /home/user/new-AI-site
git add public/demo/dms/
git status  # 変更内容を確認

git commit -m "Add DMS demo with production build

- Initial setup of Document Management System demo
- Configured Vite with base path '/demo/dms/'
- Built production bundle (544KB)
- Added .gitignore for build artifacts

https://claude.ai/code/session_XXXXX"
```

#### 2.5 リモートへプッシュ

```bash
git push -u origin claude/add-demo-card-XXXXX
```

---

### ステップ 3: モバイルレスポンシブデザインの実装

#### 3.1 ヘッダーのモバイル対応

**App.tsx の修正**

```tsx
import { Menu, X } from 'lucide-react';

const Header: React.FC<{ onOpenAI: () => void }> = ({ onOpenAI }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] text-white z-50 shadow-lg px-4 md:px-6 flex items-center justify-between">
        {/* ロゴ */}
        <div className="flex items-center gap-3">
          <div className="bg-[#c9a962] p-2 rounded-md shadow-sm">
            <FileText size={20} className="text-[#0a1628]" />
          </div>
          <span className="text-lg md:text-xl font-serif font-bold tracking-wider">
            顧問先カルテ
          </span>
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {/* ナビゲーション項目 */}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-all"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-[#0a1628] z-40 lg:hidden shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            {/* モバイルナビゲーション項目 */}
          </nav>
        </div>
      )}
    </>
  );
};
```

**ポイント**:
- `hidden lg:flex`: デスクトップのみ表示
- `lg:hidden`: モバイルのみ表示
- ハンバーガーメニューアイコンの切り替え

#### 3.2 ダッシュボードのモバイル対応

**Dashboard.tsx の修正**

```tsx
return (
  <div className="space-y-6 md:space-y-8 animate-fadeInUp">
    {/* タイトル */}
    <div>
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0a1628] mb-2">
        ダッシュボード
      </h1>
      <p className="text-sm md:text-base text-gray-500">
        本日の優先業務と全体サマリーです
      </p>
    </div>

    {/* グリッドレイアウト */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      {/* カード */}
      <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif font-bold text-base md:text-lg flex items-center gap-2 text-[#0a1628]">
            <Calendar size={18} className="text-[#c9a962] md:w-5 md:h-5" />
            <span className="hidden sm:inline">今月決算の顧問先</span>
            <span className="sm:hidden">今月決算</span>
          </h2>
          <Badge variant="gold">3件</Badge>
        </div>
        {/* カード内容 */}
      </div>
    </div>
  </div>
);
```

**ポイント**:
- `text-2xl md:text-3xl`: レスポンシブフォントサイズ
- `grid-cols-1 md:grid-cols-2`: モバイルで1列、タブレットで2列
- `hidden sm:inline`: 小画面で非表示、大画面でインライン表示

#### 3.3 クライアント一覧のモバイル対応

**ClientList.tsx の修正**

```tsx
return (
  <div className="space-y-6 md:space-y-8 pb-12">
    {/* ヘッダー */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0a1628] mb-2">
          顧問先一覧
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          事務所のすべての顧問先情報を管理しています
        </p>
      </div>
      <div className="flex gap-2 md:gap-3">
        <Button variant="secondary" icon={<FileUp size={16} className="md:w-[18px] md:h-[18px]" />}>
          <span className="hidden sm:inline">書類一括登録</span>
          <span className="sm:hidden">一括登録</span>
        </Button>
      </div>
    </div>

    {/* 統計カード */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {/* 統計項目 */}
    </div>

    {/* 検索とフィルター */}
    <div className="bg-white p-3 md:p-4 rounded-[12px] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3 md:gap-4">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="会社名、業種、担当者で検索..."
          className="w-full pl-10 md:pl-11 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50 focus:bg-white transition-all text-sm md:text-base"
        />
      </div>
      <div className="flex gap-2 md:gap-4 overflow-x-auto">
        {/* フィルター */}
      </div>
    </div>
  </div>
);
```

**ポイント**:
- `flex-col md:flex-row`: モバイルで縦並び、タブレットで横並び
- `overflow-x-auto`: 横スクロール可能
- `grid-cols-1 sm:grid-cols-3`: レスポンシブグリッド

#### 3.4 クライアント詳細のモバイル対応

**ClientDetail.tsx の修正**

```tsx
{/* クライアント情報カード */}
<div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
  <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8">
    <div className="flex gap-4 md:gap-6 lg:gap-8 items-start lg:items-center">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0a1628] rounded-xl flex items-center justify-center text-[#c9a962] flex-shrink-0">
        <Building2 size={24} className="md:w-8 md:h-8" />
      </div>
      <div className="space-y-1 md:space-y-2 min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#0a1628] break-words">
            {client.name}
          </h1>
          <Badge variant="navy" pill>{client.industry}</Badge>
        </div>
      </div>
    </div>
    <div className="flex gap-2 md:gap-3 flex-shrink-0">
      <Button variant="secondary" icon={<StickyNote size={16} className="md:w-[18px] md:h-[18px]" />}>
        <span className="hidden sm:inline">メモを追加</span>
        <span className="sm:hidden">メモ</span>
      </Button>
    </div>
  </div>
</div>

{/* 年度タブ */}
<div className="flex border-b border-gray-200 overflow-x-auto">
  {years.map(year => (
    <button
      key={year}
      className={`px-4 md:px-6 lg:px-8 py-3 md:py-4 font-bold text-base md:text-lg transition-all relative flex-shrink-0`}
    >
      {year}
    </button>
  ))}
</div>
```

**ポイント**:
- `flex-col lg:flex-row`: モバイルで縦、デスクトップで横
- `overflow-x-auto`: タブを横スクロール可能
- `min-w-0 flex-1`: テキストの切り詰めを適切に処理

#### 3.5 カードコンポーネントのモバイル対応

**ClientCard.tsx の修正**

```tsx
<div className="p-4 md:p-5 lg:p-6">
  <div className="flex justify-between items-start mb-3 md:mb-4 gap-2">
    <div className="min-w-0 flex-1">
      <span className="text-xs text-gray-500 font-medium tracking-widest uppercase mb-1 block">
        {client.industry}
      </span>
      <h3 className="text-lg md:text-xl font-serif font-bold text-[#0a1628] group-hover:text-[#c9a962] transition-colors break-words">
        {client.name}
      </h3>
    </div>
    <Badge variant={isClosingThisMonth ? 'gold' : 'navy'}>
      {client.closingMonth}月決算
    </Badge>
  </div>

  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 py-3 md:py-4 border-y border-gray-50">
    <div className="text-center">
      <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">登録年度</p>
      <p className="font-serif font-bold text-base md:text-lg text-[#1e3a5f]">
        {client.yearsEnrolled}年度
      </p>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-gray-500">
    <div className="flex items-center gap-1.5">
      <User size={12} className="text-gray-400 md:w-[14px] md:h-[14px]" />
      <span>担当: {client.manager}</span>
    </div>
  </div>
</div>
```

**ポイント**:
- `min-w-0 flex-1`: 長いテキストの切り詰め
- `break-words`: 長い単語の改行
- `text-[10px] md:text-xs`: 極小フォントのレスポンシブ対応

---

### ステップ 4: ビルドとデプロイ

#### 4.1 index.htmlの修正

開発モード用のimport mapを削除し、エントリーポイントを設定：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>顧問先カルテ - 税理士事務所向け管理システム</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@600;700;900&display=swap" rel="stylesheet">
  <style>
    /* カスタムスタイル */
  </style>
  <!-- エントリーポイント -->
  <script type="module" src="/index.tsx"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

#### 4.2 クリーンビルドの実行

```bash
cd public/demo/dms

# 古いビルドを削除
rm -rf dist

# 新しいビルドを実行
npm run build

# ビルド成果物を確認
ls -lh dist/assets/
```

**期待される出力**:

```
dist/index.html                  1.23 kB │ gzip:   0.67 kB
dist/assets/index-XXXXX.js     549.57 kB │ gzip: 140.17 kB
✓ built in 8.38s
```

#### 4.3 ビルド成果物のコピー

```bash
# index.htmlをコピー
cp dist/index.html .

# assetsディレクトリを更新
rm -rf assets
cp -r dist/assets .

# 確認
ls -lh assets/
```

#### 4.4 変更のコミット

```bash
cd /home/user/new-AI-site
git add -A public/demo/dms/
git status  # 変更内容を確認

git commit -m "Add mobile responsive design to DMS demo

## Changes Made

### Header (App.tsx)
- Added hamburger menu for mobile navigation
- Implemented collapsible mobile menu
- Adjusted padding and font sizes for mobile
- Hidden desktop navigation on small screens

### Dashboard
- Made all cards mobile responsive
- Adjusted grid layouts (1 col on mobile, 2 cols on tablet)
- Reduced padding and font sizes for mobile
- Improved text truncation for long content

### Client List
- Made header and buttons stack on mobile
- Adjusted search bar layout for mobile
- Made filter dropdowns horizontally scrollable
- Made statistics cards responsive (1 col on mobile)

### Client Detail
- Made client info card stack vertically on mobile
- Added horizontal scroll to year tabs
- Made document cards stack on mobile
- Adjusted button sizes and labels for mobile

### Client Card Component
- Adjusted padding and font sizes
- Made client info wrap properly
- Improved statistics layout for small screens
- Better text truncation for long names

### Build
- Rebuilt production bundle (550KB)
- All modules properly bundled
- Mobile-optimized layouts included

https://claude.ai/code/session_XXXXX"
```

#### 4.5 リモートへプッシュ

```bash
git push -u origin claude/add-demo-card-XXXXX
```

---

## トラブルシューティング

### 問題 1: ビルドサイズが異常に小さい

**症状**:
```
dist/assets/index-XXXXX.js  0.71 kB │ gzip: 0.40 kB
✓ 3 modules transformed.
```

**原因**: index.htmlにimport mapが残っており、Viteが外部モジュールとして扱っている

**解決策**:
1. index.htmlからimport mapとESMの参照を削除
2. `<script type="module" src="/index.tsx"></script>` を追加
3. `rm -rf dist && npm run build` で再ビルド

---

### 問題 2: 真っ白な画面が表示される

**症状**: デモページにアクセスすると白い画面のみ表示

**原因**:
- Reactアプリがビルドされていない
- アセットのパスが間違っている

**解決策**:
1. `vite.config.ts` で `base: '/demo/dms/'` が設定されているか確認
2. `npm run build` を実行
3. `dist/index.html` のスクリプトパスを確認
4. assetsディレクトリが正しくコピーされているか確認

---

### 問題 3: モバイルでレイアウトが崩れる

**症状**: スマートフォンで表示すると要素が重なる、はみ出す

**解決策**:
1. `<meta name="viewport">` タグが正しく設定されているか確認
2. Tailwindの`min-w-0`と`flex-shrink-0`を適切に使用
3. `overflow-x-auto`で横スクロールを許可
4. `truncate`や`break-words`でテキストの表示を調整

---

### 問題 4: プッシュ時に403エラー

**症状**: `git push`で403 Forbiddenエラー

**原因**: ブランチ名がセッションIDと一致していない

**解決策**:
ブランチ名は `claude/` で始まり、セッションIDで終わる必要があります：
```bash
git checkout -b claude/add-demo-card-HQoBL
```

---

## 参考情報

### Tailwind CSSブレークポイント

```
sm: 640px   # スマートフォン（横）
md: 768px   # タブレット
lg: 1024px  # デスクトップ
xl: 1280px  # 大型デスクトップ
2xl: 1536px # 超大型デスクトップ
```

### 推奨レスポンシブクラス組み合わせ

```tsx
{/* テキストサイズ */}
className="text-sm md:text-base lg:text-lg"

{/* パディング */}
className="p-4 md:p-6 lg:p-8"

{/* グリッド */}
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

{/* フレックス方向 */}
className="flex flex-col md:flex-row"

{/* 表示/非表示 */}
className="hidden md:block"
className="md:hidden"

{/* アイコンサイズ */}
<Icon size={16} className="md:w-5 md:h-5" />
```

### Git コミットメッセージのベストプラクティス

```bash
git commit -m "タイトル（50文字以内）

## 詳細（省略可）

### 変更内容のセクション
- 変更点1
- 変更点2

### ビルド情報
- バンドルサイズ
- モジュール数

https://claude.ai/code/session_XXXXX"
```

---

## まとめ

このワークフローに従うことで：

✅ 新しいデモを簡単にGitHubに追加できます
✅ モバイル/タブレット/デスクトップの全画面サイズに対応できます
✅ プロダクション品質のビルドを生成できます
✅ 適切なGit管理とコミット履歴を維持できます

---

**作成日**: 2026-02-14
**最終更新**: 2026-02-14
**バージョン**: 1.0.0
