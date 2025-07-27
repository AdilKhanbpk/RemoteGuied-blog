// Server-side Cloudinary configuration
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'dd7kxabqo',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '565322172817273',
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '7_kgJIXcORg8PNykNwy5NT_GKMQ',
});

// Debug logging (remove in production)
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Cloudinary cloud_name not found in environment variables');
}
if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) {
  console.error('❌ Cloudinary API key not found in environment variables');
}
if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
  console.error('❌ Cloudinary API secret not found in environment variables');
}

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
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error('Upload failed - no result returned'));
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    ).end(buffer);
  });
};
