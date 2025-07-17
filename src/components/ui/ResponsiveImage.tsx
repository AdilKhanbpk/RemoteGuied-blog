'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

// Image styles moved from globals.css
const imageStyles = `
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .responsive-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-image {
    width: 100%;
    max-width: 1920px;
    height: auto;
    object-fit: cover;
  }

  .content-image {
    width: 100%;
    max-width: 1200px;
    height: auto;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .logo {
    width: auto;
    height: 2rem;
  }

  @media (min-width: 768px) {
    .logo {
      height: 2.5rem;
    }
  }
`;

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  variant?: 'hero' | 'content' | 'logo' | 'thumbnail';
}

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  variant = 'content',
}: ResponsiveImageProps) => {
  // Inject styles on first render
  useEffect(() => {
    const styleId = 'image-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = imageStyles;
      document.head.appendChild(style);
    }
  }, []);
  // Default sizes based on variant
  const getDefaultSizes = (variant: string) => {
    switch (variant) {
      case 'hero':
        return '(max-width: 320px) 320px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px';
      case 'content':
        return '(max-width: 320px) 320px, (max-width: 768px) 768px, (max-width: 1024px) 800px, 1200px';
      case 'logo':
        return '(max-width: 768px) 160px, 250px';
      case 'thumbnail':
        return '(max-width: 320px) 150px, (max-width: 768px) 200px, 300px';
      default:
        return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }
  };

  // Get responsive class based on variant
  const getVariantClass = (variant: string) => {
    switch (variant) {
      case 'hero':
        return 'hero-image';
      case 'content':
        return 'content-image';
      case 'logo':
        return 'logo';
      case 'thumbnail':
        return 'responsive-image rounded-lg';
      default:
        return 'responsive-image';
    }
  };

  const finalSizes = sizes || getDefaultSizes(variant);
  const variantClass = getVariantClass(variant);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(variantClass, className)}
      priority={priority}
      sizes={finalSizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
};

export default ResponsiveImage;
