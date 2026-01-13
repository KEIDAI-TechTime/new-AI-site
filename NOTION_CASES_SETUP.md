# Notion 開発事例データベース セットアップガイド

このガイドに従って、開発事例用のNotionデータベースを作成し、Webサイトに接続します。

## ステップ1: Notionデータベースの作成

### 1.1 親ページを開く
https://www.notion.so/TechTime-2e444bdd2c978047a3f7cc1eef31005a にアクセス

### 1.2 インラインデータベースを作成
1. ページ内で `/database` と入力
2. 「データベース - インライン」を選択
3. タイトルを「**開発事例**」に変更

### 1.3 プロパティを設定

デフォルトの「名前」プロパティはそのままで、以下のプロパティを追加してください：

#### Category (セレクト)
- タイプ: **セレクト**
- 選択肢:
  - 文書管理 (色: Blue)
  - 在庫管理 (色: Green)
  - 顧客管理 (色: Purple)
  - 経営BI (色: Pink)
  - 生産管理 (色: Orange)
  - 人事給与 (色: Yellow)

#### Description (テキスト)
- タイプ: **テキスト**

#### Image (URL)
- タイプ: **URL**

#### Scale (セレクト)
- タイプ: **セレクト**
- 選択肢:
  - 大規模 (色: Red)
  - 標準規模 (色: Blue)

#### Period (テキスト)
- タイプ: **テキスト**

#### Cost (テキスト)
- タイプ: **テキスト**

#### Results (テキスト)
- タイプ: **テキスト**

#### Published (チェックボックス)
- タイプ: **チェックボックス**

#### Order (数値)
- タイプ: **数値**
- フォーマット: 数値

---

## ステップ2: サンプルデータの入力

以下の6件のデータを入力してください。各行をNotionの新しい行として追加します。

### 事例1: 大手製造業A社様 文書管理システム

| プロパティ | 値 |
|----------|---|
| **名前** | 大手製造業A社様 文書管理システム |
| **Category** | 文書管理 |
| **Description** | 全社の技術文書・品質文書を一元管理し、承認ワークフローを自動化。検索性が大幅に向上し、文書管理業務の工数を60%削減。 |
| **Image** | https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20digital%20document%20management%20system%20displayed%20on%20multiple%20screens%2C%20clean%20organized%20environment%20with%20filing%20cabinets%20and%20computers%2C%20professional%20business%20setting%20with%20natural%20lighting%2C%20minimalist%20design%20with%20blue%20and%20white%20color%20scheme%2C%20high-tech%20atmosphere&width=800&height=600&seq=case1&orientation=landscape |
| **Scale** | 大規模 |
| **Period** | 6ヶ月 |
| **Cost** | 850万円 |
| **Results** | 文書検索時間 70%短縮<br>承認プロセス 50%高速化<br>年間コスト 300万円削減 |
| **Published** | ✓ |
| **Order** | 1 |

---

### 事例2: 物流企業B社様 在庫管理システム

| プロパティ | 値 |
|----------|---|
| **名前** | 物流企業B社様 在庫管理システム |
| **Category** | 在庫管理 |
| **Description** | 複数拠点の在庫をリアルタイムで可視化し、適正在庫の維持を実現。過剰在庫と欠品を同時に削減し、キャッシュフローが改善。 |
| **Image** | https://readdy.ai/api/search-image?query=modern%20warehouse%20with%20automated%20inventory%20management%20system%2C%20organized%20shelves%20with%20products%20and%20barcode%20scanners%2C%20clean%20industrial%20environment%20with%20LED%20lighting%2C%20workers%20using%20tablets%20for%20inventory%20tracking%2C%20efficient%20logistics%20operation%20with%20blue%20accent%20lighting&width=800&height=600&seq=case2&orientation=landscape |
| **Scale** | 標準規模 |
| **Period** | 4ヶ月 |
| **Cost** | 420万円 |
| **Results** | 在庫回転率 35%向上<br>欠品率 80%削減<br>棚卸時間 65%短縮 |
| **Published** | ✓ |
| **Order** | 2 |

---

### 事例3: 商社C社様 顧客・販売管理システム

| プロパティ | 値 |
|----------|---|
| **名前** | 商社C社様 顧客・販売管理システム |
| **Category** | 顧客管理 |
| **Description** | 顧客情報と案件情報を統合管理し、営業活動を可視化。データに基づく戦略的な営業が可能になり、売上が20%向上。 |
| **Image** | https://readdy.ai/api/search-image?query=modern%20sales%20office%20with%20customer%20relationship%20management%20dashboard%20on%20large%20monitors%2C%20professional%20business%20environment%20with%20sales%20team%20collaborating%2C%20clean%20workspace%20with%20charts%20and%20analytics%20displays%2C%20contemporary%20office%20design%20with%20natural%20light%20and%20blue%20accent%20colors&width=800&height=600&seq=case3&orientation=landscape |
| **Scale** | 標準規模 |
| **Period** | 5ヶ月 |
| **Cost** | 580万円 |
| **Results** | 売上 20%向上<br>商談成約率 30%改善<br>営業効率 40%向上 |
| **Published** | ✓ |
| **Order** | 3 |

---

### 事例4: 小売業D社様 経営ダッシュボード

| プロパティ | 値 |
|----------|---|
| **名前** | 小売業D社様 経営ダッシュボード |
| **Category** | 経営BI |
| **Description** | 全店舗の売上・在庫・顧客データをリアルタイムで可視化。経営判断のスピードが向上し、機会損失を最小化。 |
| **Image** | https://readdy.ai/api/search-image?query=executive%20office%20with%20large%20business%20intelligence%20dashboard%20displaying%20real-time%20analytics%20and%20KPIs%2C%20modern%20corporate%20environment%20with%20multiple%20screens%20showing%20charts%20and%20graphs%2C%20professional%20setting%20with%20clean%20design%20and%20blue%20data%20visualization%20elements&width=800&height=600&seq=case4&orientation=landscape |
| **Scale** | 標準規模 |
| **Period** | 3ヶ月 |
| **Cost** | 380万円 |
| **Results** | 意思決定速度 50%向上<br>データ集計時間 90%削減<br>売上予測精度 25%改善 |
| **Published** | ✓ |
| **Order** | 4 |

