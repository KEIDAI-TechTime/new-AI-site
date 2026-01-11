import type { NotionPost, BlogCategory, NotionCase, CaseCategory } from '../types/notion';

// APIエンドポイント（本番ではVercel Functions、開発では直接API呼び出し）
const API_BASE = '/api/notion';

// デバッグ用ログ
console.log('[Notion API] Using API proxy:', API_BASE);

// カテゴリマッピング
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  ceo_column: { slug: 'ceo_column', name: '社長コラム' },
  'tech-blog': { slug: 'tech-blog', name: '技術ブログ' },
} as const;

// 開発事例のカテゴリマッピング
export const CASE_CATEGORIES: Record<string, CaseCategory> = {
  '文書管理': { id: '文書管理', name: '文書管理' },
  '在庫管理': { id: '在庫管理', name: '在庫管理' },
  '顧客管理': { id: '顧客管理', name: '顧客管理' },
  '経営BI': { id: '経営BI', name: '経営BI' },
  '生産管理': { id: '生産管理', name: '生産管理' },
  '人事給与': { id: '人事給与', name: '人事給与' },
} as const;

/**
 * ブログ記事一覧を取得
 */
export async function getPosts(params?: {
  category?: string;
  perPage?: number;
  page?: number;
}): Promise<NotionPost[]> {
  console.log('[Notion API] getPosts called with params:', params);

  const { category, perPage = 10 } = params || {};

  try {
    console.log('[Notion API] Querying database via API proxy...');

    const queryParams = new URLSearchParams();
    if (category) queryParams.set('category', category);
    queryParams.set('perPage', perPage.toString());

    const url = `${API_BASE}/posts?${queryParams.toString()}`;
    console.log('[Notion API] Fetching from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Notion API] Request failed:', { status: response.status, error });
      return [];
    }

    const data = await response.json();
    console.log('[Notion API] Found', data.results.length, 'pages in database');

    // 一覧ページでは本文コンテンツを取得しない（高速化）
    const posts = await Promise.all(
      data.results.map(async (page: any) => {
        return await convertPageToPost(page, true); // skipContent = true
      })
    );

    const validPosts = posts.filter((post): post is NotionPost => post !== null);
    console.log('[Notion API] Returning', validPosts.length, 'valid posts');
    return validPosts;
  } catch (error) {
    console.error('[Notion API] Failed to fetch posts:', error);
    if (error instanceof Error) {
      console.error('[Notion API] Error details:', {
        message: error.message,
        name: error.name,
      });
    }
    return [];
  }
}

/**
 * 記事詳細を取得
 */
export async function getPost(slug: string): Promise<NotionPost | null> {
  try {
    console.log('[Notion API] Fetching post with slug:', slug);

    const url = `${API_BASE}/post?slug=${encodeURIComponent(slug)}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Notion API] Request failed:', { status: response.status, error });
      return null;
    }

    const data = await response.json();

    if (data.results.length === 0) {
      console.log('[Notion API] No post found with slug:', slug);
      return null;
    }

    const page = data.results[0];
    return await convertPageToPost(page);
  } catch (error) {
    console.error('[Notion API] Failed to fetch post:', error);
    return null;
  }
}

/**
 * NotionページをNotionPost型に変換
 */
async function convertPageToPost(page: any, skipContent: boolean = false): Promise<NotionPost | null> {
  try {
    const properties = page.properties;

    // タイトルを取得
    const title =
      properties.Title?.title?.[0]?.plain_text ||
      properties.Name?.title?.[0]?.plain_text ||
      properties['名前']?.title?.[0]?.plain_text ||
      'Untitled';

    // スラッグを取得
    const slug =
      properties.Slug?.rich_text?.[0]?.plain_text ||
      properties.slug?.rich_text?.[0]?.plain_text ||
      page.id;

    // カテゴリを取得 (selectから取得)
    const category =
      properties.Category?.select?.name ||
      properties.category?.select?.name ||
      'ceo_column';

    // カバー画像を取得
    let coverImage: string | undefined;
    if (page.cover?.type === 'external') {
      coverImage = page.cover.external.url;
    } else if (page.cover?.type === 'file') {
      coverImage = page.cover.file.url;
    }

    // 抜粋を取得
    const excerpt =
      properties.Excerpt?.rich_text?.[0]?.plain_text ||
      properties.excerpt?.rich_text?.[0]?.plain_text;

    // 公開状態を取得
    const published = properties.Published?.checkbox ?? true;

    // ページコンテンツを取得してMarkdownに変換（一覧ページではスキップして高速化）
    const content = skipContent ? '' : await getPageContent(page.id);

    return {
      id: page.id,
      title,
      slug,
      category,
      coverImage,
      excerpt,
      content,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
      published,
    };
  } catch (error) {
    console.error('[Notion API] Failed to convert page to post:', error);
    return null;
  }
}

/**
 * ページコンテンツを取得してMarkdownに変換
 */
async function getPageContent(pageId: string): Promise<string> {
  try {
    const url = `${API_BASE}/blocks?pageId=${encodeURIComponent(pageId)}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Notion API] Failed to fetch blocks:', { status: response.status, error });
      return '';
    }

    const data = await response.json();
    const blocks = data.results;

    // 簡易的なMarkdown変換
    const markdown = blocks
      .map((block: any) => blockToMarkdown(block))
      .filter(Boolean)
      .join('\n\n');

    return markdown;
  } catch (error) {
    console.error('[Notion API] Failed to fetch page content:', error);
    return '';
  }
}

