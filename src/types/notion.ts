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

/**
 * Notion Case Study
 */
export interface NotionCase {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  scale: string;
  period: string;
  cost: string;
  results: string[];
  published: boolean;
  order: number;
}

/**
 * Case Study Category
 */
export interface CaseCategory {
  id: string;
  name: string;
}
