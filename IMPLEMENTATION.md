# TechTime 見積もりシミュレーター 実装ガイド

## 概要

会話型UIで見積もりを算出するWebアプリケーション。
決定木ベースの質問フローをメインに、自由テキスト入力時のみAI解析を使用するハイブリッド方式。

## ファイル構成

```
estimate_simulator/
├── price_master.json      # 単価マスタ（ベース・オプション価格）
├── decision_tree.json     # 決定木定義（質問フロー・分岐）
├── calculation_rules.json # 計算ルール（係数・計算式）
└── IMPLEMENTATION.md      # この実装ガイド
```

---

## 1. price_master.json の構造

### システム定義
```json
{
  "systems": {
    "予約システム": {
      "system_id": "reservation",
      "bases": [...],        // ベース選択肢（単一選択）
      "options": [...],      // オプション（複数選択可）
      "scale_type": "users_large"  // 規模係数タイプ
    }
  }
}
```

### ベース・オプションの価格
```json
{
  "key": "乗り物・送迎",
  "label": "乗り物・送迎の予約",
  "min": 72,    // 最小構成（万円）
  "std": 120,   // 標準構成（万円）
  "max": 192    // フル構成（万円）
}
```

### 条件付きオプション
`condition` フィールドがある場合、特定のベース選択時のみ表示
```json
{
  "key": "AI配車最適化",
  "condition": "乗り物・送迎"  // このベース選択時のみ表示
}
```

### 共通オプション
全システム共通で使用（外部連携・データ移行）
```json
{
  "common_options": {
    "external_link": {...},
    "data_migration": {...}
  }
}
```

---

## 2. decision_tree.json の構造

### 質問タイプ

| type | 説明 | 処理 |
|------|------|------|
| single | 単一選択 | 1つだけ選択可 |
| multiple | 複数選択 | 複数選択可（「なし」は排他） |
| conditional | 条件分岐 | 条件に応じて次の質問を決定 |
| free_text | 自由入力 | AI解析を実行 |
| result | 結果表示 | 見積もり計算・表示 |

### 選択タイプ

| selection_type | 説明 |
|----------------|------|
| base | ベース選択（price_master.systems[].bases から取得） |
| option | オプション選択（price_master.systems[].options から取得） |
| common | 共通オプション（price_master.common_options から取得） |
| scale | 規模係数用（calculation_rules.scale_factors から取得） |

### 条件分岐の例
```json
{
  "type": "conditional",
  "condition": {
    "check": "base_selection",  // または "option_selected", "scale_type"
    "equals": "乗り物・送迎",
    "true_next": "reservation_maas_options",
    "false_next": "common_external_link"
  }
}
```

---

## 3. calculation_rules.json の構造

### 規模係数
```json
{
  "scale_factors": {
    "users": {
      "types": {
        "users_and_locations": {  // 社内システム向け
          "〜50人": 1.0,
          "51〜200人": 1.1,
          ...
        },
        "users_large": {  // 一般利用者向け（予約・EC・地域DX）
          "〜5000人": 1.0,
          ...
        }
      }
    },
    "locations": {...},  // 拠点数係数
    "deadline": {...}    // 納期係数（ホームページのみ）
  }
}
```

### 計算式
```
最終見積もり = (ベース + オプション合計 + 外部連携 + データ移行) 
              × 利用者係数 × 拠点係数 × 納期係数
```

---

## 4. 実装時の注意点

### 状態管理
セッションごとに以下を保持：
```typescript
interface EstimateSession {
  sessionId: string;
  system: string | null;           // 選択されたシステム種別
  currentStep: string;             // 現在の質問ID
  baseSelection: Selection | null; // ベース選択
  optionSelections: Selection[];   // オプション選択（複数）
  commonSelections: {              // 共通オプション
    externalLink: Selection | null;
    dataMigration: Selection | null;
  };
  scaleSelections: {               // 規模選択
    users: string | null;
    locations: string | null;
    deadline: string | null;
  };
}

interface Selection {
  key: string;
  min: number;
  std: number;
  max: number;
}
```

### 複数選択時の「なし」処理
- 「なし」「特になし」が選択されたら、他の選択をクリア
- 他のオプションが選択されたら「なし」をクリア

### 条件付きオプションの表示制御
```typescript
function getVisibleOptions(options, baseSelection) {
  return options.filter(opt => 
    !opt.condition || opt.condition === baseSelection?.key
  );
}
```

### 規模係数の適用
```typescript
function getScaleType(system: string): string {
  return calculationRules.system_scale_type_mapping[system];
}

function getUserOptions(scaleType: string) {
  if (scaleType === 'deadline_only') return null;
  return calculationRules.scale_factors.users.types[scaleType];
}

function needsLocationQuestion(scaleType: string): boolean {
  return scaleType === 'users_and_locations';
}

function needsDeadlineQuestion(scaleType: string): boolean {
  return scaleType === 'deadline_only';
}
```

