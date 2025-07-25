import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateSlug } from '@/lib/utils';

// Use service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

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
  
  return errors;
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// GET - Fetch single post for editing
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
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
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update existing post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate input data
    const validationErrors = validatePostData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Check if post exists
    const { data: existingPost } = await supabaseAdmin
      .from('blog_posts')
      .select('id, slug, status')
      .eq('id', id)
      .single();

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate slug if title changed
    const slug = body.slug || generateSlug(body.title);
    
    // Check if new slug conflicts with existing posts (excluding current post)
    if (slug !== existingPost.slug) {
      const { data: conflictingPost } = await supabaseAdmin
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single();

      if (conflictingPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData = {
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      featured_image: body.featured_image || null,
      category: body.category.trim(),
      tags: body.tags || [],
      status: body.status || existingPost.status,
      featured: body.featured || false,
      reading_time: calculateReadingTime(body.content),
      seo_title: body.seo_title || body.title.trim(),
      seo_description: body.seo_description || body.excerpt.trim(),
      seo_keywords: body.seo_keywords || [],
      updated_at: new Date().toISOString()
    };

    // Set published_at if status changed to published
    if (body.status === 'published' && existingPost.status !== 'published') {
      (updateData as any).published_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
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
      console.error('Error updating post:', error);
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in admin post PUT:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if post exists
    const { data: existingPost } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title')
      .eq('id', id)
      .single();

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Post deleted successfully',
      deletedPost: existingPost
    });
  } catch (error) {
    console.error('Error in admin post DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
