import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
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

      {/* Modern Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),transparent)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-tr from-white/5 to-transparent shadow-xl shadow-indigo-600/10 ring-1 ring-inset ring-white/10"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-5">
          {/* Back Button */}
          <div className="mb-3">
            {/* <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button> */}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className='flex flex-row gap-3'>
              <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              {/* Category Badge */}
              <div className="mb-5">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

            </div>

            {/* Title with Modern Typography */}
            <h1 className="text-2xl sm:text-2xl lg:text-3xl font-black text-white mb-5 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Excerpt */}
            <div className="mb-6">
              <p className="text-xl text-gray-100 leading-relaxed font-medium max-w-3xl">
                {post.excerpt}
              </p>
            </div>

            {/* Author & Meta Information */}
            <div className="flex flex-wrap items-center gap-8 text-gray-300 mb-12">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25"></div>
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">{post.author.name}</div>
                  <div className="text-sm text-gray-400">Remote Work Consultant</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                {post.featured && (
                  <span className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image with Modern Treatment */}
      {post.featuredImage && (
        <div className="relative -mt-8 mb-16 flex justify-center w-full item-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-center w-full">
              <div className=" -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
              <img
                src={post.featuredImage}
                alt={post.title}
                className="relative w-[100%]  h-64 sm:h-80 lg:h-[32rem] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="mb-16">
              <BlogContent content={post.content} />
            </div>

            {/* Tags with Modern Styling */}
            <div className="mb-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Topics</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="group relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md"
                  >
                    <span className="relative z-10">#{tag}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                  </span>
                ))}
              </div>
            </div>

            {/* Social Share with Modern Design */}
            <div className="mb-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Share this article</h3>
                    <p className="text-gray-600">Help others discover this content</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-gray-400" />
                    <SocialShareButtons url={shareUrl} title={post.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts with Modern Cards */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Continue Reading</h2>
              <p className="text-lg text-gray-600">Explore more articles in this category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                  <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {relatedPost.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`} className="stretched-link">
                          {relatedPost.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <span className="font-medium">{formatDate(relatedPost.publishedAt)}</span>
                        <span className="bg-gray-50 px-2 py-1 rounded-md">{relatedPost.readingTime} min</span>
                      </div>
                    </div>
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