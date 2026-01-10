import type { NotionPost, BlogCategory } from '../types/notion';

// APIエンドポイント（本番ではVercel Functions、開発では直接API呼び出し）
const API_BASE = '/api/notion';

// デバッグ用ログ
console.log('[Notion API] Using API proxy:', API_BASE);

// カテゴリマッピング
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  ceo_column: { slug: 'ceo_column', name: '社長コラム' },
  'tech-blog': { slug: 'tech-blog', name: '技術ブログ' },
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

    const posts = await Promise.all(
      data.results.map(async (page: any) => {
        return await convertPageToPost(page);
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
async function convertPageToPost(page: any): Promise<NotionPost | null> {
  try {
    const properties = page.properties;

    // タイトルを取得
    const title =
      properties.Title?.title?.[0]?.plain_text ||
      properties.Name?.title?.[0]?.plain_text ||
      'Untitled';

    // スラッグを取得
    const slug =
      properties.Slug?.rich_text?.[0]?.plain_text ||
      properties.slug?.rich_text?.[0]?.plain_text ||
      page.id;

    // カテゴリを取得
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

    // ページコンテンツを取得してMarkdownに変換
    const content = await getPageContent(page.id);

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