---

## 5. AI解析モジュール（自由テキスト入力時）

### 使用タイミング
- スタート画面で「上記に当てはまらない／複数ある」を選択
- 任意の自由入力欄にテキスト入力

### AIへのリクエスト
```typescript
const prompt = `
あなたはシステム開発見積もりアシスタントです。
ユーザーの入力を解析し、最も適切なシステムカテゴリを1つ特定してください。

【対応カテゴリ】
1. 予約システム（来店/施設/乗り物・送迎/イベント）
2. 在庫管理システム
...（decision_tree.json の ai_analysis_config.categories を参照）

【ユーザー入力】
${userInput}

【出力形式】JSON
{
  "category_id": "システムID",
  "category_name": "システム名",
  "sub_category": "サブカテゴリ（該当する場合）",
  "detected_features": ["検出された機能キーワード"],
  "confidence": "high/medium/low",
  "clarification_needed": "補足質問（必要な場合）"
}
`;
```

### 解析結果の処理
```typescript
if (result.confidence === 'high') {
  // 該当分岐に直接誘導
  navigateTo(result.category_id + '_base');
} else if (result.confidence === 'medium') {
  // 確認してから誘導
  showConfirmation(`${result.category_name}でよろしいですか？`);
} else {
  // 選択肢を再提示
  showEntryPoint();
}
```

---

## 6. 見積もり計算ロジック

```typescript
function calculateEstimate(session: EstimateSession): EstimateResult {
  const { baseSelection, optionSelections, commonSelections, scaleSelections } = session;
  
  // 1. 機能小計
  const subtotal = {
    min: baseSelection.min + sum(optionSelections.map(o => o.min)),
    std: baseSelection.std + sum(optionSelections.map(o => o.std)),
    max: baseSelection.max + sum(optionSelections.map(o => o.max))
  };
  
  // 2. 共通オプション加算
  const withCommon = {
    min: subtotal.min + (commonSelections.externalLink?.min || 0) + (commonSelections.dataMigration?.min || 0),
    std: subtotal.std + (commonSelections.externalLink?.std || 0) + (commonSelections.dataMigration?.std || 0),
    max: subtotal.max + (commonSelections.externalLink?.max || 0) + (commonSelections.dataMigration?.max || 0)
  };
  
  // 3. 規模係数取得
  const scaleType = getScaleType(session.system);
  const userFactor = getUserFactor(scaleType, scaleSelections.users);
  const locationFactor = getLocationFactor(scaleSelections.locations);
  const deadlineFactor = getDeadlineFactor(scaleSelections.deadline);
  
  // 4. 最終計算
  const totalFactor = userFactor * locationFactor * deadlineFactor;
  
  return {
    min: Math.ceil(withCommon.min * totalFactor),
    std: Math.ceil(withCommon.std * totalFactor),
    max: Math.ceil(withCommon.max * totalFactor),
    breakdown: {
      base: baseSelection,
      options: optionSelections,
      common: commonSelections,
      factors: { userFactor, locationFactor, deadlineFactor, totalFactor }
    }
  };
}
```

---

## 7. UI要件

### 会話形式
- 1回の質問は1つだけ
- チャットバブル形式で表示
- 選択肢はボタンとして表示
- 複数選択時は選択状態を視覚的に表示
- 「戻る」機能で前の質問に戻れる

### 結果表示
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ご要望の整理
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
・乗り物・送迎のネット予約
・スマホアプリ＋電話対応
・AI配車最適化
・利用者数: 5,000〜20,000人

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 概算見積もり
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 最小構成    約380万円〜
 標準構成    約650万円〜  ← おすすめ
 フル構成    約1,050万円〜

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[詳しく相談する]  [メールで受け取る]
[条件を変えて再計算]
```

---

## 8. 技術スタック推奨

### フロントエンド
- Next.js（React）
- Tailwind CSS
- Framer Motion（アニメーション）

### バックエンド
- Next.js API Routes
- Claude Haiku API（AI解析時のみ）

### データ
- JSONファイルをそのまま使用
- 将来的にはDBに移行可能

---

## 9. テスト観点

1. **全分岐パス**: 13システム × 各分岐を網羅
2. **計算精度**: Excelの計算結果と一致確認
3. **条件分岐**: 条件付きオプションの表示/非表示
4. **規模係数**: 各scale_typeで正しい係数が適用されるか
5. **AI解析**: 様々な自由入力に対する分類精度
6. **エッジケース**: 
   - オプション未選択
   - 「なし」のみ選択
   - 最大オプション選択