---

### 事例5: 製造業E社様 生産管理システム

| プロパティ | 値 |
|----------|---|
| **名前** | 製造業E社様 生産管理システム |
| **Category** | 生産管理 |
| **Description** | 生産計画から工程管理、進捗管理まで一元化。リアルタイムな生産状況の把握により、納期遵守率が大幅に向上。 |
| **Image** | https://readdy.ai/api/search-image?query=modern%20manufacturing%20facility%20with%20digital%20production%20management%20system%2C%20factory%20floor%20with%20automated%20machinery%20and%20monitoring%20screens%2C%20clean%20industrial%20environment%20with%20workers%20using%20tablets%2C%20efficient%20production%20line%20with%20blue%20LED%20indicators%20and%20organized%20workspace&width=800&height=600&seq=case5&orientation=landscape |
| **Scale** | 大規模 |
| **Period** | 7ヶ月 |
| **Cost** | 920万円 |
| **Results** | 納期遵守率 95%達成<br>生産効率 30%向上<br>在庫コスト 25%削減 |
| **Published** | ✓ |
| **Order** | 5 |

---

### 事例6: サービス業F社様 人事・給与システム

| プロパティ | 値 |
|----------|---|
| **名前** | サービス業F社様 人事・給与システム |
| **Category** | 人事給与 |
| **Description** | 人事情報管理から給与計算、勤怠管理まで統合。給与計算の自動化により、人事部門の業務負荷が大幅に軽減。 |
| **Image** | https://readdy.ai/api/search-image?query=modern%20HR%20office%20with%20human%20resources%20management%20system%20on%20computers%2C%20professional%20workspace%20with%20employee%20data%20dashboards%2C%20clean%20corporate%20environment%20with%20organized%20filing%20and%20digital%20screens%2C%20contemporary%20office%20design%20with%20natural%20lighting%20and%20blue%20interface%20elements&width=800&height=600&seq=case6&orientation=landscape |
| **Scale** | 標準規模 |
| **Period** | 4ヶ月 |
| **Cost** | 450万円 |
| **Results** | 給与計算時間 80%削減<br>人事業務効率 50%向上<br>勤怠管理精度 向上 |
| **Published** | ✓ |
| **Order** | 6 |

---

## ステップ3: データベースIDの取得

1. 作成したデータベースの右上にある「⋯」メニューをクリック
2. 「全ページで開く」を選択
3. ブラウザのアドレスバーからURLをコピー
4. URLから32桁の英数字（ハイフンなし）を抽出

**URLの例:**
```
https://www.notion.so/2e444bdd2c978030867de35f57b03845?v=...
```

**データベースID:**
```
2e444bdd2c978030867de35f57b03845
```

このIDをコピーして、次のステップで使用します。

---

## ステップ4: Vercelの環境変数に追加

1. https://vercel.com/keidai-techtimes-projects/new-ai-site/settings/environment-variables にアクセス

2. 新しい環境変数を追加:
   - **Name**: `NOTION_CASES_DATABASE_ID`
   - **Value**: (ステップ3で取得したデータベースID)
   - **Environments**: Production, Preview, Development すべてにチェック

3. 「Save」をクリック

4. プロジェクトを再デプロイ:
   - Deploymentsページに移動
   - 最新のデプロイメントの「⋯」メニューから「Redeploy」を選択

---

## ステップ5: 動作確認

1. https://new-ai-site.vercel.app/cases にアクセス

2. 以下を確認:
   - ✅ 6件の開発事例が表示される
   - ✅ カテゴリフィルタが動作する
   - ✅ 画像が表示される
   - ✅ すべての情報（規模、期間、費用、導入効果）が表示される

---

## トラブルシューティング

### 開発事例が表示されない

**原因1: 環境変数が設定されていない**
- Vercelの環境変数に `NOTION_CASES_DATABASE_ID` が設定されているか確認
- 再デプロイを実行

**原因2: データベースIDが間違っている**
- ページIDではなく、データベースIDを取得しているか確認
- データベースを「全ページで開く」してURLから取得

**原因3: Notion Integrationが接続されていない**
- データベースページで「⋯」→「接続」から使用しているIntegrationを接続

### 一部のプロパティが表示されない

**原因: プロパティ名の大文字小文字が違う**
- プロパティ名は完全一致する必要があります
- このガイド通りの名前で作成してください

---

## 完了チェックリスト

- [ ] Notionでデータベースを作成した
- [ ] 9個のプロパティを追加した（Category, Description, Image, Scale, Period, Cost, Results, Published, Order）
- [ ] 6件のサンプルデータを入力した
- [ ] データベースIDを取得した
- [ ] Vercelの環境変数に `NOTION_CASES_DATABASE_ID` を追加した
- [ ] プロジェクトを再デプロイした
- [ ] https://new-ai-site.vercel.app/cases で開発事例が表示されることを確認した

---

## 次のステップ

設定が完了したら、Notionで開発事例を自由に追加・編集できます：

- 新しい事例を追加するには、データベースに新しい行を追加
- 既存の事例を編集するには、該当する行をクリックして編集
- 事例を非公開にするには、Publishedのチェックを外す
- 表示順序を変更するには、Orderの数値を変更

変更は即座にWebサイトに反映されます（キャッシュにより数分かかる場合があります）。
