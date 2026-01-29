/**
 * Notion API Integration using fetch (no SDK dependency)
 */

// Types
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  category?: string;
  subCategory?: string;
  tags?: string[];
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

export interface BlogSubCategory {
  slug: string;
  name: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  subCategories?: BlogSubCategory[];
}

// Category mapping with subcategories
export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  'system-dev': {
    slug: 'system-dev',
    name: 'システム開発',
    subCategories: [
      { slug: '見積もり・発注', name: '見積もり・発注' },
      { slug: '開発手法・進め方', name: '開発手法・進め方' },
      { slug: '運用・保守', name: '運用・保守' },
      { slug: 'AI活用', name: 'AI活用' },
    ],
  },
  'management-dx': {
    slug: 'management-dx',
    name: '経営・DX',
    subCategories: [
      { slug: 'IT投資・コスト', name: 'IT投資・コスト' },
      { slug: '業務改善・DX推進', name: '業務改善・DX推進' },
      { slug: '地域ビジネス', name: '地域ビジネス' },
    ],
  },
  'industry': {
    slug: 'industry',
    name: '業界研究',
    subCategories: [
      { slug: 'SIer・ベンダー', name: 'SIer・ベンダー' },
      { slug: '業界構造・商習慣', name: '業界構造・商習慣' },
      { slug: '海外比較', name: '海外比較' },
    ],
  },
  'career': {
    slug: 'career',
    name: 'キャリア',
    subCategories: [
      { slug: '就職・転職', name: '就職・転職' },
      { slug: 'スキル・働き方', name: 'スキル・働き方' },
    ],
  },
  'ceo-column': {
    slug: 'ceo-column',
    name: '社長コラム',
    subCategories: [],
  },
  // Legacy categories for backwards compatibility
  'ceo_column': { slug: 'ceo_column', name: '社長コラム', subCategories: [] },
  'tech-blog': { slug: 'tech-blog', name: '技術ブログ', subCategories: [] },
  'regional-dx': { slug: 'regional-dx', name: '地域DX', subCategories: [] },
};

const NOTION_API_VERSION = '2022-06-28';
const NOTION_API_BASE = 'https://api.notion.com/v1';

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

  // External URL (not S3) - return as is, these don't expire
  if (url.startsWith('http') && !url.includes('amazonaws.com') && !url.includes('s3.')) {
    return url;
  }

  // S3 URL - convert to proxy format with cache parameter
  if (url.startsWith('http')) {
    const encodedUrl = encodeURIComponent(url);
    const idParam = blockId ? `&id=${blockId.replace(/-/g, '')}` : '';
    return `https://www.notion.so/image/${encodedUrl}?table=block${idParam}&cache=v2`;
  }

  return url;
}

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
/**
 * Get all blocks from a page with pagination and nested children
 */
