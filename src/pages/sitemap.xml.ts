import type { APIRoute } from 'astro';
import { posts } from '@/data/posts';
import { services } from '@/data/services';
import { terms } from '@/data/glossary';

/* 検索エンジンに渡すページの一覧。記事・サービス・用語は、それぞれのデータから作る。
   ページを足したら、ここに自動で入る（固定のページだけは下の fixed に足す）。 */
const SITE = 'https://techtime-jp.com';
const BUILT = [...posts.map((p) => p.date.replace(/\./g, '-')), '2026-11-17'].sort().at(-1)!;
/* 固定のページ：[パス, 最後に中身を直した日, 優先度] */
const fixed: [string, string, string][] = [
  ['/', BUILT, '1.0'],
  ['/services', '2026-11-17', '0.9'],
  ['/assessment', '2026-11-15', '0.9'],
  ['/blog', BUILT, '0.8'],
  ['/check', '2026-11-17', '0.7'],
  ['/process', '2026-11-17', '0.7'],
  ['/faq', '2026-11-17', '0.6'],
  ['/resources', '2026-11-17', '0.6'],
  ['/glossary', '2026-11-17', '0.6'],
  ['/company', '2026-11-17', '0.5'],
  ['/contact', '2026-11-15', '0.5'],
  ['/downloads/techtime-assessment-sample.pdf', '2026-11-15', '0.5'],
];

export const GET: APIRoute = () => {
  const rows = [
    ...fixed,
    ...services.map((s) => [`/services/${s.slug}`, '2026-11-17', '0.8'] as [string, string, string]),
    ...posts.map((p) => [`/blog/${p.slug}`, p.date.replace(/\./g, '-'), '0.7'] as [string, string, string]),
    ...terms.map((t) => [`/glossary/${t.slug}`, '2026-11-17', '0.5'] as [string, string, string]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.map(([p, d, pr]) => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${d}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
