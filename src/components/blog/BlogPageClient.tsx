'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Calendar, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdvancedSearch from './AdvancedSearch';
import JobSidebar from '@/components/blog/JobSidebar';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types/blog';

interface BlogPageClientProps {
  posts: BlogPost[];
  categories: string[];
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ posts = [], categories = [] }) => {
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(posts);
  const [totalResults, setTotalResults] = useState(posts.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (searchPosts: BlogPost[], total: number) => {
    setDisplayPosts(searchPosts);
    setTotalResults(total);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 mb-4">
          Remote Work Blog
        </h1>
        <p className="text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-3xl mx-auto">
          Discover insights, tips, and tools to excel in the world of remote work. 
          From productivity hacks to team management strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Advanced Search */}
          <div className="mb-8">
            <AdvancedSearch
              onResults={handleSearchResults}
              onLoading={handleLoadingChange}
              categories={categories}
            />
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {isLoading ? 'Searching...' : (
                <>
                  {totalResults} {totalResults === 1 ? 'article' : 'articles'} found
                </>
              )}
            </p>
          </div>

          {/* Posts Grid */}
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post) => (
                <Card key={post.id} className="h-full flex flex-col">
                  <CardHeader>
                    {/* Featured Image Placeholder */}
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <Briefcase className="h-12 w-12 text-primary" />
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="w-full space-y-3">
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Button asChild className="w-full">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
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
  );
};

export default BlogPageClient;
