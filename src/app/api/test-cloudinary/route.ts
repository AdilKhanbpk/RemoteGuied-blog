import { NextResponse } from 'next/server';

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return NextResponse.json({
    cloudName: cloudName ? 'Set' : 'Missing',
    apiKey: apiKey ? 'Set' : 'Missing',
    apiSecret: apiSecret ? 'Set' : 'Missing',
    cloudNameValue: cloudName || 'undefined',
    // Don't expose actual API key/secret values for security
  });
}
