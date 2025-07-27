import { NextResponse } from 'next/server';

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'dd7kxabqo';
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '565322172817273';
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '7_kgJIXcORg8PNykNwy5NT_GKMQ';

  return NextResponse.json({
    cloudName: cloudName ? 'Set' : 'Missing',
    apiKey: apiKey ? 'Set' : 'Missing',
    apiSecret: apiSecret ? 'Set' : 'Missing',
    cloudNameValue: cloudName || 'undefined',
    // Don't expose actual API key/secret values for security
  });
}
