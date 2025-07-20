import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPostsByCategory } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const featured = searchParams.get('featured');

    let posts;

    if (category) {
      posts = await getPostsByCategory(category);
    } else {
      posts = await getAllPosts(limit ? parseInt(limit) : undefined);
    }

    // Filter for featured posts if requested
    if (featured === 'true') {
      posts = posts.filter(post => post.featured);
    }

    // Set cache headers for better performance
    const response = NextResponse.json(posts);
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
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
