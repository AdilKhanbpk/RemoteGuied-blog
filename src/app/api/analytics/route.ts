import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST - Track analytics events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, value, id, url, timestamp, category, action, label } = body;

    // Get client information
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || '';
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               request.headers.get('cf-connecting-ip') ||
               'unknown';

    // Store analytics data in database
    const analyticsData = {
      event_name: name || action,
      event_category: category || 'Web Vitals',
      event_label: label || id,
      event_value: value,
      page_url: url,
      referrer: referer,
      user_agent: userAgent,
      ip_address: ip,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      session_id: id || `${ip}-${Date.now()}` // Simple session tracking
    };

    // Only store in database if we have Supabase configured
    if (supabaseUrl && supabaseServiceKey) {
      try {
        await supabaseAdmin
          .from('analytics_events')
          .insert([analyticsData]);
      } catch (dbError) {
        console.error('Database analytics error:', dbError);
        // Continue even if database fails
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

// GET - Retrieve analytics data (admin only)
export async function GET(request: NextRequest) {
  try {
    // Simple admin check (in production, use proper authentication)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const eventType = searchParams.get('event');

    let query = supabaseAdmin
      .from('analytics_events')
      .select('*')
      .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: false });

    if (eventType) {
      query = query.eq('event_name', eventType);
    }

    const { data, error } = await query.limit(1000);

    if (error) {
      console.error('Error fetching analytics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Process data for insights
    const insights = {
      totalEvents: data?.length || 0,
      uniquePages: [...new Set(data?.map(d => d.page_url) || [])].length,
      topPages: getTopPages(data || []),
      eventsByType: getEventsByType(data || []),
      dailyStats: getDailyStats(data || [], days)
    };

    return NextResponse.json(insights);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions for analytics insights
function getTopPages(data: {
  event_name?: string;
  event_category?: string;
  page_url?: string;
}[]) {
  const pageViews: Record<string, number> = {};

  data.forEach(event => {
    if ((event.event_name === 'view_blog_post' || event.event_category === 'Blog') && event.page_url) {
      pageViews[event.page_url] = (pageViews[event.page_url] || 0) + 1;
    }
  });

  return Object.entries(pageViews)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([url, views]) => ({ url, views }));
}

function getEventsByType(data: { event_name?: string }[]) {
  const eventTypes: Record<string, number> = {};

  data.forEach(event => {
    if (event.event_name) {
      eventTypes[event.event_name] = (eventTypes[event.event_name] || 0) + 1;
    }
  });

  return Object.entries(eventTypes)
    .sort(([,a], [,b]) => Number(b) - Number(a))
    .map(([name, count]) => ({ name, count: Number(count) }));
}

function getDailyStats(data: {
  created_at?: string;
  timestamp?: string;
  page_url?: string;
}[], days: number) {
  const dailyStats: { [key: string]: { date: string; events: number; uniquePages: Set<string> } } = {};
  
  // Initialize all days
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    dailyStats[dateStr] = { date: dateStr, events: 0, uniquePages: new Set() };
  }

  // Count events per day
  data.forEach(event => {
    const timestamp = event.timestamp || event.created_at;
    if (timestamp) {
      const dateStr = new Date(timestamp).toISOString().split('T')[0];
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].events++;
        if (event.page_url) {
          dailyStats[dateStr].uniquePages.add(event.page_url);
        }
      }
    }
  });

  // Convert sets to counts
  return Object.values(dailyStats).map((day: {
    date: string;
    events: number;
    uniquePages: Set<string>;
  }) => ({
    date: day.date,
    events: day.events,
    uniquePages: day.uniquePages.size
  })).reverse();
}
