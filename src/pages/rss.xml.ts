import type { APIRoute } from 'astro';
import { posts } from '@/data/posts';

/* ブログの更新を知らせる RSS。記事の一覧（posts.ts）から作る。 */
const SITE = 'https://techtime-jp.com';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = () => {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : Number(b.no) - Number(a.no)));
  const items = sorted
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const d = new Date(`${p.date.replace(/\./g, '-')}T09:00:00+09:00`).toUTCString();
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${d}</pubDate><category>${esc(p.cat)}</category><description>${esc(p.dek)}</description></item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>TechTime ブログ</title>
<link>${SITE}/blog</link>
<atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
<description>SAP の導入と運用保守を、生成AIで進める方法を書いています。</description>
<language>ja</language>
${items}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
