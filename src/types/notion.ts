/**
 * Notion Database Page Properties
 */
export interface NotionPageProperties {
  id: string;
  created_time: string;
  last_edited_time: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  coverImage?: string;
  excerpt?: string;
}

/**
 * Notion Blog Post
 */
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  excerpt?: string;
  content: string; // Markdown content
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

/**
 * Blog Categories
 */
export interface BlogCategory {
  slug: string;
  name: string;
}
