import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { NotionPost, BlogCategory } from '../types/notion';

// Notion設定
const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY || '';
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID || '';

// NotionクライアントとMarkdownコンバーターの初期化
let notion: Client | null = null;
let n2m: NotionToMarkdown | null = null;

if (NOTION_API_KEY) {
  notion = new Client({ auth: NOTION_API_KEY });
  n2m = new NotionToMarkdown({ notionClient: notion });
}

// カテゴリマッピング
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  column: { slug: 'column', name: 'コラム' },
  presidents_column: { slug: 'presidents_column', name: '社長コラム' },
  tech_blog: { slug: 'tech-blog', name: '技術ブログ' },
  dx_report: { slug: 'dx_report', name: 'DXレポート' },
} as const;

/**
 * ブログ記事一覧を取得
 */
export async function getPosts(params?: {
  category?: string;
  perPage?: number;
  page?: number;
}): Promise<NotionPost[]> {
  if (!notion || !NOTION_DATABASE_ID) {
    console.warn('Notion API key or Database ID not configured');
    return [];
  }

  const { category, perPage = 10 } = params || {};

  try {
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
    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        return await convertPageToPost(page);
      })
    );

    return posts.filter((post): post is NotionPost => post !== null);
  } catch (error) {
    console.error('Failed to fetch posts from Notion:', error);
    return [];
  }
}

/**
 * 記事詳細を取得
 */
export async function getPost(slug: string): Promise<NotionPost | null> {
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
      'column';

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
