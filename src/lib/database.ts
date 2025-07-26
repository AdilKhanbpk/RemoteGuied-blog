import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

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
function transformDatabasePost(dbPost: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
  updated_at: string;
  reading_time: number;
  featured: boolean;
  view_count: number;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  authors: {
    name: string;
    bio: string;
    avatar: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}): BlogPost {
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
    seoTitle: dbPost.seo_title || dbPost.title,
    seoDescription: dbPost.seo_description || dbPost.excerpt,
    seoKeywords: dbPost.seo_keywords || [],
    seoImage: dbPost.featured_image,
    seoCanonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://remotework.blog'}/blog/${dbPost.slug}`,
    seoRobots: 'index,follow',
    seoStructuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": dbPost.title,
      "description": dbPost.excerpt,
      "image": dbPost.featured_image,
      "author": {
        "@type": "Person",
        "name": dbPost.authors.name
      },
      "datePublished": dbPost.published_at,
      "dateModified": dbPost.updated_at
    }),
    seoTwitterCard: 'summary_large_image',
    seoOpenGraph: JSON.stringify({
      title: dbPost.title,
      description: dbPost.excerpt,
      image: dbPost.featured_image,
      type: 'article'
    }),
    seoSchemaOrg: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": dbPost.title,
      "description": dbPost.excerpt
    }),
    seoGoogleNews: '',
    seoBing: '',
    seoPinterest: '',
    seoLinkedin: '',
    seoDuckDuckGo: '',
    seoYandex: '',
    seoBaidu: '',
    seoYahoo: '',
    seoTumblr: '',
    seoInstagram: '',
    seoFacebook: '',
    seoReddit: '',
    seoVk: '',
    seoOk: '',
    seoQwant: '',
    seoAsk: '',
    seoAol: '',
    seoBlekko: '',
    seoDogpile: '',
    seoMojeek: '',
    seoSogou: '',
    seoNaver: '',
    seoQihoo: '',
    seo360: '',
    seoSo: '',
    seoHaosou: '',
    seoSoso: '',
    seoYoudao: '',
    seoYidao: '',
    seoZhongsou: '',
    seoHao123: '',
    seoSohu: '',
    seoSina: '',
    seoMSN: '',
    seoYahooJP: '',
    seoRakuten: '',
    seoExcite: '',
    seoLycos: '',
    seoAltaVista: '',
    seoInfoSpace: '',
    seoLycosUK: '',
    seoAllTheWeb: '',
    seoWiseNut: '',
    seoWebcrawler: '',
    view_count: dbPost.view_count || 0,
    created_at: dbPost.created_at,
    updated_at: dbPost.updated_at,
  };
}

// Cache management for better performance
export async function getPostsWithCache(_cacheKey: string, fetcher: () => Promise<BlogPost[]>): Promise<BlogPost[]> {
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
