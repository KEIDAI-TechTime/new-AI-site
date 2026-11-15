import type { APIRoute } from 'astro';
import { posts } from '@/data/posts';

/* 検索エンジン向けの一覧。記事は src/data/posts.ts から自動で入る。
   旧デザインのページ（about・simulator など）は、新しいサイトからリンクしていないので載せない。 */
const SITE = 'https://techtime-jp.com';
const day = (d: string) => d.replace(/\./g, '-');
const latest = posts.map((p) => day(p.date)).sort().pop()!;

const pages = [
  { loc: '/', lastmod: latest, changefreq: 'weekly', priority: '1.0' },
  { loc: '/assessment', lastmod: latest, changefreq: 'monthly', priority: '0.9' },
  { loc: '/blog', lastmod: latest, changefreq: 'weekly', priority: '0.9' },
  { loc: '/contact', lastmod: latest, changefreq: 'monthly', priority: '0.8' },
  { loc: '/downloads/techtime-assessment-sample.pdf', lastmod: latest, changefreq: 'monthly', priority: '0.7' },
  ...[...posts]
    .sort((a, b) => Number(b.no) - Number(a.no))
    .map((p) => ({ loc: `/blog/${p.slug}`, lastmod: day(p.date), changefreq: 'monthly', priority: '0.8' })),
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