async function getPageBlocks(pageId: string): Promise<any[]> {
  const allBlocks: any[] = [];
  let cursor: string | undefined = undefined;

  // Fetch all blocks with pagination
  do {
    const url = cursor
      ? `/blocks/${pageId}/children?page_size=100&start_cursor=${cursor}`
      : `/blocks/${pageId}/children?page_size=100`;

    const response = await notionFetch(url);
    const blocks = response.results || [];

    // Fetch children for blocks that have them
    for (const block of blocks) {
      if (block.has_children && block.type !== 'child_page' && block.type !== 'child_database') {
        try {
          const children = await getPageBlocks(block.id);
          block.children = children;
        } catch (e) {
          console.warn(`[Notion] Failed to fetch children for block ${block.id}:`, e);
        }
      }
    }

    allBlocks.push(...blocks);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  console.log(`[Notion] Fetched ${allBlocks.length} blocks from page ${pageId}`);
  // Debug: Log block types
  const typeCounts: Record<string, number> = {};
  allBlocks.forEach(b => {
    typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
  });
  console.log(`[Notion] Block types:`, JSON.stringify(typeCounts));
  // Log first 10 blocks for debugging
  allBlocks.slice(0, 10).forEach((b, i) => {
    const text = b[b.type]?.rich_text?.map((t: any) => t.plain_text).join('').substring(0, 40) || '';
    console.log(`[Notion] Block ${i}: [${b.type}] "${text}"`);
  });
  return allBlocks;
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
function blocksToHtml(blocks: any[], headingCounter = { value: 0 }): { html: string; toc: TocItem[] } {
  const htmlParts: string[] = [];
  const toc: TocItem[] = [];
  let currentList: { type: string; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      const tag = currentList.type === 'bulleted_list_item' ? 'ul' : 'ol';
      htmlParts.push(`<${tag}>${currentList.items.map(item => `<li>${item}</li>`).join('')}</${tag}>`);
      currentList = null;
    }
  };

  // Helper to process children
  const processChildren = (block: any): string => {
    if (block.children && block.children.length > 0) {
      const childResult = blocksToHtml(block.children, headingCounter);
      toc.push(...childResult.toc);
      return childResult.html;
    }
    return '';
  };

  for (const block of blocks) {
    const type = block.type;
    const content = block[type];

    // Handle list items with nested children
    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      let itemHtml = richTextToHtml(content?.rich_text);
      // Add nested children if present
      const childrenHtml = processChildren(block);
      if (childrenHtml) {
        itemHtml += childrenHtml;
      }
      if (currentList && currentList.type === type) {
        currentList.items.push(itemHtml);
      } else {
        flushList();
        currentList = { type, items: [itemHtml] };
      }
      continue;
    }

    // Handle paragraph/quote blocks that start with "- " or "・" as list items
    if (type === 'paragraph' || type === 'quote') {
      const plainText = content?.rich_text?.map((t: any) => t.plain_text).join('') || '';
      if (plainText.startsWith('- ') || plainText.startsWith('・') || plainText.startsWith('• ')) {
        // Remove the leading marker and convert to list item
        let itemHtml = richTextToHtml(content?.rich_text);
        // Remove leading "- ", "・", or "• " from the HTML
        itemHtml = itemHtml.replace(/^[-・•]\s*/, '');
        const childrenHtml = processChildren(block);
        if (childrenHtml) {
          itemHtml += childrenHtml;
        }
        if (currentList && currentList.type === 'bulleted_list_item') {
          currentList.items.push(itemHtml);
        } else {
          flushList();
          currentList = { type: 'bulleted_list_item', items: [itemHtml] };
        }
        continue;
      }
    }

    // Flush any pending list before other content
    flushList();

    switch (type) {
      case 'paragraph': {
        const pText = richTextToHtml(content?.rich_text);
        if (pText) htmlParts.push(`<p>${pText}</p>`);
        // Handle paragraph with children (indented content)
        const pChildren = processChildren(block);
        if (pChildren) htmlParts.push(`<div class="indent">${pChildren}</div>`);
        break;
      }

      case 'heading_1':
      case 'heading_2':
      case 'heading_3': {
        const level = parseInt(type.split('_')[1]);
        const plainText = content?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        const headingHtml = richTextToHtml(content?.rich_text);
        const id = `heading-${headingCounter.value++}-${generateSlug(plainText)}`;

        toc.push({ id, text: plainText, level });
        htmlParts.push(`<h${level} id="${id}">${headingHtml}</h${level}>`);
        break;
      }

      case 'quote': {
        let quoteHtml = richTextToHtml(content?.rich_text);
        const quoteChildren = processChildren(block);
        if (quoteChildren) quoteHtml += quoteChildren;
        htmlParts.push(`<blockquote>${quoteHtml}</blockquote>`);
        break;
      }

      case 'code':
        const code = content?.rich_text?.map((t: any) => t.plain_text).join('') || '';
        const lang = content?.language || '';
        htmlParts.push(`<pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
        break;

      case 'divider':
        htmlParts.push('<hr />');
        break;

      case 'callout': {
        const calloutText = richTextToHtml(content?.rich_text);
        const emoji = content?.icon?.emoji || '💡';
        const calloutChildren = processChildren(block);
        htmlParts.push(`<div class="callout"><span class="callout-icon">${emoji}</span><div><p>${calloutText}</p>${calloutChildren}</div></div>`);
        break;
      }

      case 'toggle': {
        const toggleText = richTextToHtml(content?.rich_text);
        const toggleChildren = processChildren(block);
        htmlParts.push(`<details><summary>${toggleText}</summary>${toggleChildren}</details>`);
        break;
      }

      case 'image': {
        let imageUrl = '';
        if (content?.type === 'external') {
          imageUrl = content.external?.url;
        } else if (content?.type === 'file') {
          imageUrl = content.file?.url;
        }
        if (imageUrl) {
          // Convert to persistent proxy URL to avoid expiration
          const persistentUrl = toNotionImageProxy(imageUrl, block.id);
          const caption = content?.caption ? richTextToHtml(content.caption) : '';
          htmlParts.push(`<figure><img src="${persistentUrl}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`);
        }
        break;
      }

      case 'table': {
        // Handle table blocks
        const tableChildren = block.children || [];
        if (tableChildren.length > 0) {
          let tableHtml = '<table>';
          tableChildren.forEach((row: any, rowIndex: number) => {
            if (row.type === 'table_row') {
              const cells = row.table_row?.cells || [];
              const cellTag = rowIndex === 0 && content?.has_column_header ? 'th' : 'td';
              tableHtml += '<tr>';
              cells.forEach((cell: any) => {
                const cellContent = richTextToHtml(cell);
                tableHtml += `<${cellTag}>${cellContent}</${cellTag}>`;
              });
              tableHtml += '</tr>';
            }
          });
          tableHtml += '</table>';
          htmlParts.push(tableHtml);
        }
        break;
      }

      case 'bookmark': {
        const bookmarkUrl = content?.url || '';
        const bookmarkCaption = content?.caption ? richTextToHtml(content.caption) : bookmarkUrl;
        if (bookmarkUrl) {
          htmlParts.push(`<p><a href="${bookmarkUrl}" target="_blank" rel="noopener noreferrer">${bookmarkCaption}</a></p>`);
        }
        break;
      }

      case 'embed':
      case 'video': {
        const embedUrl = content?.url || content?.external?.url || '';
        if (embedUrl) {
          htmlParts.push(`<div class="embed"><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div>`);
        }
        break;
      }

      default:
        // For unknown block types, try to extract text
        if (content?.rich_text) {
          const text = richTextToHtml(content.rich_text);
          if (text) htmlParts.push(`<p>${text}</p>`);
        }
        // Still process children for unknown types
        const defaultChildren = processChildren(block);
        if (defaultChildren) htmlParts.push(defaultChildren);
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
    const category = properties.Category?.select?.name || '';
    const subCategory = properties.SubCategory?.select?.name || properties['サブカテゴリ']?.select?.name || '';
    const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) ||
                 properties['タグ']?.multi_select?.map((tag: any) => tag.name) || [];

    // Get cover image - prioritize official API for external URLs (imgBB, etc.)
    let coverImage: string | undefined;

    // First check official API - external URLs should be used directly
    if (page.cover?.type === 'external') {
      // External URLs (imgBB, etc.) - use directly without proxy
      coverImage = page.cover.external.url;
      console.log(`[Notion] Using external cover URL: ${coverImage}`);
    } else if (page.cover?.type === 'file') {
      // Notion-hosted file - convert to proxy URL
      const rawUrl = page.cover.file.url;
      coverImage = toNotionImageProxy(rawUrl, page.id);
      console.log(`[Notion] Using file cover with proxy: ${coverImage}`);
    }

    // Fallback to notion-client if official API doesn't have cover
    if (!coverImage) {
      try {
        const recordMap = await getPageRecordMap(page.id);
        if (recordMap) {
          const block = recordMap.block?.[page.id]?.value;
          if (block?.format?.page_cover) {
            const pageCover = block.format.page_cover;
            coverImage = toNotionImageProxy(pageCover, page.id);
            console.log(`[Notion] Using recordMap cover: ${coverImage}`);
          }
        }
      } catch (e) {
        console.warn('[Notion] Failed to get cover via notion-client:', e);
      }
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
      subCategory,
      tags,
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

/**
 * Get page recordMap for react-notion-x rendering
 */
export async function getPageRecordMap(pageId: string): Promise<any> {
  try {
    // Use notion-client to get the recordMap
    const { NotionAPI } = await import('notion-client');
    const notion = new NotionAPI();

    // Format pageId (remove dashes if present)
    const formattedId = pageId.replace(/-/g, '');

    const recordMap = await notion.getPage(formattedId);
    console.log(`[Notion] Fetched recordMap for page ${pageId}`);
    return recordMap;
  } catch (error) {
    console.error('[Notion] Failed to fetch recordMap:', error);
    return null;
  }
}
