import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY || '';
const NOTION_CASES_DATABASE_ID = process.env.NOTION_CASES_DATABASE_ID || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // デバッグ: 環境変数の確認
  console.log('DEBUG - API Key exists:', !!NOTION_API_KEY);
  console.log('DEBUG - API Key prefix:', NOTION_API_KEY ? NOTION_API_KEY.substring(0, 10) + '...' : 'null');
  console.log('DEBUG - Cases DB ID exists:', !!NOTION_CASES_DATABASE_ID);
  console.log('DEBUG - Cases DB ID:', NOTION_CASES_DATABASE_ID || 'null');

  if (!NOTION_API_KEY || !NOTION_CASES_DATABASE_ID) {
    return res.status(500).json({
      error: 'Notion API not configured',
      details: {
        hasApiKey: !!NOTION_API_KEY,
        hasCasesDbId: !!NOTION_CASES_DATABASE_ID,
        apiKeyPrefix: NOTION_API_KEY ? NOTION_API_KEY.substring(0, 10) + '...' : 'null'
      }
    });
  }

  try {
    const { category } = req.query;

    // フィルタを構築
    const filter: any = {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    };

    // カテゴリフィルタを追加
    if (category && typeof category === 'string') {
      filter.and.push({
        property: 'Category',
        select: {
          equals: category,
        },
      });
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_CASES_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter,
          sorts: [
            {
              property: 'Order',
              direction: 'ascending',
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error:', errorData);
      return res.status(response.status).json({
        error: 'Failed to fetch cases from Notion',
        details: errorData
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
