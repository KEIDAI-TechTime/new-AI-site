import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { NotionCase, CaseCategory } from '../types/notion';

// Category mapping
export const CASE_CATEGORIES: Record<string, CaseCategory> = {
  '文書管理': { id: '文書管理', name: '文書管理' },
  '在庫管理': { id: '在庫管理', name: '在庫管理' },
  '顧客管理': { id: '顧客管理', name: '顧客管理' },
  '経営BI': { id: '経営BI', name: '経営BI' },
  '生産管理': { id: '生産管理', name: '生産管理' },
  '人事給与': { id: '人事給与', name: '人事給与' },
} as const;

// Get environment variables
const NOTION_API_KEY = import.meta.env.NOTION_API_KEY || process.env.NOTION_API_KEY || '';
const NOTION_CASES_DATABASE_ID = import.meta.env.NOTION_CASES_DATABASE_ID || process.env.NOTION_CASES_DATABASE_ID || '';

/**
 * Convert Notion image URL to persistent proxy URL
 * Notion API returns temporary signed S3 URLs that expire after ~1 hour
 * This converts them to Notion's image proxy which doesn't expire
 */
function toNotionImageProxy(url: string, blockId?: string): string {
  if (!url) return '';

  // Already a Notion proxy URL - return as is
  if (url.startsWith('https://www.notion.so/image/')) {
    return url;
  }

  // Internal Notion path (starts with /)
  if (url.startsWith('/')) {
    return `https://www.notion.so${url}`;
  }

  // External or S3 URL - convert to proxy format
  if (url.startsWith('http')) {
    const encodedUrl = encodeURIComponent(url);
    const idParam = blockId ? `&id=${blockId.replace(/-/g, '')}` : '';
    return `https://www.notion.so/image/${encodedUrl}?table=block${idParam}`;
  }

  return url;
}

// Lazy initialization for Notion client
let notionClient: Client | null = null;
let n2mClient: NotionToMarkdown | null = null;

function getNotionClient(): Client | null {
  if (!NOTION_API_KEY) {
    return null;
  }
  if (!notionClient) {
    notionClient = new Client({ auth: NOTION_API_KEY });
  }
  return notionClient;
}

function getN2MClient(): NotionToMarkdown | null {
  const client = getNotionClient();
  if (!client) {
    return null;
  }
  if (!n2mClient) {
    n2mClient = new NotionToMarkdown({ notionClient: client });
  }
  return n2mClient;
}

