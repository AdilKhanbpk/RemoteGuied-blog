-- Migration Script: Add Analytics Tables and Missing Columns
-- Run this ONLY if you get errors about missing analytics tables

-- Check if analytics_events table exists, create if not
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'analytics_events') THEN
        CREATE TABLE analytics_events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          event_name VARCHAR(100) NOT NULL,
          event_category VARCHAR(50) NOT NULL,
          event_label VARCHAR(255),
          event_value INTEGER,
          page_url TEXT NOT NULL,
          referrer TEXT,
          user_agent TEXT,
          ip_address VARCHAR(45),
          session_id VARCHAR(100),
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add indexes
        CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
        CREATE INDEX idx_analytics_category ON analytics_events(event_category);
        CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp DESC);
        CREATE INDEX idx_analytics_page_url ON analytics_events(page_url);
        CREATE INDEX idx_analytics_session ON analytics_events(session_id);
        
        -- Enable RLS
        ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
        
        -- Add policy
        CREATE POLICY "Public can insert analytics events" ON analytics_events
          FOR INSERT WITH CHECK (true);
          
        RAISE NOTICE 'Created analytics_events table';
    ELSE
        RAISE NOTICE 'analytics_events table already exists';
    END IF;
END $$;

-- Check if post_views table exists, create if not
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'post_views') THEN
        CREATE TABLE post_views (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
          ip_address VARCHAR(45) NOT NULL,
          user_agent TEXT,
          referrer TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add indexes
        CREATE INDEX idx_post_views_post ON post_views(post_id);
        CREATE INDEX idx_post_views_ip ON post_views(ip_address);
        CREATE INDEX idx_post_views_created ON post_views(created_at DESC);
        
        -- Enable RLS
        ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;
        
        -- Add policy
        CREATE POLICY "Public can insert post views" ON post_views
          FOR INSERT WITH CHECK (true);
          
        RAISE NOTICE 'Created post_views table';
    ELSE
        RAISE NOTICE 'post_views table already exists';
    END IF;
END $$;

-- Add view_count column to blog_posts if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'blog_posts' AND column_name = 'view_count'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN view_count INTEGER DEFAULT 0;
        RAISE NOTICE 'Added view_count column to blog_posts';
    ELSE
        RAISE NOTICE 'view_count column already exists in blog_posts';
    END IF;
END $$;

-- Add categories table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'categories') THEN
        CREATE TABLE categories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) UNIQUE NOT NULL,
          slug VARCHAR(100) UNIQUE NOT NULL,
          description TEXT,
          color VARCHAR(7) DEFAULT '#3b82f6',
          icon VARCHAR(50),
          post_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Insert sample categories
        INSERT INTO categories (name, slug, description, color, icon) VALUES
        ('Remote Work', 'remote-work', 'Tips and strategies for remote work', '#3b82f6', 'home'),
        ('Productivity', 'productivity', 'Boost your productivity while working remotely', '#10b981', 'zap'),
        ('Technology', 'technology', 'Tools and tech for remote workers', '#8b5cf6', 'settings'),
        ('Career', 'career', 'Career development in remote work', '#ef4444', 'briefcase'),
        ('Lifestyle', 'lifestyle', 'Work-life balance and lifestyle tips', '#f59e0b', 'heart');
        
        RAISE NOTICE 'Created categories table with sample data';
    ELSE
        RAISE NOTICE 'categories table already exists';
    END IF;
END $$;

-- Add tags table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tags') THEN
        CREATE TABLE tags (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) UNIQUE NOT NULL,
          slug VARCHAR(100) UNIQUE NOT NULL,
          post_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        RAISE NOTICE 'Created tags table';
    ELSE
        RAISE NOTICE 'tags table already exists';
    END IF;
END $$;

-- Verify all tables exist
DO $$
DECLARE
    missing_tables TEXT[] := '{}';
    tbl_name TEXT;
    required_tables TEXT[] := ARRAY['authors', 'blog_posts', 'categories', 'tags', 'comments', 'analytics_events', 'post_views'];
BEGIN
    FOREACH tbl_name IN ARRAY required_tables
    LOOP
        IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = tbl_name) THEN
            missing_tables := array_append(missing_tables, tbl_name);
        END IF;
    END LOOP;

    IF array_length(missing_tables, 1) > 0 THEN
        RAISE NOTICE 'Missing tables: %', array_to_string(missing_tables, ', ');
    ELSE
        RAISE NOTICE 'All required tables exist! ✅';
    END IF;
END $$;
