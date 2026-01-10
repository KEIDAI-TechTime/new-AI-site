import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { NotionPost, BlogCategory } from '../types/notion';

// Notion設定
const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY || '';
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID || '';

// デバッグ用ログ（本番環境での問題診断用）
console.log('[Notion] Configuration check:', {
  hasApiKey: Boolean(NOTION_API_KEY),
  apiKeyPrefix: NOTION_API_KEY ? NOTION_API_KEY.substring(0, 10) + '...' : 'none',
  hasDatabaseId: Boolean(NOTION_DATABASE_ID),
  databaseIdPrefix: NOTION_DATABASE_ID ? NOTION_DATABASE_ID.substring(0, 8) + '...' : 'none',
});

// NotionクライアントとMarkdownコンバーター（遅延初期化）
let notionClient: Client | null = null;
let n2mInstance: NotionToMarkdown | null = null;

/**
 * Notionクライアントを取得（遅延初期化）
 */
function getNotionClient(): Client | null {
  if (!NOTION_API_KEY) {
    console.warn('[Notion] API key not found - Notion integration disabled');
    return null;
  }

  if (!notionClient) {
    console.log('[Notion] Initializing Notion client...');
    notionClient = new Client({ auth: NOTION_API_KEY });
    console.log('[Notion] Client initialized successfully');
  }

  return notionClient;
}

/**
 * Notion to Markdownコンバーターを取得（遅延初期化）
 */
function getN2M(): NotionToMarkdown | null {
  const client = getNotionClient();
  if (!client) return null;

  if (!n2mInstance) {
    console.log('[Notion] Initializing Notion to Markdown converter...');
    n2mInstance = new NotionToMarkdown({ notionClient: client });
  }

  return n2mInstance;
}

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
  console.log('[Notion] getPosts called with params:', params);

  const notion = getNotionClient();

  if (!notion || !NOTION_DATABASE_ID) {
    console.warn('[Notion] Cannot fetch posts - missing configuration', {
      hasNotion: Boolean(notion),
      hasDatabaseId: Boolean(NOTION_DATABASE_ID),
    });
    return [];
  }

  const { category, perPage = 10 } = params || {};

  try {
    console.log('[Notion] Querying database...', { category, perPage });
    console.log('[Notion] notion client type:', typeof notion);
    console.log('[Notion] notion.databases:', notion.databases);
    // Notionデータベースにクエリ
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          ...(category
            ? [
                {
                  property: 'Category',
                  select: {
                    equals: category,
                  },
                },
              ]
            : []),
        ],
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
      page_size: perPage,
    });

    // レスポンスを変換
    console.log('[Notion] Found', response.results.length, 'pages in database');
    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        return await convertPageToPost(page);
      })
    );

    const validPosts = posts.filter((post): post is NotionPost => post !== null);
    console.log('[Notion] Returning', validPosts.length, 'valid posts');
    return validPosts;
  } catch (error) {
    console.error('[Notion] Failed to fetch posts:', error);
    if (error instanceof Error) {
      console.error('[Notion] Error details:', {
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
  const notion = getNotionClient();

  if (!notion || !NOTION_DATABASE_ID) {
    console.warn('Notion API key or Database ID not configured');
    return null;
  }

  try {
    // スラッグで記事を検索
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    return await convertPageToPost(page);
  } catch (error) {
    console.error('Failed to fetch post from Notion:', error);
    return null;
  }
}

/**
 * NotionページをNotionPost型に変換
 */
async function convertPageToPost(page: any): Promise<NotionPost | null> {
  const n2m = getN2M();
  if (!n2m) return null;

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

    // ページコンテンツをMarkdownに変換
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const content = n2m.toMarkdownString(mdBlocks).parent;

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
    console.error('Failed to convert Notion page to post:', error);
    return null;
  }
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
