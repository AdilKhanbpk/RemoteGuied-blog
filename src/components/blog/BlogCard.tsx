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
      <div className={`relative overflow-hidden ${featured
          ? 'h-48 sm:h-56 md:h-64 lg:h-72'
          : 'h-40 sm:h-44'
        }`}>
        <CloudinaryImage
          src={imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
          alt={`${title} - ${category} blog post cover image`}
          width={featured ? 800 : 400}
          height={featured ? 500 : 225}
          className="w-full h-full object-cover"
          priority={featured}
          sizes={featured
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          }
        />
        <Badge
          variant="default"
          className="absolute top-4 left-4 text-xs font-medium bg-white text-gray-800 border border-gray-200"
        >
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className={`p-5 ${featured ? 'lg:p-6' : ''}`}>
        <h3
          className={`font-semibold text-gray-900 mb-3 leading-snug ${featured
              ? 'text-lg sm:text-xl lg:text-2xl'
              : 'text-base sm:text-lg'
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