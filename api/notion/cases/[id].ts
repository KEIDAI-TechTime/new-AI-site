import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY || '';
const NOTION_CASES_DATABASE_ID = process.env.NOTION_CASES_DATABASE_ID || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!NOTION_API_KEY || !NOTION_CASES_DATABASE_ID) {
    return res.status(500).json({ error: 'Notion API not configured' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Case ID is required' });
  }

  try {
    // Notion page IDのフォーマット処理（ハイフンを削除）
    const pageId = id.replace(/-/g, '');

    const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: 'Failed to fetch case from Notion',
        details: errorData
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching case:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
