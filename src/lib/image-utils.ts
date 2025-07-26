/**
 * Image optimization utilities for responsive design
 */

export interface ImageBreakpoint {
  width: number;
  quality?: number;
}

export interface ResponsiveImageConfig {
  src: string;
  breakpoints: ImageBreakpoint[];
  format?: 'webp' | 'jpeg' | 'png';
  quality?: number;
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(config: ResponsiveImageConfig): string {
  const { src, breakpoints, format = 'webp', quality = 85 } = config;
  
  return breakpoints
    .map(({ width, quality: bpQuality }) => {
      const imageQuality = bpQuality || quality;
      // For external URLs (like Unsplash), append query parameters
      if (src.includes('unsplash.com')) {
        return `${src}&w=${width}&q=${imageQuality}&fm=${format} ${width}w`;
      }
      // For local images, you would integrate with your image optimization service
      return `${src}?w=${width}&q=${imageQuality}&fm=${format} ${width}w`;
    })
    .join(', ');
}

/**
 * Predefined breakpoints for different image types
 */
export const IMAGE_BREAKPOINTS = {
  hero: [
    { width: 320, quality: 75 },
    { width: 768, quality: 80 },
    { width: 1024, quality: 85 },
    { width: 1280, quality: 85 },
    { width: 1920, quality: 90 },
  ],
  content: [
    { width: 320, quality: 75 },
    { width: 640, quality: 80 },
    { width: 800, quality: 85 },
    { width: 1200, quality: 85 },
  ],
  thumbnail: [
    { width: 150, quality: 75 },
    { width: 300, quality: 80 },
    { width: 600, quality: 85 },
  ],
  logo: [
    { width: 160, quality: 90 },
    { width: 250, quality: 90 },
    { width: 320, quality: 90 },
  ],
};

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(variant: keyof typeof IMAGE_BREAKPOINTS): string {
  switch (variant) {
    case 'hero':
      return '(max-width: 320px) 320px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px';
    case 'content':
      return '(max-width: 320px) 320px, (max-width: 768px) 768px, (max-width: 1024px) 800px, 1200px';
    case 'thumbnail':
      return '(max-width: 320px) 150px, (max-width: 768px) 200px, 300px';
    case 'logo':
      return '(max-width: 768px) 160px, 250px';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

/**
 * Optimize image URL for different services
 */
export function optimizeImageUrl(
  src: string,
  width: number,
  height?: number,
  quality: number = 85,
  format: string = 'webp'
): string {
  // Handle Unsplash URLs
  if (src.includes('unsplash.com')) {
    let url = `${src}&w=${width}&q=${quality}&fm=${format}`;
    if (height) {
      url += `&h=${height}&fit=crop`;
    }
    return url;
  }
  
  // Handle other external services or local images
  // You can extend this for other image services like Cloudinary, ImageKit, etc.
  
  return src;
}

/**
 * Generate blur placeholder for images
 */
export function generateBlurDataURL(): string {
  // Simple base64 encoded 1x1 transparent pixel
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
}

/**
 * Check if image should be loaded with priority
 */
export function shouldLoadWithPriority(variant: string, index?: number): boolean {
  // Load hero images and first few content images with priority
  if (variant === 'hero') return true;
  if (variant === 'content' && typeof index === 'number' && index < 2) return true;
  return false;
}

/**
 * Get optimal image dimensions for different screen sizes
 */
export function getOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maintainAspectRatio: boolean = true
): { width: number; height: number } {
  if (!maintainAspectRatio) {
    return { width: maxWidth, height: originalHeight };
  }
  
  const aspectRatio = originalWidth / originalHeight;
  const width = Math.min(originalWidth, maxWidth);
  const height = Math.round(width / aspectRatio);
  
  return { width, height };
}
