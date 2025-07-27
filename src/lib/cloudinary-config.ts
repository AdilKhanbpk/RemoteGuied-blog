import { Cloudinary } from "@cloudinary/url-gen";

// Create and configure the Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dd7kxabqo'
  },
  url: {
    secure: true // Always use HTTPS
  }
});

// Validate configuration
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.warn('⚠️ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not found. Using demo cloud.');
}

export default cld;
