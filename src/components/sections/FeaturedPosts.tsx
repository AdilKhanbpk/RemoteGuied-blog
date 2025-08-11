'use client';

import BlogCard from '@/components/blog/BlogCard';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { getFeaturedPosts } from '@/lib/database';
import type { BlogPost } from '@/lib/database';

// Enhanced blog grid styles with uniform sizing and professional typography
const blogGridStyles = `
  .blog-grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .blog-grid {
      gap: 1.5rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .blog-grid {
      gap: 1.75rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1280px) {
    .blog-grid {
      gap: 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Remove featured post special sizing - all cards are uniform now */
  .blog-grid .featured-post {
    grid-column: auto;
    grid-row: auto;
  }

  .professional-spacing > * + * {
    margin-top: 0.75rem;
  }

  @media (min-width: 768px) {
    .professional-spacing > * + * {
      margin-top: 1rem;
    }
  }

  /* Professional fade-in animation */
  .fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-in-up:nth-child(1) { animation-delay: 0.1s; }
  .fade-in-up:nth-child(2) { animation-delay: 0.2s; }
  .fade-in-up:nth-child(3) { animation-delay: 0.3s; }
  .fade-in-up:nth-child(4) { animation-delay: 0.4s; }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inject styles on component mount
  useEffect(() => {
    const styleId = 'professional-blog-grid-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = blogGridStyles;
      document.head.appendChild(style);
    }
  }, []);

  // Fetch featured posts from database
  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await getFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (err) {
        console.error('Error loading featured posts:', err);
        setError('Failed to load featured posts');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-4 sm:py-3 lg:py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 professional-spacing">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Featured Content
          </div>
          <h2 className="font-semibold text-content-primary text-xl sm:text-2xl lg:text-3xl mb-4 tracking-tight">
            Latest Insights & Articles
          </h2>
          <p className="text-content-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Stay ahead with our carefully curated collection of remote work insights, expert strategies, 
            and actionable advice to help you excel in your professional journey.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid mb-12 sm:mb-16 lg:mb-20">
          {loading ? (
            // Loading skeleton
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                  <div className="p-6 bg-white rounded-b-xl border border-gray-100">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold">Unable to load featured posts</p>
                <p className="text-sm text-gray-600 mt-2">{error}</p>
              </div>
            </div>
          ) : featuredPosts.length === 0 ? (
            // No posts state
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-lg font-semibold">No featured posts available</p>
                <p className="text-sm text-gray-600 mt-2">Check back later for new content!</p>
              </div>
            </div>
          ) : (
            // Posts grid
            featuredPosts.map((post, index) => (
              <div key={post.id} className="fade-in-up">
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
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-lg shadow-blue-100/20">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready for more insights?
              </h3>
              <p className="text-sm text-gray-600">
                Discover our complete collection of expert articles and guides.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-sm font-semibold bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 border-2 rounded-xl shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Explore All Articles
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;