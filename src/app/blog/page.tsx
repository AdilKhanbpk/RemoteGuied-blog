import React from 'react';
import Link from 'next/link';
import { Clock, User, Calendar, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
// Card components removed as they're not used
import Button from '@/components/ui/Button';
import JobSidebar from '@/components/blog/JobSidebar';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { getAllPosts, getCategories } from '@/lib/database';
import { formatDate } from '@/lib/utils';
// cn utility and BlogPageClient removed as they're not used
import type { Metadata } from 'next';

// Generate metadata for SEO
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

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

const BlogPage = async () => {
  try {
    // Fetch posts and categories from database
    const posts = await getAllPosts();
    const categories = await getCategories();

    console.log('Loaded posts:', posts.length);
    console.log('Loaded categories:', categories);

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Remote Work Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover insights, tips, and tools to excel in the world of remote work.
              From productivity hacks to team management strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>

              {/* Posts Grid */}
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                      {/* SEO-Optimized Featured Image with Category Badge */}
                      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
                        {post.featuredImage ? (
                          <CloudinaryImage
                            src={post.featuredImage}
                            alt={`${post.title} - ${post.category} blog post thumbnail`}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Briefcase className="h-12 w-12 text-blue-400" />
                          </div>
                        )}
                        {/* Category Badge on Image */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-lg">
                            {post.category}
                          </span>
                        </div>
                        {/* Featured Badge */}
                        {post.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white shadow-lg">
                              ⭐ Featured
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5">

                        <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 mb-3 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="font-medium">{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            Read Article
                          </Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    It looks like there are no published articles yet.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-blue-700 text-sm">
                      <strong>Admin:</strong> Go to <Link href="/admin/login" className="underline">Admin Panel</Link> to create your first post!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <JobSidebar />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);

    // Fallback UI if database connection fails
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Remote Work Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover insights, tips, and tools to excel in the world of remote work.
            </p>
          </div>

          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-red-900 mb-4">
                Database Connection Error
              </h2>
              <p className="text-red-700 mb-6">
                Unable to connect to the database. Please check:
              </p>
              <div className="text-left space-y-3 text-red-700">
                <p>1. ✅ Supabase credentials in .env.local</p>
                <p>2. ✅ Database schema is deployed</p>
                <p>3. ✅ Network connection is working</p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-red-600">
                  Check the console for detailed error information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default BlogPage;
