import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Types
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  category?: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface BlogCategory {
  slug: string;
  name: string;
}

// Category mapping
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  ceo_column: { slug: 'ceo_column', name: '社長コラム' },
  'tech-blog': { slug: 'tech-blog', name: '技術ブログ' },
};

// Initialize Notion client (server-side only)
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY || process.env.NOTION_API_KEY || '',
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID || '';

/**
 * Get blog posts from Notion
 */
export async function getPosts(params?: {
  category?: string;
  perPage?: number;
}): Promise<NotionPost[]> {
  if (!NOTION_DATABASE_ID) {
    console.warn('[Notion] Database ID not configured');
    return [];
  }

  const { category, perPage = 10 } = params || {};

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          { property: 'Published', checkbox: { equals: true } },
          ...(category ? [{ property: 'Category', select: { equals: category } }] : []),
        ],
      },
      sorts: [{ property: 'Created', direction: 'descending' }],
      page_size: perPage,
    });

    const posts = await Promise.all(
      response.results.map(async (page: any) => convertPageToPost(page))
    );

    return posts.filter((post): post is NotionPost => post !== null);
  } catch (error) {
    console.error('[Notion] Failed to fetch posts:', error);
    return [];
  }
}

/**
 * Get single post by slug
 */
export async function getPost(slug: string): Promise<NotionPost | null> {
  if (!NOTION_DATABASE_ID) {
    return null;
  }

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    return await convertPageToPost(response.results[0]);
  } catch (error) {
    console.error('[Notion] Failed to fetch post:', error);
    return null;
  }
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!NOTION_DATABASE_ID) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: { property: 'Published', checkbox: { equals: true } },
    });

    return response.results
      .map((page: any) => {
        const slug = page.properties.Slug?.rich_text?.[0]?.plain_text || page.id;
        return slug;
      })
      .filter(Boolean);
  } catch (error) {
    console.error('[Notion] Failed to fetch slugs:', error);
    return [];
  }
}

/**
 * Convert Notion page to post object
 */
async function convertPageToPost(page: any): Promise<NotionPost | null> {
  try {
    const properties = page.properties;

    // Support both English and Japanese property names
    const title =
      properties.Title?.title?.[0]?.plain_text ||
      properties.Name?.title?.[0]?.plain_text ||
      properties['名前']?.title?.[0]?.plain_text ||
      'Untitled';
    const slug = properties.Slug?.rich_text?.[0]?.plain_text || page.id;
    const category = properties.Category?.select?.name || 'ceo_column';

    let coverImage: string | undefined;
    if (page.cover?.type === 'external') {
      coverImage = page.cover.external.url;
    } else if (page.cover?.type === 'file') {
      coverImage = page.cover.file.url;
    }

    const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text;
    const published = properties.Published?.checkbox ?? true;

    // Convert page content to Markdown
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
    console.error('[Notion] Failed to convert page:', error);
    return null;
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
