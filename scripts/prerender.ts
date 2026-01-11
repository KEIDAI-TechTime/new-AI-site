import fs from 'fs/promises';
import path from 'path';

// Page metadata for SEO
const pages = {
  '/': {
    title: 'TechTime | AI駆動の低価格基幹システム開発',
    description: '従来の半分以下のコストで御社専用の基幹システムを構築。AI駆動開発により設計からテストまで数分で初版生成。文書管理、在庫管理、顧客管理など各種システムに対応。見積もりシミュレーターで即座に概算金額を確認できます。',
  },
  '/systems': {
    title: '対応システム | TechTime株式会社',
    description: '文書管理、在庫管理、顧客管理など、各種基幹システムに対応。AI駆動開発により、従来の半分以下のコストで高品質なシステムを提供します。',
  },
  '/simulator': {
    title: '見積もりシミュレーター | TechTime株式会社',
    description: 'システム開発の見積もりを即座に確認。プロジェクト規模、開発期間、機能要件を入力するだけで、概算金額をその場で算出します。',
  },
  '/ai-development': {
    title: 'AI駆動開発 | TechTime株式会社',
    description: 'AI技術を活用した革新的な開発手法で、設計からテストまで数分で初版を生成。開発スピードと品質を両立した次世代の開発サービス。',
  },
  '/quality-assurance': {
    title: '品質保証 | TechTime株式会社',
    description: 'TechTimeの品質保証サービス。徹底したテスト体制で、高品質なシステムを提供します。バグの早期発見と継続的な品質改善をサポート。',
  },
  '/blog': {
    title: 'ブログ | TechTime株式会社',
    description: 'TechTimeの最新情報や技術ブログをお届けします。AI駆動開発、システム開発のノウハウなど、役立つ情報を発信中。',
  },
  '/cases': {
    title: '開発事例 | TechTime株式会社',
    description: 'TechTimeが手がけた基幹システム開発の事例をご紹介。様々な業種・規模のプロジェクト実績をご覧いただけます。',
  },
  '/about': {
    title: '会社概要 | TechTime株式会社',
    description: 'TechTime株式会社の会社概要。AI駆動開発で企業の基幹システム開発に革新をもたらします。東京・大阪にオフィスを構え、全国のお客様にサービスを提供しています。',
  },
  '/contact': {
    title: 'お問い合わせ | TechTime株式会社',
    description: 'システム開発に関するご相談、お見積もりのご依頼など、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。',
  },
};

async function prerender() {
  const distPath = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distPath, 'index.html');

  try {
    const template = await fs.readFile(templatePath, 'utf-8');

    for (const [route, meta] of Object.entries(pages)) {
      try {
        // Update meta tags
        let html = template;

        // Update title
        html = html.replace(
          /<title>.*?<\/title>/,
          `<title>${meta.title}</title>`
        );

        // Update description
        html = html.replace(
          /<meta name="description" content=".*?">/,
          `<meta name="description" content="${meta.description}">`
        );

        // Update OGP title
        html = html.replace(
          /<meta property="og:title" content=".*?" \/>/,
          `<meta property="og:title" content="${meta.title}" />`
        );

        // Update OGP description
        html = html.replace(
          /<meta property="og:description" content=".*?" \/>/,
          `<meta property="og:description" content="${meta.description}" />`
        );

        // Update OGP URL
        html = html.replace(
          /<meta property="og:url" content=".*?" \/>/,
          `<meta property="og:url" content="https://techtime-jp.com${route}" />`
        );

        // Update canonical URL
        html = html.replace(
          /<link rel="canonical" href=".*?" \/>/,
          `<link rel="canonical" href="https://techtime-jp.com${route}" />`
        );

        // Update Twitter Card title
        html = html.replace(
          /<meta name="twitter:title" content=".*?">/,
          `<meta name="twitter:title" content="${meta.title}">`
        );

        // Update Twitter Card description
        html = html.replace(
          /<meta name="twitter:description" content=".*?">/,
          `<meta name="twitter:description" content="${meta.description}">`
        );

        // Create directory structure
        const routePath = route === '/' ? '' : route;
        const routeDir = path.join(distPath, routePath);
        const htmlPath = path.join(routeDir, 'index.html');

        await fs.mkdir(routeDir, { recursive: true });
        await fs.writeFile(htmlPath, html, 'utf-8');

        console.log(`✓ Pre-rendered: ${route}`);
      } catch (err) {
        console.error(`✗ Failed to pre-render ${route}:`, err);
      }
    }

    console.log('\n✓ Pre-rendering complete! All pages have optimized meta tags for SEO.');
  } catch (err) {
    console.error('Pre-rendering failed:', err);
    process.exit(1);
  }
}

prerender();
