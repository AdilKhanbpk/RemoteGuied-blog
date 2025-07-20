-- RemoteWork Blog Database Schema
-- Optimized for SEO and Performance

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar TEXT,
  twitter VARCHAR(255),
  linkedin VARCHAR(255),
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table with SEO optimization
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  reading_time INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  -- SEO fields
  seo_title VARCHAR(60), -- Optimal for Google
  seo_description VARCHAR(160), -- Optimal for Google
  seo_keywords TEXT[],
  
  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Full-text search
  search_vector tsvector
);

-- Categories table for better organization
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6', -- Hex color
  icon VARCHAR(50), -- Icon name
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table for better SEO
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post tags junction table
CREATE TABLE post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam', 'rejected')),
  ip_address VARCHAR(45), -- Support both IPv4 and IPv6
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job listings table
CREATE TABLE job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  job_type VARCHAR(50) CHECK (job_type IN ('Full-time', 'Part-time', 'Contract', 'Freelance')),
  remote BOOLEAN DEFAULT TRUE,
  url TEXT NOT NULL,
  description TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'filled')),
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = TRUE;
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN(search_vector);

CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_parent ON comments(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX idx_comments_email ON comments(email); -- For spam detection

CREATE INDEX idx_job_listings_status ON job_listings(status);
CREATE INDEX idx_job_listings_posted_at ON job_listings(posted_at DESC);
CREATE INDEX idx_job_listings_remote ON job_listings(remote) WHERE remote = TRUE;

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.excerpt, '') || ' ' || 
    COALESCE(NEW.content, '') || ' ' ||
    COALESCE(array_to_string(NEW.tags, ' '), '')
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for search vector
CREATE TRIGGER update_blog_posts_search_vector 
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  -- Average reading speed: 200 words per minute
  NEW.reading_time := CEIL(array_length(string_to_array(NEW.content, ' '), 1) / 200.0);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for reading time
CREATE TRIGGER calculate_blog_posts_reading_time 
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION calculate_reading_time();

-- Row Level Security (RLS) policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts (allow public read for published posts)
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- RLS Policies for comments (allow public read for approved comments)
CREATE POLICY "Public can view approved comments" ON comments
  FOR SELECT USING (status = 'approved');

-- Allow public to insert comments (they'll be pending by default)
CREATE POLICY "Public can insert comments" ON comments
  FOR INSERT WITH CHECK (status = 'pending');

-- Sample data
INSERT INTO authors (name, bio, avatar, twitter, linkedin, website) VALUES
('Alex Johnson', 'Remote work consultant and productivity expert with 8+ years of experience helping teams transition to distributed work environments.', '/images/author-avatar.jpg', 'https://twitter.com/alexjohnson', 'https://linkedin.com/in/alexjohnson', 'https://alexjohnson.dev');

INSERT INTO categories (name, slug, description, color, icon) VALUES
('Productivity', 'productivity', 'Tips and strategies to boost your remote work productivity', '#10b981', 'zap'),
('Team Management', 'team-management', 'Leading and managing distributed teams effectively', '#3b82f6', 'users'),
('Tools & Software', 'tools-software', 'Reviews and guides for remote work tools', '#8b5cf6', 'settings'),
('Work-Life Balance', 'work-life-balance', 'Maintaining healthy boundaries while working remotely', '#f59e0b', 'heart'),
('Career Development', 'career-development', 'Growing your career in the remote work landscape', '#ef4444', 'briefcase');

-- Analytics and performance tracking tables
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

-- Post views tracking
CREATE TABLE post_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add view_count column to blog_posts if not exists
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Indexes for analytics
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_category ON analytics_events(event_category);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp DESC);
CREATE INDEX idx_analytics_page_url ON analytics_events(page_url);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);

CREATE INDEX idx_post_views_post ON post_views(post_id);
CREATE INDEX idx_post_views_ip ON post_views(ip_address);
CREATE INDEX idx_post_views_created ON post_views(created_at DESC);

-- RLS policies for analytics (allow public insert, admin read)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert post views" ON post_views
  FOR INSERT WITH CHECK (true);

-- Storage bucket policies (run these in Supabase Storage section)
-- CREATE BUCKET IF NOT EXISTS 'images';
--
-- CREATE POLICY "Public can view images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'images');
--
-- CREATE POLICY "Authenticated users can upload images" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'images');
