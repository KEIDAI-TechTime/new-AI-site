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
  toc?: TocItem[];
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
 * Convert rich text to HTML with formatting
 */
function richTextToHtml(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return '';

  return richText.map((text: any) => {
    let content = text.plain_text || '';

    // Escape HTML
    content = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Apply annotations
    if (text.annotations) {
      if (text.annotations.bold) content = `<strong>${content}</strong>`;
      if (text.annotations.italic) content = `<em>${content}</em>`;
      if (text.annotations.strikethrough) content = `<del>${content}</del>`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.code) content = `<code>${content}</code>`;
    }

    // Handle links
    if (text.href) {
      content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
    }

    return content;
  }).join('');
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Generate slug from text for heading IDs
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Convert blocks to HTML content with formatting preserved
 * Returns both HTML and table of contents
 */
function blocksToHtml(blocks: any[]): { html: string; toc: TocItem[] } {
  const htmlParts: string[] = [];
  const toc: TocItem[] = [];
  let currentList: { type: string; items: string[] } | null = null;
  let headingCounter = 0;

  const flushList = () => {
    if (currentList) {
      const tag = currentList.type === 'bulleted_list_item' ? 'ul' : 'ol';
      htmlParts.push(`<${tag}>${currentList.items.map(item => `<li>${item}</li>`).join('')}</${tag}>`);
      currentList = null;
    }
  };

  for (const block of blocks) {
    const type = block.type;
    const content = block[type];

    // Handle list items
    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const itemHtml = richTextToHtml(content?.rich_text);
      if (currentList && currentList.type === type) {
        currentList.items.push(itemHtml);
      } else {
        flushList();
        currentList = { type, items: [itemHtml] };
      }
      continue;
    }

    // Flush any pending list before other content
    flushList();

    switch (type) {
      case 'paragraph':
        const pText = richTextToHtml(content?.rich_text);
        if (pText) htmlParts.push(`<p>${pText}</p>`);
        break;

      case 'heading_1':
      case 'heading_2':
      case 'heading_3': {
        const level = parseInt(type.split('_')[1]);
        const plainText = content?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        const headingHtml = richTextToHtml(content?.rich_text);
        const id = `heading-${headingCounter++}-${generateSlug(plainText)}`;

        toc.push({ id, text: plainText, level });
        htmlParts.push(`<h${level} id="${id}">${headingHtml}</h${level}>`);
        break;
      }

      case 'quote':
        htmlParts.push(`<blockquote>${richTextToHtml(content?.rich_text)}</blockquote>`);
        break;

      case 'code':
        const code = content?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        const lang = content?.language || '';
        htmlParts.push(`<pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        break;

      case 'divider':
        htmlParts.push('<hr />');
        break;

      case 'callout':
        const calloutText = richTextToHtml(content?.rich_text);
        const emoji = content?.icon?.emoji || '💡';
        htmlParts.push(`<div class="callout"><span class="callout-icon">${emoji}</span><p>${calloutText}</p></div>`);
        break;

      case 'toggle':
        const toggleText = richTextToHtml(content?.rich_text);
        htmlParts.push(`<details><summary>${toggleText}</summary></details>`);
        break;

      case 'image':
        let imageUrl = '';
        if (content?.type === 'external') {
          imageUrl = content.external?.url;
        } else if (content?.type === 'file') {
          imageUrl = content.file?.url;
        }
        if (imageUrl) {
          const caption = content?.caption ? richTextToHtml(content.caption) : '';
          htmlParts.push(`<figure><img src="${imageUrl}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`);
        }
        break;

      default:
        // For unknown block types, try to extract text
        if (content?.rich_text) {
          const text = richTextToHtml(content.rich_text);
          if (text) htmlParts.push(`<p>${text}</p>`);
        }
    }
  }

  // Flush any remaining list
  flushList();

  return { html: htmlParts.join('\n'), toc };
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
    let toc: TocItem[] = [];
    if (includeContent) {
      try {
        const blocks = await getPageBlocks(page.id);
        const result = blocksToHtml(blocks);
        content = result.html;
        toc = result.toc;
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
      toc,
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
