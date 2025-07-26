'use client';

import { Users, Zap, Settings, Heart, Briefcase, Target } from 'lucide-react';
import { useEffect } from 'react';

// Enhanced grid styles for professional appearance
const gridStyles = `
  .responsive-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .responsive-grid {
      gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .responsive-grid {
      gap: 2.5rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .responsive-grid h3 {
    font-size: 1.125rem !important;
    font-weight: 600 !important;
    line-height: 1.5 !important;
  }

  @media (min-width: 640px) {
    .responsive-grid h3 {
      font-size: 1.25rem !important;
    }
  }

  .responsive-grid p {
    font-size: 0.875rem !important;
    line-height: 1.6 !important;
    margin-bottom: 1rem !important;
  }

  @media (min-width: 640px) {
    .responsive-grid p {
      font-size: 0.9375rem !important;
    }
  }

  .space-y-responsive > * + * {
    margin-top: 1.25rem;
  }

  @media (min-width: 768px) {
    .space-y-responsive > * + * {
      margin-top: 2rem;
    }
  }

  .category-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .category-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .category-card:hover::before {
    opacity: 1;
  }

  .category-card:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .icon-container {
    position: relative;
    z-index: 2;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }


 

  .article-count {
    background: rgba(59, 130, 246, 0.1);
    color: rgb(59, 130, 246);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .progress-indicator {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%);
    border-radius: 50px;
    transition: all 0.3s ease;
  }

  .category-card:hover .progress-indicator {
    background: linear-gradient(90deg, rgb(59, 130, 246) 0%, rgba(59, 130, 246, 0.8) 100%);
  }
`;

const CategoriesSection = () => {
  useEffect(() => {
    const styleId = 'professional-categories-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = gridStyles;
      document.head.appendChild(style);
    }
  }, []);

  const categories = [
    {
      name: "Team Management",
      description: "Build and lead high-performing remote teams with proven strategies and best practices",
      icon: Users,
      postCount: 45,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Productivity",
      description: "Maximize your efficiency and achieve more with time-tested productivity techniques",
      icon: Zap,
      postCount: 62,
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Tools & Tech",
      description: "Discover essential software and hardware solutions for seamless remote work",
      icon: Settings,
      postCount: 38,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      name: "Work-Life Balance",
      description: "Master the art of maintaining wellness and healthy boundaries in remote work",
      icon: Heart,
      postCount: 34,
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      name: "Career Growth",
      description: "Accelerate your professional development and unlock new opportunities remotely",
      icon: Briefcase,
      postCount: 28,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600"
    },
    {
      name: "Goal Setting",
      description: "Define and achieve ambitious professional goals with strategic planning",
      icon: Target,
      postCount: 19,
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600"
    },
  ];

  return (
    <section className="py-5 sm:py-3 lg:py-5 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-8 lg:mb-9 space-y-responsive">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-600">Featured Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight">
            Explore by Category
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dive deep into specialized areas of remote work expertise with our comprehensive, 
            expertly curated content categories designed for modern professionals.
          </p>
        </div>

        <div className="responsive-grid">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="category-card p-2 sm:p-2 lg:p-3 cursor-pointer group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative z-10 bg-white rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`icon-container p-3 sm:p-3.5 rounded-xl ${category.color} bg-gradient-to-br ${category.gradient} shadow-lg`}>
                      <IconComponent className="h-2 w-2 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="article-count">
                      {category.postCount} articles
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 font-medium">
                        Explore content
                      </span>
                      <div className="progress-indicator w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <svg 
                          className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          {/* <button className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-white/20 hover:border-blue-200 px-8 py-4 rounded-full font-medium text-slate-700 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span>View All Categories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;