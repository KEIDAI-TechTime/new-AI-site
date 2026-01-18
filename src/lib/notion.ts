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
  source?: 'notion' | 'note';
  externalUrl?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
}

// Category mapping
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  ceo_column: { slug: 'ceo_column', name: '社長コラム' },
  'tech-blog': { slug: 'tech-blog', name: '技術ブログ' },
  note: { slug: 'note', name: 'note' },
};

// Get environment variables
const NOTION_API_KEY = import.meta.env.NOTION_API_KEY || process.env.NOTION_API_KEY || '';
const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID || process.env.NOTION_DATABASE_ID || '';

/**
 * Check if Notion is configured
 */
function isNotionConfigured(): boolean {
  return Boolean(NOTION_API_KEY && NOTION_DATABASE_ID);
}

/**
 * Create Notion client (lazy initialization)
 */
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

/**
 * Get blog posts from Notion
 */
export async function getPosts(params?: {
  category?: string;
  perPage?: number;
}): Promise<NotionPost[]> {
  if (!isNotionConfigured()) {
    console.warn('[Notion] Not configured (missing API key or database ID)');
    return [];
  }

  const notion = getNotionClient();
  if (!notion) {
    console.warn('[Notion] Client not available');
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
  if (!isNotionConfigured()) {
    return null;
  }

  const notion = getNotionClient();
  if (!notion) {
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
  if (!isNotionConfigured()) {
    console.warn('[Notion] Not configured, returning empty slugs');
    return [];
  }

  const notion = getNotionClient();
  if (!notion) {
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
    let content = '';
    const n2m = getN2MClient();
    if (n2m) {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      content = n2m.toMarkdownString(mdBlocks).parent;
    }

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
