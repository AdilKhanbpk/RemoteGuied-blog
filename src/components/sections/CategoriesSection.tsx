'use client';

import { Users, Zap, Settings, Heart, Briefcase, Target } from 'lucide-react';
import { useEffect } from 'react';

// Grid styles moved from globals.css
const gridStyles = `
  .responsive-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .responsive-grid {
      gap: 1.5rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .responsive-grid {
      gap: 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .responsive-grid h3 {
    font-size: 1.2rem !important;
  }

  @media (min-width: 640px) {
    .responsive-grid h3 {
      font-size: 1rem !important;
    }
  }

  .responsive-grid p {
    font-size: 0.75rem !important;
    color: hsl(var(--content-caption)) !important;
    line-height: 1.4 !important;
  }

  @media (min-width: 640px) {
    .responsive-grid p {
      font-size: 0.875rem !important;
    }
  }

  .space-y-responsive > * + * {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    .space-y-responsive > * + * {
      margin-top: 1.5rem;
    }
  }
`;

const CategoriesSection = () => {
  // Inject styles on first render
  useEffect(() => {
    const styleId = 'categories-grid-styles';
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
      description: "Build and lead high-performing remote teams",
      icon: Users,
      postCount: 45,
      color: "bg-blue-500",
    },
    {
      name: "Productivity",
      description: "Boost your efficiency and get more done",
      icon: Zap,
      postCount: 62,
      color: "bg-yellow-500",
    },
    {
      name: "Tools & Tech",
      description: "Essential software and hardware for remote work",
      icon: Settings,
      postCount: 38,
      color: "bg-purple-500",
    },
    {
      name: "Work-Life Balance",
      description: "Maintain wellness and boundaries while working remotely",
      icon: Heart,
      postCount: 34,
      color: "bg-pink-500",
    },
    {
      name: "Career Growth",
      description: "Advance your remote career and skills",
      icon: Briefcase,
      postCount: 28,
      color: "bg-green-500",
    },
    {
      name: "Goal Setting",
      description: "Set and achieve meaningful professional goals",
      icon: Target,
      postCount: 19,
      color: "bg-red-500",
    },
  ];

  return (
    <section className="section-padding bg-background-alt">
      <div className="container-content">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-responsive">
          <h2 className="font-bold text-content-primary">
            Explore by Category
          </h2>
          <p className="lead max-w-2xl mx-auto">
            Dive deep into specific areas of remote work expertise with our organized content categories.
          </p>
        </div>

        <div className="responsive-grid">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="group card-elevated bg-card p-4 sm:p-5 lg:p-6 cursor-pointer animate-fade-in-up hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`p-2.5 sm:p-3 rounded-lg ${category.color} flex-shrink-0`}>
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-content-primary mb-2 group-hover:text-primary transition-colors duration-300 !text-sm sm:!text-base">
                      {category.name}
                    </h3>
                    <p className="text-content-caption !text-xs sm:!text-sm mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-content-caption text-xs sm:text-sm">
                        {category.postCount} articles
                      </span>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary group-hover:bg-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
