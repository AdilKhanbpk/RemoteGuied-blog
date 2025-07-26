'use client';

import { Clock, User, ArrowRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { useEffect } from 'react';

// Card styles moved from globals.css
const cardStyles = `
  .card-elevated {
    border-radius: 0.75rem;
    border: 1px solid;
    background: linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(220 14% 98%) 100%);
    border-color: hsl(var(--border));
    box-shadow: 0 4px 20px -2px hsl(221 83% 53% / 0.08);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-elevated:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px hsl(220 13% 91% / 0.1), 0 10px 10px -5px hsl(220 13% 91% / 0.04);
  }

  .focus-ring {
    outline: none;
    ring: 2px solid;
    ring-offset: 2px;
    ring-color: hsl(var(--ring));
  }

  @media (max-width: 767px) {
    .focus-ring {
      ring-width: 3px;
      ring-offset-width: 3px;
    }
  }
`;

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
  className?: string;
}

const BlogCard = ({
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  category,
  imageUrl,
  featured = false,
  className = '',
}: BlogCardProps) => {
  // Inject styles on first render
  useEffect(() => {
    const styleId = 'card-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cardStyles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <article
      className={`group card-elevated bg-card p-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${featured ? 'featured-post' : ''
        } ${className}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured
          ? 'h-48 sm:h-56 md:h-64 lg:h-80'
          : 'h-40 sm:h-48'
        }`}>
        <CloudinaryImage
          src={imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
          alt={`${title} - ${category} blog post cover image`}
          width={featured ? 800 : 400}
          height={featured ? 500 : 225}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority={featured}
          sizes={featured
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Badge
          variant="default"
          className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xs sm:text-sm"
        >
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-5 ${featured ? 'lg:p-6 xl:p-8' : 'lg:p-6'}`}>
        <h4
          className={`font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2 sm:mb-3 leading-tight ${featured
              ? 'text-sm sm:text-[15px] lg:text-[16px]'
              : 'text-xs sm:text-sm lg:text-base'
            }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden'
          }}
        >
          {title}
        </h4>


        <p
          className={`text-content-body mb-3 sm:mb-4 leading-relaxed ${featured
              ? 'text-xs sm:text-sm lg:text-base'
              : 'text-[11px] sm:text-xs'
            }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: featured ? 4 : 3,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden'
          }}
        >
          {excerpt}
        </p>



        {/* Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-content-caption text-xs">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-24 sm:max-w-none">{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{readTime}</span>
            </div>
          </div>
          <span className="text-xs">{publishDate}</span>
        </div>

        {/* Read More CTA */}
        <div className="flex items-center text-primary font-medium mt-3 sm:mt-4 group-hover:gap-2 transition-all duration-300 text-sm">
          <span>Read Article</span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;