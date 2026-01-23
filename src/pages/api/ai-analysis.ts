export const prerender = false;

import type { APIRoute } from 'astro';

const categories = [
  { id: "reservation", name: "予約システム", keywords: ["予約", "受付", "来店", "送迎", "乗り物", "イベント", "セミナー", "サロン", "飲食店", "施設", "会議室"] },
  { id: "inventory", name: "在庫管理", keywords: ["在庫", "商品管理", "部品", "原材料", "棚卸", "ロット"] },
  { id: "warehouse", name: "倉庫・物流", keywords: ["倉庫", "物流", "配送", "出荷", "入荷", "ピッキング", "配車"] },
  { id: "crm_sfa", name: "顧客・販売", keywords: ["顧客", "CRM", "営業", "売上", "見積", "受注", "SFA"] },
  { id: "procurement", name: "購買・調達", keywords: ["購買", "調達", "発注", "仕入", "サプライヤー"] },
  { id: "bi", name: "BI", keywords: ["BI", "ダッシュボード", "見える化", "分析", "レポート", "経営", "KPI"] },
  { id: "production", name: "生産管理", keywords: ["生産", "製造", "工場", "工程", "MES", "品質"] },
  { id: "hr", name: "人事・給与", keywords: ["人事", "給与", "勤怠", "採用", "評価", "社員"] },
  { id: "accounting", name: "原価・会計", keywords: ["原価", "会計", "経理", "財務", "コスト", "予算"] },
  { id: "document", name: "文書管理", keywords: ["文書", "書類", "申請", "ワークフロー", "承認", "稟議"] },
  { id: "ec", name: "EC", keywords: ["EC", "通販", "ネットショップ", "オンライン販売", "カート", "ショッピング"] },
  { id: "regional_dx", name: "地域DX", keywords: ["地域", "自治体", "MaaS", "観光", "防災", "行政", "公共"] },
  { id: "homepage", name: "ホームページ", keywords: ["ホームページ", "Webサイト", "コーポレートサイト", "HP", "ランディングページ"] }
];

function keywordFallback(userInput: string): { category_id: string; category_name: string; confidence: string } {
  let bestMatch = { id: '', name: '', score: 0 };

  for (const cat of categories) {
    let score = 0;
    for (const keyword of cat.keywords) {
      if (userInput.includes(keyword)) {
        score++;
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { id: cat.id, name: cat.name, score };
    }
  }

  if (bestMatch.score >= 2) {
    return { category_id: bestMatch.id, category_name: bestMatch.name, confidence: 'high' };
  } else if (bestMatch.score === 1) {
    return { category_id: bestMatch.id, category_name: bestMatch.name, confidence: 'medium' };
  }

  return { category_id: '', category_name: '', confidence: 'low' };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { userInput } = body;

    if (!userInput || typeof userInput !== 'string') {
      return new Response(JSON.stringify({ error: 'userInput is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;

    // If no API key, use keyword-based fallback
    if (!apiKey) {
      const fallback = keywordFallback(userInput);
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `あなたはシステム開発見積もりアシスタントです。ユーザーの入力を解析し、最も適切なシステムカテゴリを1つ特定してください。

【対応カテゴリ】
1. reservation: 予約システム（来店/施設/乗り物・送迎/イベント）
2. inventory: 在庫管理
3. warehouse: 倉庫・物流
4. crm_sfa: 顧客・販売（CRM/SFA）
5. procurement: 購買・調達
6. bi: BI（経営ダッシュボード）
7. production: 生産管理
8. hr: 人事・給与
9. accounting: 原価・会計
10. document: 文書管理
11. ec: EC（ネットショップ）
12. regional_dx: 地域DX
13. homepage: ホームページ

JSONのみを返してください。説明文は不要です。`;

    const userPrompt = `【ユーザー入力】
${userInput}

【出力形式】以下のJSON形式で回答してください：
{
  "category_id": "カテゴリID（上記の英語ID）",
  "category_name": "カテゴリ名（日本語）",
  "confidence": "high/medium/low"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 256,
        messages: [
          { role: 'user', content: userPrompt }
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      // Fallback to keyword matching
      const fallback = keywordFallback(userInput);
      return new Response(JSON.stringify(fallback), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify({
        category_id: parsed.category_id || '',
        category_name: parsed.category_name || '',
        confidence: parsed.confidence || 'low',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fallback
    const fallback = keywordFallback(userInput);
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ category_id: '', category_name: '', confidence: 'low' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
