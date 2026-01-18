/**
 * Note.com RSS Integration
 * Fetches articles from note.com via RSS feed using rss2json proxy
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

// rss2json API (free tier: 10,000 requests/day)
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

interface Rss2JsonItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure?: {
    link?: string;
    type?: string;
  };
}

interface Rss2JsonResponse {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: Rss2JsonItem[];
}

/**
 * Convert rss2json item to NotePost
 */
function convertToNotePost(item: Rss2JsonItem): NotePost {
  // Extract slug from URL (e.g., https://note.com/techtime_kdm/n/n1234567890ab -> n1234567890ab)
  const slugMatch = item.link.match(/\/n\/([a-zA-Z0-9]+)$/);
  const slug = slugMatch ? `note-${slugMatch[1]}` : `note-${Date.now()}`;

  // Clean HTML tags from description
  const excerpt = item.description
    .replace(/<[^>]*>/g, '')
    .substring(0, 200)
    .trim();

  // Get cover image from thumbnail or enclosure
  const coverImage = item.thumbnail || item.enclosure?.link || undefined;

  return {
    id: slug,
    title: item.title,
    slug,
    category: 'note',
    coverImage,
    excerpt: excerpt || item.title,
    content: excerpt,
    createdAt: new Date(item.pubDate).toISOString(),
    updatedAt: new Date(item.pubDate).toISOString(),
    published: true,
    source: 'note',
    noteUrl: item.link,
  };
}

/**
 * Fetch and parse note RSS feed via rss2json proxy
 */
export async function getNotePosts(limit: number = 10): Promise<NotePost[]> {
  try {
    const apiUrl = `${RSS2JSON_API}?rss_url=${encodeURIComponent(NOTE_RSS_URL)}`;
    console.log('[Note] Fetching RSS via rss2json:', NOTE_RSS_URL);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[Note] rss2json fetch failed:', response.status, response.statusText);
      return [];
    }

    const data: Rss2JsonResponse = await response.json();

    if (data.status !== 'ok') {
      console.error('[Note] rss2json returned error status:', data.status);
      return [];
    }

    const posts = data.items
      .slice(0, limit)
      .map(convertToNotePost);

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
