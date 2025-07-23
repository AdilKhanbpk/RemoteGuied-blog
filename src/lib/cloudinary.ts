// Client-side Cloudinary utilities (no server imports)

// Client-side upload function
export const uploadToCloudinary = async (file: File, folder: string = 'blog-images'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'blog_uploads'); // We'll create this preset
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

// Generate SEO-optimized image URL with responsive breakpoints
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}
): string => {
  const {
    width = 800,
    height,
    quality = 'auto:best',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  let transformation = `q_${quality},f_${format}`;

  if (width) transformation += `,w_${width}`;
  if (height) transformation += `,h_${height},c_${crop}`;
  if (gravity && crop === 'fill') transformation += `,g_${gravity}`;

  // Add SEO optimizations
  transformation += ',fl_progressive,fl_immutable_cache';

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
};

// Generate responsive image srcset for SEO
export const getResponsiveImageSrcSet = (publicId: string, baseWidth: number = 800): string => {
  const breakpoints = [400, 600, 800, 1200, 1600];

  return breakpoints
    .filter(width => width <= baseWidth * 2) // Don't upscale beyond 2x
    .map(width => {
      const url = getOptimizedImageUrl(publicId, {
        width,
        quality: 'auto:best',
        format: 'auto'
      });
      return `${url} ${width}w`;
    })
    .join(', ');
};

// Generate image metadata for SEO
export const getImageMetadata = (url: string, alt: string, title?: string) => {
  const publicId = getPublicIdFromUrl(url);

  return {
    src: getOptimizedImageUrl(publicId, { width: 800 }),
    srcSet: getResponsiveImageSrcSet(publicId, 800),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    alt,
    title: title || alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  const uploadIndex = parts.findIndex(part => part === 'upload');
  if (uploadIndex === -1) return '';
  
  // Get everything after 'upload' and before file extension
  const pathAfterUpload = parts.slice(uploadIndex + 1).join('/');
  return pathAfterUpload.replace(/\.[^/.]+$/, ''); // Remove file extension
};

// Delete image from Cloudinary (server-side only - use API route)
export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/upload?publicId=${encodeURIComponent(publicId)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete request failed');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
};
