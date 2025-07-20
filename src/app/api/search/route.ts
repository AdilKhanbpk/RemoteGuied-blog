import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!query && !category && !tags) {
      return NextResponse.json(
        { error: 'At least one search parameter is required' },
        { status: 400 }
      );
    }

    let searchQuery = supabase
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
      .eq('status', 'published');

    // Full-text search using PostgreSQL's built-in search
    if (query) {
      searchQuery = searchQuery.textSearch('search_vector', query, {
        type: 'websearch',
        config: 'english'
      });
    }

    // Filter by category
    if (category && category !== 'All') {
      searchQuery = searchQuery.eq('category', category);
    }

    // Filter by tags (contains any of the specified tags)
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      searchQuery = searchQuery.overlaps('tags', tagArray);
    }

    // Apply pagination and ordering
    searchQuery = searchQuery
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await searchQuery;

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      );
    }

    // Transform database posts to match BlogPost interface
    const transformedPosts = data?.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featured_image || '',
      category: post.category,
      tags: post.tags || [],
      author: {
        name: post.authors.name,
        bio: post.authors.bio,
        avatar: post.authors.avatar,
        social: {
          twitter: post.authors.twitter,
          linkedin: post.authors.linkedin,
          website: post.authors.website
        }
      },
      publishedAt: post.published_at,
      readingTime: post.reading_time,
      featured: post.featured
    })) || [];

    // Set cache headers for better performance
    const response = NextResponse.json({
      posts: transformedPosts,
      total: count || 0,
      limit,
      offset,
      hasMore: (count || 0) > offset + limit
    });
    
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS for external requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
