import React from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import JobSidebar from '@/components/blog/JobSidebar';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/database';
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

    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center mb-16">
            {/* <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 mb-4">
              Remote Work Blog
            </h1> */}
            {/* <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 max-w-2xl mx-auto">
              Discover insights, tips, and tools to excel in the world of remote work.
              From productivity hacks to team management strategies.
            </p> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">
              {/* <p className="text-gray-600 mb-6">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
              </p> */}

              {posts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <BlogCard
                        title={post.title}
                        excerpt={post.excerpt}
                        author={post.author.name}
                        publishDate={formatDate(post.publishedAt)}
                        readTime={`${post.readingTime} min read`}
                        category={post.category}
                        imageUrl={post.featuredImage}
                        featured={false}
                        className="h-full hover:shadow-xl hover:shadow-blue-100/50 hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-100/60 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm"
                      />
                    </Link>
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

            {/* <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <JobSidebar />
              </div>
            </aside> */}
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
