import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CommentSection from '@/components/blog/CommentSection';
import JobSidebar from '@/components/blog/JobSidebar';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import StreamingWrapper from '@/components/performance/StreamingWrapper';
// ViewTracker temporarily removed - will add analytics differently
import { getPostBySlug, getAllPosts } from '@/lib/database';
import { formatDate } from '@/lib/utils';
import { generateBlogPostMetadata, generateStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for popular posts (PPR optimization)
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();

    // Pre-generate the most popular/recent posts for instant loading
    const popularPosts = posts
      .sort((a, b) => {
        // Sort by view count first, then by date
        const viewDiff = (b.view_count || 0) - (a.view_count || 0);
        if (viewDiff !== 0) return viewDiff;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      .slice(0, 100); // Pre-generate top 100 posts for instant loading

    return popularPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return generateBlogPostMetadata(post);
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `https://remotework.com/blog/${post.slug}`;

  // Get related posts (same category, excluding current post)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(post)),
        }}
      />

      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="max-w-4xl mx-auto">
                {/* Title - Smaller Professional Size */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-sm">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-sm">{post.readingTime} min read</span>
                  </div>
                  {post.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <p className="text-base text-gray-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* SEO-Optimized Featured Image with Category Badge */}
                {post.featuredImage ? (
                  <div className="mb-8">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <CloudinaryImage
                        src={post.featuredImage}
                        alt={`${post.title} - ${post.category} article cover image`}
                        width={800}
                        height={400}
                        className="w-full h-64 md:h-80 object-cover"
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                      />
                      {/* Category Badge on Image */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl mb-8 flex items-center justify-center">
                    <Briefcase className="h-16 w-16 text-blue-600" />
                    {/* Category Badge on Placeholder */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

            {/* Author Info and Social Share */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                  <p className="text-gray-600 text-sm">{post.author.bio}</p>
                </div>
              </div>
              
              {/* Social Share Buttons */}
              <SocialShareButtons url={shareUrl} title={post.title} />
            </div>

            {/* Article Content */}
            <div className="prose prose-base max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed text-base">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 text-base">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 text-base">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-base">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700 text-base">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm text-blue-600 font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto my-4 text-sm">
                      {children}
                    </pre>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <JobSidebar />
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card key={relatedPost.id}>
                    <CardContent>
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      <CommentSection postId={post.id} />
    </Layout>
  );
};

export default BlogPostPage;

// Enable ISR (Incremental Static Regeneration) for fresh content
// This ensures static pages are updated with new content periodically
export const revalidate = 3600; // Revalidate every hour

// Note: PPR removed - using stable Next.js 15 optimizations instead
