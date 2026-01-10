import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.VITE_NOTION_API_KEY || '';
const NOTION_VERSION = '2022-06-28';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!NOTION_API_KEY) {
    return res.status(500).json({ error: 'Notion API not configured' });
  }

  try {
    const { pageId } = req.query;

    if (!pageId || typeof pageId !== 'string') {
      return res.status(400).json({ error: 'Page ID is required' });
    }

    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API error:', error);
      return res.status(response.status).json({ error: 'Notion API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
