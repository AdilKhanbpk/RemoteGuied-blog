'use client';

import BlogCard from '@/components/blog/BlogCard';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';

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

  const featuredPosts = [
    {
      id: 1,
      title: "The Complete Guide to Remote Team Management",
      excerpt: "Learn proven strategies for managing distributed teams, maintaining culture, and ensuring productivity across time zones. Discover tools and techniques that leading remote companies use to build successful remote-first organizations.",
      author: "Sarah Chen",
      publishDate: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Team Management",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Essential Productivity Tools for Remote Workers",
      excerpt: "Discover carefully selected apps and tools that can transform your remote work experience and significantly boost your daily productivity.",
      author: "Mark Johnson",
      publishDate: "Dec 12, 2024",
      readTime: "5 min read",
      category: "Tools & Technology",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Mastering Work-Life Balance in Remote Environments",
      excerpt: "Practical strategies and actionable tips for maintaining healthy boundaries when your home becomes your primary workspace.",
      author: "Emma Davis",
      publishDate: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Work-Life Balance",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Asynchronous Communication Excellence",
      excerpt: "Master the art of async communication to improve team collaboration, reduce meeting fatigue, and increase overall productivity.",
      author: "Alex Rodriguez",
      publishDate: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Communication",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    },
  ];

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
        <div className="blog-grid  mb-12 sm:mb-16 lg:mb-20">
          {featuredPosts.map((post) => (
            <div key={post.id} className="fade-in-up">
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                publishDate={post.publishDate}
                readTime={post.readTime}
                category={post.category}
                imageUrl={post.imageUrl}
                featured={false}
                className="h-full hover:shadow-xl hover:shadow-blue-100/50 hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-100/60 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm"
              />
            </div>
          ))}
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