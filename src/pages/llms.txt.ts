import type { APIRoute } from 'astro';
import { posts } from '@/data/posts';
import { services } from '@/data/services';
import { terms } from '@/data/glossary';

/* AI の検索や要約に向けた、サイトの案内（llms.txt）。ページの一覧と一行の説明を、データから作る。 */
const SITE = 'https://techtime-jp.com';

export const GET: APIRoute = () => {
  const txt = `# TechTime株式会社

> TechTime は、SAP を中心とした基幹システムの導入と運用保守に、生成AIのチームを組み込む会社です。設計、開発、テスト、点検、進捗管理を担当するAIの手順を、お客様の様式と規約に合わせて作ります。提供するのは、人の作業時間ではなく、プロジェクトに残る手順と点検の観点です。所在地は東京都渋谷区です。

## 主なページ

- [トップ](${SITE}/): SAP 導入に、AIチームという選択肢を。サービスの全体像
- [サービスの一覧](${SITE}/services): 工程ごとの、AIチームの組み込み方
- [アセスメント](${SITE}/assessment): プロジェクトの資料を全件読み、生成AIが効く工程を報告書にまとめるサービス
- [アセスメント結果報告書のサンプル（PDF）](${SITE}/downloads/techtime-assessment-sample.pdf): 架空の会社を題材にした29枚の報告書
- [進め方とお見積もり](${SITE}/process): 相談から組み込みまでの5つの段階と、お見積もりの決まり方
- [AI活用の自己診断](${SITE}/check): 10問で、生成AIが効きやすい工程を確かめる
- [よくある質問](${SITE}/faq)
- [資料とひな形](${SITE}/resources): 設計書レビューの観点表、移行データの照合の記録表、会議の決定と未決の記録表
- [会社概要](${SITE}/company)
- [相談する](${SITE}/contact)

## サービス（工程別）

${services.map((s) => `- [${s.name}](${SITE}/services/${s.slug}): ${s.lead}`).join('\n')}

## ブログ

${posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.dek}`).join('\n')}

## 用語集

${terms.map((t) => `- [${t.word}](${SITE}/glossary/${t.slug}): ${t.def}`).join('\n')}
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
