# Cloudinary SEO-Optimized Setup Guide

## Overview
Your blog now uses Cloudinary exclusively for all image storage and optimization. This provides:
- ✅ **Better SEO**: Optimized images with proper alt tags and responsive sizing
- ✅ **Faster Loading**: Automatic format conversion (WebP, AVIF) and compression
- ✅ **Responsive Images**: Multiple sizes generated automatically
- ✅ **CDN Delivery**: Global content delivery network for fast loading

## 1. Create Upload Preset

To enable client-side uploads, you need to create an upload preset in your Cloudinary dashboard:

### Steps:
1. Go to your Cloudinary Dashboard: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets**
4. Click **Add upload preset**

### Configuration:
- **Preset name**: `blog_uploads`
- **Signing Mode**: `Unsigned` (for client-side uploads)
- **Folder**: `blog-images` (optional, can be overridden)
- **Access Mode**: `Public`

### Transformations (Optional but Recommended):
- **Quality**: `auto`
- **Format**: `auto`
- **Max file size**: `10MB`

### Advanced Settings:
- **Allowed formats**: `jpg,png,gif,webp`
- **Max image width**: `2000px`
- **Max image height**: `2000px`

## 2. Environment Variables

Make sure your `.env` file has these variables:

```env
NEXT_PUBLIC_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLAUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_CLAUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

## 3. Folder Structure

The app will create these folders in your Cloudinary account:
- `blog-featured/` - Featured images for blog posts
- `blog-content/` - Images uploaded within blog content
- `blog-images/` - General blog images

## 4. SEO Features Enabled

✅ **SEO-Optimized Images:**
- Automatic format conversion (WebP, AVIF)
- Responsive image generation (multiple sizes)
- Optimized alt tags with context
- Progressive loading and lazy loading
- Proper Open Graph image sizing (1200x630)
- Twitter Card optimization

✅ **Rich Text Editor with:**
- Bold, italic, underline formatting
- Headers (H1-H6)
- Lists (ordered and unordered)
- Links (with custom link dialog)
- Images (drag & drop or click to upload to Cloudinary)
- Blockquotes
- Code blocks
- Undo/Redo functionality

✅ **Image Upload & Optimization:**
- Drag and drop support
- File validation (type and size)
- Automatic Cloudinary upload
- Real-time image optimization
- Preview and remove functionality
- SEO-friendly URLs and metadata

✅ **Content Features:**
- Rich HTML content storage
- Image embedding in content with SEO optimization
- Link creation and management
- Professional formatting options
- Automatic image compression and optimization

## 5. Usage

### Writing Blog Posts:
1. Use the rich text editor toolbar for formatting
2. Click the image icon to upload images directly into content
3. Click the link icon to add links to text
4. Use the formatting buttons for bold, italic, etc.

### Adding Links:
1. Select text you want to make a link
2. Click the link button in toolbar
3. Enter the URL in the prompt
4. The text becomes a clickable link

### Adding Images:
1. Click the image button in toolbar
2. Select an image file
3. Image uploads to Cloudinary automatically
4. Image appears in your content

## 6. Troubleshooting

### Upload Preset Error:
- Make sure you created the `blog_uploads` preset
- Ensure it's set to "Unsigned" mode
- Check that your cloud name is correct

### Environment Variables:
- Double-check all Cloudinary credentials
- Restart your development server after changes
- Ensure no extra spaces in the values

### Image Upload Issues:
- Check file size (max 10MB)
- Ensure file is a valid image format
- Check browser console for error messages
