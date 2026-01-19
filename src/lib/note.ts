/**
 * Note.com RSS Integration
 * Fetches articles from note.com via direct RSS parsing
 */

export interface NotePost {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  source: 'note';
  noteUrl: string;
}

// Note account configuration
const NOTE_USER_ID = 'techtime_kdm';
const NOTE_RSS_URL = `https://note.com/${NOTE_USER_ID}/rss`;

/**
 * Parse XML text to extract value between tags
 */
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? (match[1] || match[2] || '').trim() : '';
}

/**
 * Parse media:thumbnail tag
 */
function extractThumbnail(xml: string): string {
  const match = xml.match(/<media:thumbnail[^>]*url="([^"]+)"/i);
  return match ? match[1] : '';
}

/**
 * Convert RSS item XML to NotePost
 */
function parseRssItem(itemXml: string): NotePost | null {
  try {
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description');
    const pubDate = extractTag(itemXml, 'pubDate');
    const thumbnail = extractThumbnail(itemXml);

    if (!title || !link) return null;

    // Extract slug from URL
    const slugMatch = link.match(/\/n\/([a-zA-Z0-9]+)$/);
    const slug = slugMatch ? `note-${slugMatch[1]}` : `note-${Date.now()}`;

    // Clean HTML tags from description
    const excerpt = description
      .replace(/<[^>]*>/g, '')
      .substring(0, 200)
      .trim();

    return {
      id: slug,
      title,
      slug,
      category: 'note',
      coverImage: thumbnail || undefined,
      excerpt: excerpt || title,
      content: excerpt,
      createdAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      updatedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      published: true,
      source: 'note',
      noteUrl: link,
    };
  } catch (e) {
    console.error('[Note] Failed to parse RSS item:', e);
    return null;
  }
}

/**
 * Fetch and parse note RSS feed directly
 */
export async function getNotePosts(limit: number = 10): Promise<NotePost[]> {
  try {
    console.log('[Note] Fetching RSS directly:', NOTE_RSS_URL);

    const response = await fetch(NOTE_RSS_URL, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'Mozilla/5.0 (compatible; TechTime/1.0)',
      },
    });

    if (!response.ok) {
      console.error('[Note] RSS fetch failed:', response.status, response.statusText);
      return [];
    }

    const xml = await response.text();
    console.log('[Note] RSS response length:', xml.length);

    // Extract all <item> elements
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    const items: NotePost[] = [];
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
      const post = parseRssItem(match[1]);
      if (post) {
        items.push(post);
      }
    }

    console.log(`[Note] Fetched ${items.length} posts from note`);
    return items;
  } catch (error) {
    console.error('[Note] Failed to fetch RSS:', error);
    return [];
  }
}

/**
 * Get a single note post by slug
 */
export async function getNotePost(slug: string): Promise<NotePost | null> {
  const posts = await getNotePosts(25);
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get all note post slugs for static generation
 */
export async function getAllNotePostSlugs(): Promise<string[]> {
  const posts = await getNotePosts(25);
  return posts.map(post => post.slug);
}
