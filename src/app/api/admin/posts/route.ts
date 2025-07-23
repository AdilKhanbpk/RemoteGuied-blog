import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateSlug } from '@/lib/utils';

// Use service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Input validation helper
function validatePostData(data: any) {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (!data.excerpt || data.excerpt.trim().length < 10) {
    errors.push('Excerpt must be at least 10 characters long');
  }
  
  if (!data.content || data.content.trim().length < 50) {
    errors.push('Content must be at least 50 characters long');
  }
  
  if (!data.category || data.category.trim().length === 0) {
    errors.push('Category is required');
  }
  
  if (!data.author_id) {
    errors.push('Author ID is required');
  }
  
  return errors;
}

// Calculate reading time (200 words per minute average)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// GET - Fetch all posts for admin (including drafts)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset') || '0';

    let query = supabaseAdmin
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
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (limit) {
      query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching admin posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      posts: data || [],
      total: count || 0
    });
  } catch (error) {
    console.error('Error in admin posts GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validationErrors = validatePostData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.title);
    
    // Check if slug already exists
    const { data: existingPost } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }

    // Validate featured image is from Cloudinary if provided
    if (body.featured_image && !body.featured_image.includes('cloudinary.com')) {
      return NextResponse.json(
        { error: 'Featured image must be uploaded to Cloudinary for SEO optimization' },
        { status: 400 }
      );
    }

    // Prepare post data with Cloudinary URLs
    const postData = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(), // Rich HTML content with Cloudinary image URLs
      featured_image: body.featured_image || null, // Cloudinary URL for SEO
      category: body.category.trim(),
      tags: body.tags || [],
      author_id: body.author_id,
      status: body.status || 'draft',
      featured: body.featured || false,
      reading_time: calculateReadingTime(body.content),
      seo_title: body.seo_title || body.title.trim(),
      seo_description: body.seo_description || body.excerpt.trim(),
      seo_keywords: body.seo_keywords || [],
      published_at: body.status === 'published' ? new Date().toISOString() : null
    };

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([postData])
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
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in admin posts POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
