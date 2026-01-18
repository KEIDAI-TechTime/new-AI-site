/**
 * Notion API Integration using fetch (no SDK dependency)
 */

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

const NOTION_API_VERSION = '2022-06-28';
const NOTION_API_BASE = 'https://api.notion.com/v1';

/**
 * Get environment variables
 */
function getEnvVars() {
  // @ts-ignore
  const apiKey = import.meta.env?.NOTION_API_KEY || process.env?.NOTION_API_KEY || '';
  // @ts-ignore
  const databaseId = import.meta.env?.NOTION_DATABASE_ID || process.env?.NOTION_DATABASE_ID || '';
  return { apiKey, databaseId };
}

/**
 * Check if Notion is configured
 */
function isNotionConfigured(): boolean {
  const { apiKey, databaseId } = getEnvVars();
  return Boolean(apiKey && databaseId);
}

/**
 * Make a request to Notion API
 */
async function notionFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const { apiKey } = getEnvVars();

  const response = await fetch(`${NOTION_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Notion-Version': NOTION_API_VERSION,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Query Notion database
 */
async function queryDatabase(databaseId: string, filter?: any, sorts?: any[], pageSize = 10): Promise<any> {
  const body: any = { page_size: pageSize };
  if (filter) body.filter = filter;
  if (sorts) body.sorts = sorts;

  return notionFetch(`/databases/${databaseId}/query`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Get page blocks (for content)
 */
async function getPageBlocks(pageId: string): Promise<any[]> {
  const response = await notionFetch(`/blocks/${pageId}/children?page_size=100`);
  return response.results || [];
}

/**
 * Convert blocks to simple text content
 */
function blocksToText(blocks: any[]): string {
  return blocks
    .map((block: any) => {
      const type = block.type;
      const content = block[type];

      if (content?.rich_text) {
        return content.rich_text.map((t: any) => t.plain_text).join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
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

  const { category, perPage = 10 } = params || {};
  const { databaseId } = getEnvVars();

  try {
    console.log('[Notion] Fetching posts from database...');

    const filter: any = {
      and: [
        { property: 'Published', checkbox: { equals: true } },
      ],
    };

    if (category) {
      filter.and.push({ property: 'Category', select: { equals: category } });
    }

    const response = await queryDatabase(
      databaseId,
      filter,
      [{ property: 'Created', direction: 'descending' }],
      perPage
    );

    console.log(`[Notion] Found ${response.results?.length || 0} posts`);

    const posts = await Promise.all(
      (response.results || []).map(async (page: any) => convertPageToPost(page))
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

  const { databaseId } = getEnvVars();

  try {
    const response = await queryDatabase(databaseId, {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    });

    if (!response.results?.length) {
      return null;
    }

    return await convertPageToPost(response.results[0], true);
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

  const { databaseId } = getEnvVars();

  try {
    const response = await queryDatabase(
      databaseId,
      { property: 'Published', checkbox: { equals: true } },
      undefined,
      100
    );

    return (response.results || [])
      .map((page: any) => {
        return page.properties.Slug?.rich_text?.[0]?.plain_text || page.id;
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
async function convertPageToPost(page: any, includeContent = false): Promise<NotionPost | null> {
  try {
    const properties = page.properties;

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

    let content = '';
    if (includeContent) {
      try {
        const blocks = await getPageBlocks(page.id);
        content = blocksToText(blocks);
      } catch (e) {
        console.warn('[Notion] Failed to fetch page content:', e);
      }
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
