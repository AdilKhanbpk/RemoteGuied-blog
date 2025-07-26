import React from 'react';
import Link from 'next/link';
import { Clock, User, Calendar, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import JobSidebar from '@/components/blog/JobSidebar';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { getAllPosts, getCategories } from '@/lib/database';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remote Work Blog - Tips, Tools & Insights',
  description: 'Discover the latest insights, tips, and tools for remote work success. Expert advice on productivity, team management, and work-life balance.',
  keywords: ['remote work', 'productivity', 'team management', 'work from home', 'digital nomad'],
  openGraph: {
    title: 'Remote Work Blog - Tips, Tools & Insights',
    description: 'Discover the latest insights, tips, and tools for remote work success.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remote Work Blog - Tips, Tools & Insights',
    description: 'Discover the latest insights, tips, and tools for remote work success.',
  },
};

export const revalidate = 3600;

const BlogPage = async () => {
  try {
    const posts = await getAllPosts();
    const categories = await getCategories();

    return (
      <Layout>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 mb-4">
              Remote Work Blog
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 max-w-2xl mx-auto">
              Discover insights, tips, and tools to excel in the world of remote work.
              From productivity hacks to team management strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">
              <p className="text-gray-600 mb-6">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
              </p>

              {posts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all flex flex-col overflow-hidden"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100">
                        {post.featuredImage ? (
                          <CloudinaryImage
                            src={post.featuredImage}
                            alt={`${post.title} - ${post.category}`}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Briefcase className="h-10 w-10 text-blue-400" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow">
                            {post.category}
                          </span>
                        </div>
                        {post.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white shadow">
                              ⭐ Featured
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-500 flex flex-wrap justify-between items-center border-t pt-3 mt-auto">
                          <div className="flex gap-4 items-center">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {post.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readingTime} min
                          </span>
                        </div>

                        <Button
                          asChild
                          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 px-4 rounded-lg text-sm"
                        >
                          <Link href={`/blog/${post.slug}`}>Read Article</Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="w-full max-w-2xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">


                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    It looks like there are no published articles yet.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-blue-700 text-sm">
                      <strong>Admin:</strong> Go to{' '}
                      <Link href="/admin/login" className="underline">
                        Admin Panel
                      </Link>{' '}
                      to create your first post!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <JobSidebar />
              </div>
            </aside>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);

    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Remote Work Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover insights, tips, and tools to excel in the world of remote work.
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">

            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-red-900 mb-4">
                Database Connection Error
              </h2>
              <p className="text-red-700 mb-6">
                Unable to connect to the database. Please check:
              </p>
              <ul className="text-left space-y-3 text-red-700 text-sm">
                <li>1. ✅ Supabase credentials in .env.local</li>
                <li>2. ✅ Database schema is deployed</li>
                <li>3. ✅ Network connection is working</li>
              </ul>
              <p className="text-sm text-red-600 mt-6">
                Check the console for detailed error information.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default BlogPage;
