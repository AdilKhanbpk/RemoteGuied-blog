import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CommentSection from '@/components/blog/CommentSection';
import JobSidebar from '@/components/blog/JobSidebar';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import { getPostBySlug, getAllPosts } from '@/lib/database';
import { formatDate } from '@/lib/utils';
import { generateBlogPostMetadata, generateStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO - Database version
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

// Generate static params for all blog posts - Database version
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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(post)),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="bg-background-subtle py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-content-caption">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-content-primary">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 max-w-4xl">
              {/* Category and Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-content-primary mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="relative w-12 h-12">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-content-caption" />
                    <span className="font-medium text-content-primary">
                      {post.author.name}
                    </span>
                  </div>
                  <p className="text-sm text-content-caption">
                    {post.author.bio}
                  </p>
                </div>
              </div>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-8 relative aspect-video">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="rounded-lg shadow-lg object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-content">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <SocialShareButtons
                  url={shareUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>

              {/* Back to Blog */}
              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/blog" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <JobSidebar />
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-background-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-content-primary mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-content-primary mb-3">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
        </section>
      )}

      {/* Comments Section */}
      <CommentSection postId={post.id} />
    </Layout>
  );
};

export default BlogPostPage;
