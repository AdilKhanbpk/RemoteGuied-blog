import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET - Fetch all authors
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('authors')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching authors:', error);
      return NextResponse.json(
        { error: 'Failed to fetch authors' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in authors GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new author
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Author name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    const authorData = {
      name: body.name.trim(),
      bio: body.bio?.trim() || '',
      avatar: body.avatar || '/images/default-avatar.jpg',
      twitter: body.twitter || null,
      linkedin: body.linkedin || null,
      website: body.website || null
    };

    const { data, error } = await supabaseAdmin
      .from('authors')
      .insert([authorData])
      .select()
      .single();

    if (error) {
      console.error('Error creating author:', error);
      return NextResponse.json(
        { error: 'Failed to create author' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in authors POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
