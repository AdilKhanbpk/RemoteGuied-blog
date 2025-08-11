'use client';

import { Clock, User } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import CloudinaryImage from '@/components/ui/CloudinaryImage';
import { useEffect } from 'react';

// Professional card styles
const cardStyles = `
  .card-professional {
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .card-professional:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    const styleId = 'professional-card-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cardStyles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <article
      className={`card-professional bg-white overflow-hidden cursor-pointer ${featured ? 'featured-post' : ''} ${className}`}
    >
      {/* Image */}
      <div className="relative flex justify-center overflow-hidden">
        <CloudinaryImage
          src={imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
          alt={`${title} - ${category} blog post cover image`}
          width={featured ? 800 : 400}
          height={featured ? 500 : 225}
          className={`object-cover ${featured
            ? 'h-40 sm:h-48 md:h-54 lg:h-60'
            : 'h-32 sm:h-36'
          }`}
          priority={featured}
          sizes={featured
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          }
        />
      </div>

      {/* Content */}
      <div className={`p-4 ${featured ? 'lg:p-5' : ''}`}>
        {/* Category Badge */}
        <div className="mb-3">
          <Badge
            variant="default"
            size="sm"
            className="text-xs"
          >
            {category}
          </Badge>
        </div>

        <h3
          className={`font-semibold text-gray-900 mb-2 leading-snug ${featured
              ? 'text-base sm:text-lg lg:text-xl'
              : 'text-sm sm:text-base'
            }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden'
          }}
        >
          {title}
        </h3>

        <p
          className={`text-gray-600 mb-4 leading-relaxed ${featured
              ? 'text-sm sm:text-base'
              : 'text-sm'
            }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: featured ? 3 : 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden'
          }}
        >
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
          <span className="text-sm text-gray-500 font-medium">{publishDate}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;