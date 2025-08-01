import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CommentSection from '@/components/blog/CommentSection';
import SocialShareButtons from '@/components/blog/SocialShareButtons';
import BlogContent from '@/components/blog/BlogContent';
import { getPostBySlug, getAllPosts } from '@/lib/database';
import { formatDate } from '@/lib/utils';
import { generateBlogPostMetadata, generateStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

export const revalidate = 3600;

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `https://remotework.com/blog/${post.slug}`;
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(post)),
        }}
      />

      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Article Header */}
              <div className="mb-8">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{post.author.name}</div>
                      <div className="text-xs text-gray-500">{post.author.bio}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  {post.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Featured
                    </span>
                  )}
                </div>

                {/* Excerpt */}
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="mb-8">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="mb-12">
                <BlogContent content={post.content} />
              </div>

              {/* Tags */}
              <div className="mb-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="mb-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                  <SocialShareButtons url={shareUrl} title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    <a href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(relatedPost.publishedAt)}</span>
                    <span>{relatedPost.readingTime} min read</span>
                  </div>
                </div>
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