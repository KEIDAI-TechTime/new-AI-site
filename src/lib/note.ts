/**
 * Note.com RSS Integration
 * Fetches articles from note.com via RSS feed
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
 * Parse RSS XML to extract post data
 */
function parseRSSItem(itemXml: string): NotePost | null {
  try {
    // Extract title
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').trim() : '';

    // Extract link
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const noteUrl = linkMatch ? linkMatch[1].trim() : '';

    // Extract slug from URL (e.g., https://note.com/techtime_kdm/n/n1234567890ab -> n1234567890ab)
    const slugMatch = noteUrl.match(/\/n\/([a-zA-Z0-9]+)$/);
    const slug = slugMatch ? `note-${slugMatch[1]}` : `note-${Date.now()}`;

    // Extract description/excerpt
    const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/s);
    let excerpt = descMatch ? (descMatch[1] || descMatch[2] || '').trim() : '';
    // Clean HTML tags from excerpt
    excerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, 200);

    // Extract pubDate
    const dateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
    const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString();
    const createdAt = new Date(pubDate).toISOString();

    // Extract media/enclosure for cover image
    const mediaMatch = itemXml.match(/<media:thumbnail[^>]*url="([^"]+)"|<enclosure[^>]*url="([^"]+)"[^>]*type="image/);
    const coverImage = mediaMatch ? (mediaMatch[1] || mediaMatch[2]) : undefined;

    // Alternative: try to extract og:image from content
    let finalCoverImage = coverImage;
    if (!finalCoverImage) {
      const imgMatch = itemXml.match(/<img[^>]*src="([^"]+)"/);
      finalCoverImage = imgMatch ? imgMatch[1] : undefined;
    }

    if (!title || !noteUrl) {
      return null;
    }

    return {
      id: slug,
      title,
      slug,
      category: 'note',
      coverImage: finalCoverImage,
      excerpt: excerpt || title,
      content: excerpt, // RSS only provides excerpt
      createdAt,
      updatedAt: createdAt,
      published: true,
      source: 'note',
      noteUrl,
    };
  } catch (error) {
    console.error('[Note] Failed to parse RSS item:', error);
    return null;
  }
}

/**
 * Fetch and parse note RSS feed
 */
export async function getNotePosts(limit: number = 10): Promise<NotePost[]> {
  try {
    console.log('[Note] Fetching RSS from:', NOTE_RSS_URL);

    const response = await fetch(NOTE_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TechTime/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      console.error('[Note] RSS fetch failed:', response.status, response.statusText);
      return [];
    }

    const xml = await response.text();

    // Extract all <item> elements
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g);
    if (!itemMatches) {
      console.warn('[Note] No items found in RSS feed');
      return [];
    }

    const posts: NotePost[] = [];
    for (const itemXml of itemMatches.slice(0, limit)) {
      const post = parseRSSItem(itemXml);
      if (post) {
        posts.push(post);
      }
    }

    console.log(`[Note] Fetched ${posts.length} posts from note`);
    return posts;
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
