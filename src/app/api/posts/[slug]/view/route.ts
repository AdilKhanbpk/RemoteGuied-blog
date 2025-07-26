import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// POST - Track blog post view
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    
    // Get client information
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               request.headers.get('cf-connecting-ip') ||
               'unknown';

    // Get post information
    const { data: post } = await supabaseAdmin
      .from('blog_posts')
      .select('id, title, category')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if this is a unique view (same IP within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const { data: recentView } = await supabaseAdmin
      .from('post_views')
      .select('id')
      .eq('post_id', post.id)
      .eq('ip_address', ip)
      .gte('created_at', oneHourAgo.toISOString())
      .single();

    // Only count as new view if no recent view from same IP
    if (!recentView) {
      // Record the view
      await supabaseAdmin
        .from('post_views')
        .insert([{
          post_id: post.id,
          ip_address: ip,
          user_agent: userAgent,
          referrer: referer,
          created_at: new Date().toISOString()
        }]);

      // Update post view count
      await supabaseAdmin.rpc('increment_view_count', {
        post_id: post.id
      });
    }

    // Always track analytics event (for engagement metrics)
    const analyticsData = {
      event_name: 'view_blog_post',
      event_category: 'Blog',
      event_label: `${post.category}:${slug}`,
      event_value: 1,
      page_url: `/blog/${slug}`,
      referrer: referer,
      user_agent: userAgent,
      ip_address: ip,
      timestamp: new Date(),
      session_id: `${ip}-${Date.now()}`
    };

    // Store analytics event
    try {
      await supabaseAdmin
        .from('analytics_events')
        .insert([analyticsData]);
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError);
      // Don't fail the request if analytics fails
    }

    return NextResponse.json({ 
      success: true, 
      isNewView: !recentView,
      postTitle: post.title 
    });

  } catch (error) {
    console.error('View tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}
