'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getOptimizedImageUrl, getResponsiveImageSrcSet, getPublicIdFromUrl } from '@/lib/cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: string;
  crop?: string;
  gravity?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  className = '',
  priority = false,
  quality = 'auto:best',
  crop = 'fill',
  gravity = 'auto',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  onLoad,
  onError,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle non-Cloudinary URLs (fallback)
  if (!src.includes('cloudinary.com')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        priority={priority}
        fill={fill}
        sizes={sizes}
        style={style}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
          onError?.();
        }}
      />
    );
  }

  const publicId = getPublicIdFromUrl(src);
  
  // Generate optimized URLs
  const optimizedSrc = getOptimizedImageUrl(publicId, {
    width,
    height,
    quality,
    crop,
    gravity,
  });

  const srcSet = getResponsiveImageSrcSet(publicId, width);

  // Error fallback
  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          ...style 
        }}
      >
        <div className="text-center text-gray-500">
          <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ 
            width: fill ? '100%' : width, 
            height: fill ? '100%' : height 
          }}
        />
      )}
      
      <Image
        src={optimizedSrc}
        srcSet={srcSet}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        priority={priority}
        fill={fill}
        sizes={sizes}
        style={style}
        quality={75} // Let Cloudinary handle quality optimization
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
          onError?.();
        }}
      />
    </div>
  );
};

export default CloudinaryImage;
