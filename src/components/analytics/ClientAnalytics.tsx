'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackPerformance, trackEngagement } from '@/lib/analytics';

const ClientAnalytics: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    trackPageView(window.location.href, document.title);

    // Track performance metrics
    trackPerformance();

    // Track user engagement
    trackEngagement();

    // Track blog post views specifically
    if (pathname && pathname.startsWith('/blog/') && pathname !== '/blog') {
      const slug = pathname.replace('/blog/', '');
      
      // Track blog post view in database
      fetch(`/api/posts/${slug}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(console.error);
    }
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
};

export default ClientAnalytics;