// Static fallback data for when Notion is not configured
export const STATIC_CASES: NotionCase[] = [
  {
    id: '1',
    category: '文書管理',
    title: '大手製造業A社様 文書管理システム',
    description: '全社の技術文書・品質文書を一元管理し、承認ワークフローを自動化。検索性が大幅に向上し、文書管理業務の工数を60%削減。',
    image: 'https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20digital%20document%20management%20system%20displayed%20on%20multiple%20screens%2C%20clean%20organized%20environment%20with%20filing%20cabinets%20and%20computers%2C%20professional%20business%20setting%20with%20natural%20lighting%2C%20minimalist%20design%20with%20blue%20and%20white%20color%20scheme%2C%20high-tech%20atmosphere&width=800&height=600&seq=case1&orientation=landscape',
    scale: '大規模',
    period: '6ヶ月',
    cost: '850万円',
    results: ['文書検索時間 70%短縮', '承認プロセス 50%高速化', '年間コスト 300万円削減'],
    published: true,
    order: 1
  },
  {
    id: '2',
    category: '在庫管理',
    title: '物流企業B社様 在庫管理システム',
    description: '複数拠点の在庫をリアルタイムで可視化し、適正在庫の維持を実現。過剰在庫と欠品を同時に削減し、キャッシュフローが改善。',
    image: 'https://readdy.ai/api/search-image?query=modern%20warehouse%20with%20automated%20inventory%20management%20system%2C%20organized%20shelves%20with%20products%20and%20barcode%20scanners%2C%20clean%20industrial%20environment%20with%20LED%20lighting%2C%20workers%20using%20tablets%20for%20inventory%20tracking%2C%20efficient%20logistics%20operation%20with%20blue%20accent%20lighting&width=800&height=600&seq=case2&orientation=landscape',
    scale: '標準規模',
    period: '4ヶ月',
    cost: '420万円',
    results: ['在庫回転率 35%向上', '欠品率 80%削減', '棚卸時間 65%短縮'],
    published: true,
    order: 2
  },
  {
    id: '3',
    category: '顧客管理',
    title: '商社C社様 顧客・販売管理システム',
    description: '顧客情報と案件情報を統合管理し、営業活動を可視化。データに基づく戦略的な営業が可能になり、売上が20%向上。',
    image: 'https://readdy.ai/api/search-image?query=modern%20sales%20office%20with%20customer%20relationship%20management%20dashboard%20on%20large%20monitors%2C%20professional%20business%20environment%20with%20sales%20team%20collaborating%2C%20clean%20workspace%20with%20charts%20and%20analytics%20displays%2C%20contemporary%20office%20design%20with%20natural%20light%20and%20blue%20accent%20colors&width=800&height=600&seq=case3&orientation=landscape',
    scale: '標準規模',
    period: '5ヶ月',
    cost: '580万円',
    results: ['売上 20%向上', '商談成約率 30%改善', '営業効率 40%向上'],
    published: true,
    order: 3
  },
  {
    id: '4',
    category: '経営BI',
    title: '小売業D社様 経営ダッシュボード',
    description: '全店舗の売上・在庫・顧客データをリアルタイムで可視化。経営判断のスピードが向上し、機会損失を最小化。',
    image: 'https://readdy.ai/api/search-image?query=executive%20office%20with%20large%20business%20intelligence%20dashboard%20displaying%20real-time%20analytics%20and%20KPIs%2C%20modern%20corporate%20environment%20with%20multiple%20screens%20showing%20charts%20and%20graphs%2C%20professional%20setting%20with%20clean%20design%20and%20blue%20data%20visualization%20elements&width=800&height=600&seq=case4&orientation=landscape',
    scale: '標準規模',
    period: '3ヶ月',
    cost: '380万円',
    results: ['意思決定速度 50%向上', 'データ集計時間 90%削減', '売上予測精度 25%改善'],
    published: true,
    order: 4
  },
  {
    id: '5',
    category: '生産管理',
    title: '製造業E社様 生産管理システム',
    description: '生産計画から工程管理、進捗管理まで一元化。リアルタイムな生産状況の把握により、納期遵守率が大幅に向上。',
    image: 'https://readdy.ai/api/search-image?query=modern%20manufacturing%20facility%20with%20digital%20production%20management%20system%2C%20factory%20floor%20with%20automated%20machinery%20and%20monitoring%20screens%2C%20clean%20industrial%20environment%20with%20workers%20using%20tablets%2C%20efficient%20production%20line%20with%20blue%20LED%20indicators%20and%20organized%20workspace&width=800&height=600&seq=case5&orientation=landscape',
    scale: '大規模',
    period: '7ヶ月',
    cost: '920万円',
    results: ['納期遵守率 95%達成', '生産効率 30%向上', '在庫コスト 25%削減'],
    published: true,
    order: 5
  },
  {
    id: '6',
    category: '人事給与',
    title: 'サービス業F社様 人事・給与システム',
    description: '人事情報管理から給与計算、勤怠管理まで統合。給与計算の自動化により、人事部門の業務負荷が大幅に軽減。',
    image: 'https://readdy.ai/api/search-image?query=modern%20HR%20office%20with%20human%20resources%20management%20system%20on%20computers%2C%20professional%20workspace%20with%20employee%20data%20dashboards%2C%20clean%20corporate%20environment%20with%20organized%20filing%20and%20digital%20screens%2C%20contemporary%20office%20design%20with%20natural%20lighting%20and%20blue%20interface%20elements&width=800&height=600&seq=case6&orientation=landscape',
    scale: '標準規模',
    period: '4ヶ月',
    cost: '450万円',
    results: ['給与計算時間 80%削減', '人事業務効率 50%向上', '勤怠管理精度 向上'],
    published: true,
    order: 6
  }
];

/**
 * Check if Notion is configured for cases
 */
export function isNotionCasesConfigured(): boolean {
  return Boolean(NOTION_API_KEY && NOTION_CASES_DATABASE_ID);
}

/**
 * Get case studies from Notion or fallback to static data
 */
export async function getCases(category?: string): Promise<NotionCase[]> {
  // If Notion is not configured, return static data
  if (!isNotionCasesConfigured()) {
    console.log('[Notion Cases] Database not configured, using static data');
    let cases = STATIC_CASES;
    if (category) {
      cases = cases.filter(c => c.category === category);
    }
    return cases;
  }

  const notion = getNotionClient();
  if (!notion) {
    console.log('[Notion Cases] Client not available, using static data');
    let cases = STATIC_CASES;
    if (category) {
      cases = cases.filter(c => c.category === category);
    }
    return cases;
  }

  try {
    const filter: any = {
      and: [
        { property: 'Published', checkbox: { equals: true } },
      ],
    };

    if (category) {
      filter.and.push({
        property: 'Category',
        select: { equals: category },
      });
    }

    const response = await notion.databases.query({
      database_id: NOTION_CASES_DATABASE_ID,
      filter,
      sorts: [{ property: 'Order', direction: 'ascending' }],
    });

    const cases = await Promise.all(
      response.results.map(async (page: any) => convertPageToCase(page))
    );

    return cases.filter((c): c is NotionCase => c !== null);
  } catch (error) {
    console.error('[Notion Cases] Failed to fetch cases:', error);
    // Fallback to static data on error
    let cases = STATIC_CASES;
    if (category) {
      cases = cases.filter(c => c.category === category);
    }
    return cases;
  }
}

