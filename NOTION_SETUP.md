# Notion連携セットアップガイド

このガイドでは、ブログコンテンツをNotionで管理するための設定方法を説明します。

## 1. Notion Integrationの作成

1. [Notion Integrations](https://www.notion.so/my-integrations) にアクセス
2. 「+ New integration」をクリック
3. Integration名を入力（例：TechTime Blog）
4. Workspace を選択
5. 「Submit」をクリック
6. **Internal Integration Token** をコピー（これが `VITE_NOTION_API_KEY` になります）

## 2. Notionデータベースの作成

### 必要なプロパティ

ブログ用のNotionデータベースに以下のプロパティを作成してください：

| プロパティ名 | タイプ | 必須 | 説明 |
|------------|--------|------|------|
| Title または Name | Title | ✅ | 記事のタイトル |
| Slug または slug | Text | ✅ | URL用のスラッグ（例：my-first-post） |
| Category または category | Select | ✅ | カテゴリ（column, presidents_column, tech-blog, dx_report） |
| Published | Checkbox | ✅ | 公開状態（チェックで公開） |
| Excerpt または excerpt | Text | ❌ | 記事の要約 |
| Created | Created time | ❌ | 作成日時 |

### カテゴリの選択肢

Category プロパティに以下の選択肢を追加してください：

- `column` - コラム
- `presidents_column` - 社長コラム
- `tech-blog` - 技術ブログ
- `dx_report` - DXレポート

### データベース作成手順

1. Notionで新しいページを作成
2. 「Database」→「Table」を選択
3. 上記のプロパティを追加
4. データベースのURLから **Database ID** をコピー
   - URL形式：`https://www.notion.so/{workspace}/{database_id}?v=...`
   - `database_id` の部分（32文字の英数字）をコピー

## 3. データベースにIntegrationを接続

1. 作成したNotionデータベースを開く
2. 右上の「...」メニューをクリック
3. 「Add connections」を選択
4. 作成したIntegration（例：TechTime Blog）を選択

## 4. 環境変数の設定

### ローカル開発環境

プロジェクトルートに `.env` ファイルを作成：

```bash
cp .env.example .env
```

`.env` ファイルを編集して、取得した値を設定：

```
VITE_NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Vercelでの設定

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Environment Variables」に移動
3. 以下の環境変数を追加：
   - `VITE_NOTION_API_KEY`: Notion Integration Token
   - `VITE_NOTION_DATABASE_ID`: Notion Database ID

## 5. テスト記事の作成

Notionデータベースにテスト記事を作成：

1. 「+ New」で新しい行を追加
2. プロパティを設定：
   - **Title**: テスト記事のタイトル
   - **Slug**: `test-post`
   - **Category**: `column`
   - **Published**: チェック
   - **Excerpt**: 記事の要約文
3. ページを開いて本文を作成
4. 保存

## 6. 動作確認

### ローカルで確認

```bash
npm run dev
```

ブラウザで `http://localhost:5173/blog` にアクセスして、Notionの記事が表示されることを確認。

### 本番環境で確認

```bash
npm run build
npm run preview
```

## Notionでの記事作成方法

### 記事の構造

Notionページでは通常のNotionブロックを自由に使えます：

- **見出し**: Heading 1, 2, 3
- **段落**: テキスト
- **リスト**: Bulleted list, Numbered list
- **画像**: Image block
- **コード**: Code block
- **引用**: Quote
- **区切り線**: Divider
- **テーブル**: Table
- **埋め込み**: Embed（YouTube, Twitterなど）

### カバー画像の設定

1. ページを開く
2. 右上の「...」メニュー
3. 「Add cover」を選択
4. 画像をアップロードまたはURLを指定

### 記事の公開

1. **Published** プロパティにチェックを入れる
2. 数分以内にサイトに反映されます（Vercelのビルド時間による）

## トラブルシューティング

### 記事が表示されない

- Notionデータベースに Integration が接続されているか確認
- **Published** プロパティがチェックされているか確認
- 環境変数が正しく設定されているか確認
- ブラウザのコンソールでエラーメッセージを確認

### 画像が表示されない

- Notion画像のURLは有効期限があります
- カバー画像を使用するか、パブリックなURLの画像を使用してください

### カテゴリフィルターが動作しない

- Category プロパティの値が正確に一致しているか確認（大文字小文字も含めて）
- 選択肢：`column`, `presidents_column`, `tech-blog`, `dx_report`

## Notionの利点

✅ **直感的な編集**: WordPressより使いやすいエディター
✅ **リアルタイムコラボレーション**: 複数人で同時編集可能
✅ **構造化データ**: データベース機能で柔軟な管理
✅ **統一された見た目**: マークダウンで一貫したスタイル
✅ **バージョン履歴**: 変更履歴の追跡
✅ **無料プラン**: 個人・小規模チームなら無料で使用可能