/**
 * Notionブロックを Markdown に変換
 */
function blockToMarkdown(block: any): string {
  const type = block.type;
  const content = block[type];

  if (!content) return '';

  switch (type) {
    case 'paragraph':
      return richTextToMarkdown(content.rich_text);

    case 'heading_1':
      return `# ${richTextToMarkdown(content.rich_text)}`;

    case 'heading_2':
      return `## ${richTextToMarkdown(content.rich_text)}`;

    case 'heading_3':
      return `### ${richTextToMarkdown(content.rich_text)}`;

    case 'bulleted_list_item':
      return `- ${richTextToMarkdown(content.rich_text)}`;

    case 'numbered_list_item':
      return `1. ${richTextToMarkdown(content.rich_text)}`;

    case 'code':
      const language = content.language || '';
      const code = richTextToMarkdown(content.rich_text);
      return `\`\`\`${language}\n${code}\n\`\`\``;

    case 'quote':
      return `> ${richTextToMarkdown(content.rich_text)}`;

    case 'divider':
      return '---';

    case 'image':
      const imageUrl = content.type === 'external'
        ? content.external?.url
        : content.file?.url;
      const caption = content.caption?.[0]?.plain_text || '';
      return `![${caption}](${imageUrl})`;

    default:
      return richTextToMarkdown(content.rich_text || []);
  }
}

/**
 * Notion rich text を Markdown に変換
 */
function richTextToMarkdown(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return '';

  return richText
    .map((text) => {
      let content = text.plain_text || '';

      if (text.annotations?.bold) {
        content = `**${content}**`;
      }
      if (text.annotations?.italic) {
        content = `*${content}*`;
      }
      if (text.annotations?.code) {
        content = `\`${content}\``;
      }
      if (text.annotations?.strikethrough) {
        content = `~~${content}~~`;
      }
      if (text.href) {
        content = `[${content}](${text.href})`;
      }

      return content;
    })
    .join('');
}

/**
 * 日付をフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Notionが設定されているかチェック
 */
export function isNotionConfigured(): boolean {
  return Boolean(NOTION_API_KEY && NOTION_DATABASE_ID);
}

/**
 * 開発事例一覧を取得
 */
export async function getCases(category?: string): Promise<NotionCase[]> {
  console.log('[Notion API] getCases called with category:', category);

  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.set('category', category);

    const url = `${API_BASE}/cases?${queryParams.toString()}`;
    console.log('[Notion API] Fetching cases from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Notion API] Request failed:', { status: response.status, error });
      return [];
    }

    const data = await response.json();
    console.log('[Notion API] Found', data.results.length, 'cases in database');

    const cases = data.results.map((page: any) => convertPageToCase(page)).filter((c: NotionCase | null): c is NotionCase => c !== null);

    console.log('[Notion API] Returning', cases.length, 'valid cases');
    return cases;
  } catch (error) {
    console.error('[Notion API] Failed to fetch cases:', error);
    return [];
  }
}

/**
 * 開発事例詳細を取得
 */
export async function getCase(id: string): Promise<NotionCase | null> {
  try {
    console.log('[Notion API] Fetching case with id:', id);

    const url = `${API_BASE}/case?id=${encodeURIComponent(id)}`;
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      console.error('[Notion API] Request failed:', { status: response.status, error });
      return null;
    }

    const page = await response.json();
    const caseData = convertPageToCase(page);

    if (!caseData) return null;

    // ページコンテンツを取得
    const content = await getPageContent(page.id);
    return {
      ...caseData,
      content,
    };
  } catch (error) {
    console.error('[Notion API] Failed to fetch case:', error);
    return null;
  }
}

/**
 * NotionページをNotionCase型に変換
 */
function convertPageToCase(page: any): NotionCase | null {
  try {
    const properties = page.properties;

    // タイトルを取得
    const title =
      properties.Title?.title?.[0]?.plain_text ||
      properties.Name?.title?.[0]?.plain_text ||
      properties['名前']?.title?.[0]?.plain_text ||
      'Untitled';

    // カテゴリを取得
    const category =
      properties.Category?.select?.name ||
      properties.category?.select?.name ||
      '文書管理';

    // 説明を取得
    const description =
      properties.Description?.rich_text?.[0]?.plain_text ||
      properties.description?.rich_text?.[0]?.plain_text ||
      '';

    // 画像URLを取得
    const image =
      properties.Image?.url ||
      properties.image?.url ||
      page.cover?.external?.url ||
      page.cover?.file?.url ||
      '';

    // 規模を取得
    const scale =
      properties.Scale?.select?.name ||
      properties.scale?.select?.name ||
      '標準規模';

    // 開発期間を取得
    const period =
      properties.Period?.rich_text?.[0]?.plain_text ||
      properties.period?.rich_text?.[0]?.plain_text ||
      '';

    // 費用を取得
    const cost =
      properties.Cost?.rich_text?.[0]?.plain_text ||
      properties.cost?.rich_text?.[0]?.plain_text ||
      '';

    // 導入効果を取得（改行区切りまたはカンマ区切り）
    const resultsText =
      properties.Results?.rich_text?.[0]?.plain_text ||
      properties.results?.rich_text?.[0]?.plain_text ||
      '';
    const results = resultsText
      .split(/\n|,/)
      .map((r: string) => r.trim())
      .filter((r: string) => r.length > 0);

    // 公開状態を取得
    const published = properties.Published?.checkbox ?? true;

    // 表示順序を取得
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
    console.error('[Notion API] Failed to convert page to case:', error);
    return null;
  }
}
