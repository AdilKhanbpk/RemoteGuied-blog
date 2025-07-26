import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';
import { cld } from '@/lib/cloudinary-config';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const baseUrl = 'https://remotework.com';
const siteName = 'RemoteWork';
const defaultTitle = 'RemoteWork - Remote work made simple';
const defaultDescription = 'Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.';

// Helper function to extract public ID from Cloudinary URL
const getPublicIdFromUrl = (url: string): string => {
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

export function generatePageMetadata({
  title,
  description,
  path = '',
  image = '/images/og-default.jpg',
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = ['Alex Johnson'],
  type = 'website'
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullUrl = `${baseUrl}${path}`;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.length > 0 ? keywords : ['remote work', 'productivity', 'work from home', 'distributed teams'],
    authors: authors.map(name => ({ name })),
    creator: 'Alex Johnson',
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      creator: '@alexjohnson',
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: authors,
      tags: keywords,
    };
  }

  return metadata;
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  // Generate SEO-optimized Cloudinary image URL for Open Graph
  let optimizedImage = '/images/og-blog.jpg'; // fallback

  if (post.featuredImage && post.featuredImage.includes('cloudinary.com')) {
    const publicId = getPublicIdFromUrl(post.featuredImage);

    // Create optimized Open Graph image (1200x630) using new SDK
    const ogImage = cld.image(publicId);
    ogImage
      .resize(fill().width(1200).height(630).gravity(autoGravity()))
      .delivery(quality(auto()))
      .delivery(format(autoFormat()));

    optimizedImage = ogImage.toURL();
  } else if (post.featuredImage) {
    // Use original image if not from Cloudinary
    optimizedImage = post.featuredImage;
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: optimizedImage,
    keywords: post.tags,
    
    publishedTime: post.publishedAt,
    authors: [post.author.name],
    type: 'article',
  });
}

export function generateStructuredData(post?: BlogPost) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: defaultDescription,
    publisher: {
      '@type': 'Person',
      name: 'Alex Johnson',
      url: `${baseUrl}/about`,
    },
  };

  if (post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage ? `${baseUrl}${post.featuredImage}` : `${baseUrl}/images/og-blog.jpg`,
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: post.author.social.website || `${baseUrl}/about`,
      },
      publisher: {
        '@type': 'Person',
        name: 'Alex Johnson',
        url: `${baseUrl}/about`,
      },
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blog/${post.slug}`,
      },
      keywords: post.tags.join(', '),
      articleSection: post.category,
      wordCount: post.content.split(' ').length,
      timeRequired: `PT${post.readingTime}M`,
    };
  }

  return baseStructuredData;
}
