'use client';

import React from 'react';
import { Twitter, Linkedin, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title, description }) => {
  const shareText = description ? `${title} - ${description}` : `Check out this article: ${title}`;

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url });
    } else {
      handleShare('twitter');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialShareButtons;
