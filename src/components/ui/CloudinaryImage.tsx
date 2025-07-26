'use client';

import React, { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '@/lib/cloudinary-config';
import { fill, scale, fit } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  crop?: 'fill' | 'fit' | 'scale';
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

// Helper function to extract public ID from Cloudinary URL
const getPublicId = (url: string): string => {
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    if (uploadIndex !== -1 && uploadIndex < parts.length - 1) {
      const publicIdParts = parts.slice(uploadIndex + 1);
      const lastPart = publicIdParts[publicIdParts.length - 1];
      const withoutExtension = lastPart.replace(/\.[^/.]+$/, '');
      publicIdParts[publicIdParts.length - 1] = withoutExtension;
      return publicIdParts.join('/');
    }
  }
  return url.replace(/\.[^/.]+$/, '');
};

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  width = 800,
  height,
  className = '',
  priority = false,
  crop = 'fill',
  style,
  onLoad,
  onError,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle non-Cloudinary URLs (fallback to regular img)
  if (!src.includes('cloudinary.com') && !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width, height, ...style }}
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

  const publicId = getPublicId(src);

  // Create Cloudinary image with transformations
  const myImage = cld.image(publicId);

  // Apply transformations
  myImage
    .delivery(quality(auto()))
    .delivery(format(autoFormat()));

  // Apply resize based on crop type
  if (crop === 'fill' && width && height) {
    myImage.resize(fill().width(width).height(height).gravity(autoGravity()));
  } else if (crop === 'fit' && width && height) {
    myImage.resize(fit().width(width).height(height));
  } else if (width) {
    myImage.resize(scale().width(width));
  }

  // Error fallback
  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
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
    <div className="relative" style={style}>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}

      <AdvancedImage
        cldImg={myImage}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ width, height }}
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
