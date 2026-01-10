import type { WordPressPost, WordPressCategory } from '../types/wordpress';

const WORDPRESS_API_URL = 'https://www.techtime-link.com/wp-json/wp/v2';

// カテゴリマッピング
export const BLOG_CATEGORIES = {
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
}): Promise<WordPressPost[]> {
  const { category, perPage = 10, page = 1 } = params || {};

  const queryParams = new URLSearchParams({
    per_page: perPage.toString(),
    page: page.toString(),
    _embed: 'true',
  });

  // カテゴリスラッグからカテゴリIDを取得してフィルター
  if (category) {
    const categories = await getCategories();
    const categoryObj = categories.find(cat => cat.slug === category);
    if (categoryObj) {
      queryParams.append('categories', categoryObj.id.toString());
    }
  }

  const response = await fetch(`${WORDPRESS_API_URL}/posts?${queryParams}`);

  if (!response.ok) {
    console.error('Failed to fetch posts:', response.statusText);
    return [];
  }

  return response.json();
}

/**
 * 記事詳細を取得
 */
export async function getPost(slug: string): Promise<WordPressPost | null> {
  const response = await fetch(
    `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`
  );

  if (!response.ok) {
    console.error('Failed to fetch post:', response.statusText);
    return null;
  }

  const posts = await response.json();
  return posts[0] || null;
}

/**
 * カテゴリ一覧を取得
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`);

  if (!response.ok) {
    console.error('Failed to fetch categories:', response.statusText);
    return [];
  }

  return response.json();
}

/**
 * カテゴリ別の記事数を取得
 */
export async function getCategoryPostCount(categorySlug: string): Promise<number> {
  const posts = await getPosts({ category: categorySlug, perPage: 1 });
  return posts.length;
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
 * HTMLタグを削除してプレーンテキストを取得
 */
export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
}
