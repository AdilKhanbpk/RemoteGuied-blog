import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Simple spam detection (in production, use more sophisticated methods)
function isSpam(content: string, email: string): boolean {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'free money'];
  const contentLower = content.toLowerCase();
  
  // Check for spam keywords
  if (spamKeywords.some(keyword => contentLower.includes(keyword))) {
    return true;
  }
  
  // Check for excessive links
  const linkCount = (content.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return true;
  }
  
  // Check for suspicious email patterns
  if (email.includes('temp') || email.includes('fake') || email.includes('spam')) {
    return true;
  }
  
  return false;
}

// GET - Fetch comments for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    // Organize comments into threads (parent comments and replies)
    const comments = data || [];
    const commentMap = new Map();
    const rootComments: {
      id: string;
      post_id: string;
      parent_id?: string;
      author: string;
      email: string;
      content: string;
      created_at: string;
      replies: unknown[];
    }[] = [];

    // First pass: create comment objects
    comments.forEach(comment => {
      commentMap.set(comment.id, {
        ...comment,
        replies: []
      });
    });

    // Second pass: organize into threads
    comments.forEach(comment => {
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(commentMap.get(comment.id));
        }
      } else {
        rootComments.push(commentMap.get(comment.id));
      }
    });

    return NextResponse.json(rootComments);
  } catch (error) {
    console.error('Error in comments GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, author, email, content, parentId } = body;

    // Validate required fields
    if (!postId || !author || !email || !content) {
      return NextResponse.json(
        { error: 'Post ID, author, email, and content are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length < 10 || content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Check for spam
    const spam = isSpam(content, email);
    const status = spam ? 'spam' : 'pending'; // All comments start as pending for moderation

    // Verify post exists
    const { data: post } = await supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('id', postId)
      .eq('status', 'published')
      .single();

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // If replying to a comment, verify parent exists
    if (parentId) {
      const { data: parentComment } = await supabaseAdmin
        .from('comments')
        .select('id')
        .eq('id', parentId)
        .single();

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    // Create comment
    const commentData = {
      post_id: postId,
      author: author.trim(),
      email: email.toLowerCase().trim(),
      content: content.trim(),
      parent_id: parentId || null,
      status,
      ip_address: request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') ||
                  request.headers.get('cf-connecting-ip') ||
                  'unknown'
    };

    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert([commentData])
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...data,
      message: spam 
        ? 'Comment flagged as spam and will be reviewed'
        : 'Comment submitted for moderation'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in comments POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