/**
 * Get single case by ID
 */
export async function getCase(id: string): Promise<NotionCase | null> {
  // If Notion is not configured, return from static data
  if (!isNotionCasesConfigured()) {
    return STATIC_CASES.find(c => c.id === id) || null;
  }

  const notion = getNotionClient();
  if (!notion) {
    return STATIC_CASES.find(c => c.id === id) || null;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    const caseData = await convertPageToCase(page);

    if (!caseData) return null;

    // Get page content
    let content = '';
    const n2m = getN2MClient();
    if (n2m) {
      const mdBlocks = await n2m.pageToMarkdown(id);
      content = n2m.toMarkdownString(mdBlocks).parent;
    }

    return {
      ...caseData,
      content,
    };
  } catch (error) {
    console.error('[Notion Cases] Failed to fetch case:', error);
    // Fallback to static data
    return STATIC_CASES.find(c => c.id === id) || null;
  }
}

/**
 * Get all case IDs for static generation
 */
export async function getAllCaseIds(): Promise<string[]> {
  // If Notion is not configured, return static IDs
  if (!isNotionCasesConfigured()) {
    return STATIC_CASES.map(c => c.id);
  }

  const notion = getNotionClient();
  if (!notion) {
    return STATIC_CASES.map(c => c.id);
  }

  try {
    const response = await notion.databases.query({
      database_id: NOTION_CASES_DATABASE_ID,
      filter: { property: 'Published', checkbox: { equals: true } },
    });

    return response.results.map((page: any) => page.id);
  } catch (error) {
    console.error('[Notion Cases] Failed to fetch case IDs:', error);
    // Fallback to static IDs
    return STATIC_CASES.map(c => c.id);
  }
}

/**
 * Convert Notion page to case object
 */
async function convertPageToCase(page: any): Promise<NotionCase | null> {
  try {
    const properties = page.properties;

    const title =
      properties.Title?.title?.[0]?.plain_text ||
      properties.Name?.title?.[0]?.plain_text ||
      properties['名前']?.title?.[0]?.plain_text ||
      'Untitled';

    const category =
      properties.Category?.select?.name ||
      properties.category?.select?.name ||
      '文書管理';

    const description =
      properties.Description?.rich_text?.[0]?.plain_text ||
      properties.description?.rich_text?.[0]?.plain_text ||
      '';

    let rawImageUrl =
      properties.Image?.url ||
      properties.image?.url ||
      '';

    if (!rawImageUrl) {
      if (page.cover?.type === 'external') {
        rawImageUrl = page.cover.external.url;
      } else if (page.cover?.type === 'file') {
        rawImageUrl = page.cover.file.url;
      }
    }

    // Convert to persistent proxy URL to avoid expiration
    const image = rawImageUrl ? toNotionImageProxy(rawImageUrl, page.id) : '';

    const scale =
      properties.Scale?.select?.name ||
      properties.scale?.select?.name ||
      '標準規模';

    const period =
      properties.Period?.rich_text?.[0]?.plain_text ||
      properties.period?.rich_text?.[0]?.plain_text ||
      '';

    const cost =
      properties.Cost?.rich_text?.[0]?.plain_text ||
      properties.cost?.rich_text?.[0]?.plain_text ||
      '';

    const resultsText =
      properties.Results?.rich_text?.[0]?.plain_text ||
      properties.results?.rich_text?.[0]?.plain_text ||
      '';
    const results = resultsText
      .split(/\n|,/)
      .map((r: string) => r.trim())
      .filter((r: string) => r.length > 0);

    const published = properties.Published?.checkbox ?? true;
    const order = properties.Order?.number || properties.order?.number || 0;

    return {
      id: page.id,
      title,
      category,
      description,
      image,
      scale,
      period,
      cost,
      results,
      published,
      order,
    };
  } catch (error) {
    console.error('[Notion Cases] Failed to convert page to case:', error);
    return null;
  }
}
