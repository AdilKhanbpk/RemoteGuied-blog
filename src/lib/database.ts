import { createClient } from '@supabase/supabase-js';
import { BlogPost, Author, JobListing } from '@/types/blog';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database schema types
export interface DatabaseBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  author_id: string;
  published_at: string;
  updated_at: string;
  reading_time: number;
  featured: boolean;
  status: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface DatabaseAuthor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  created_at: string;
}

// Blog post queries with SEO optimization
export async function getAllPosts(limit?: number): Promise<BlogPost[]> {
  const query = supabase
    .from('blog_posts')
    .select(`
      *,
      authors (
        id,
        name,
        bio,
        avatar,
        twitter,
        linkedin,
        website
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (limit) {
    query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data?.map(transformDatabasePost) || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      authors (
        id,
        name,
        bio,
        avatar,
        twitter,
        linkedin,
        website
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return transformDatabasePost(data);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      authors (
        id,
        name,
        bio,
        avatar,
        twitter,
        linkedin,
        website
      )
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return data?.map(transformDatabasePost) || [];
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      authors (
        id,
        name,
        bio,
        avatar,
        twitter,
        linkedin,
        website
      )
    `)
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return data?.map(transformDatabasePost) || [];
}

export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = [...new Set(data?.map(post => post.category) || [])];
  return categories.sort();
}

// Transform database post to application format
function transformDatabasePost(dbPost: any): BlogPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    slug: dbPost.slug,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    featuredImage: dbPost.featured_image,
    category: dbPost.category,
    tags: dbPost.tags || [],
    author: {
      name: dbPost.authors.name,
      bio: dbPost.authors.bio,
      avatar: dbPost.authors.avatar,
      social: {
        twitter: dbPost.authors.twitter,
        linkedin: dbPost.authors.linkedin,
        website: dbPost.authors.website,
      },
    },
    publishedAt: dbPost.published_at,
    readingTime: dbPost.reading_time,
    featured: dbPost.featured,
  };
}

// Cache management for better performance
export async function getPostsWithCache(cacheKey: string, fetcher: () => Promise<BlogPost[]>): Promise<BlogPost[]> {
  // In production, you might want to use Redis or similar
  // For now, we'll rely on Next.js caching
  return fetcher();
}

// SEO-optimized sitemap data
export async function getSitemapData() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching sitemap data:', error);
    return [];
  }

  return data || [];
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching categories:', error);
    return ['All', 'Productivity', 'Team Management', 'Tools & Software', 'Work-Life Balance', 'Career Development'];
  }

  // Extract unique categories and add 'All' at the beginning
  const uniqueCategories = [...new Set(data?.map(post => post.category) || [])];
  return ['All', ...uniqueCategories.sort()];
}
