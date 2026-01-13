import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.NOTION_API_KEY || '';
  const dbId = process.env.NOTION_DATABASE_ID || '';
  const casesDbId = process.env.NOTION_CASES_DATABASE_ID || '';

  // セキュリティのため、最初の10文字と最後の4文字のみ表示
  const maskSecret = (secret: string) => {
    if (!secret) return 'NOT SET';
    if (secret.length < 15) return 'TOO SHORT';
    return `${secret.substring(0, 10)}...${secret.substring(secret.length - 4)}`;
  };

  return res.status(200).json({
    NOTION_API_KEY: {
      exists: !!apiKey,
      length: apiKey.length,
      preview: maskSecret(apiKey),
      startsWithNtn: apiKey.startsWith('ntn_'),
    },
    NOTION_DATABASE_ID: {
      exists: !!dbId,
      length: dbId.length,
      preview: maskSecret(dbId),
      value: dbId, // Database IDは秘密ではないので全体を表示
    },
    NOTION_CASES_DATABASE_ID: {
      exists: !!casesDbId,
      length: casesDbId.length,
      preview: maskSecret(casesDbId),
      value: casesDbId,
    },
  });
}
