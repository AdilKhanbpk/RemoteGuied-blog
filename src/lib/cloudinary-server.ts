'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLAUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLAUDINARY_API_SECRET,
});

export default cloudinary;

// Delete image from Cloudinary (server-side only)
export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
};

// Upload to Cloudinary (server-side)
export const uploadToCloudinaryServer = async (
  buffer: Buffer,
  options: {
    folder?: string;
    public_id?: string;
    transformation?: unknown[];
  } = {}
): Promise<{
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}> => {
  const { folder = 'blog-images', public_id, transformation = [] } = options;

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type: 'image',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' },
        ...transformation
      ]
    };

    if (public_id) {
      uploadOptions.public_id = public_id;
    }

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};
