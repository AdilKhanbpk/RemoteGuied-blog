'use client';

import { useEffect } from 'react';
import { trackBlogView } from '@/lib/analytics';

interface ViewTrackerProps {
  postSlug: string;
  postTitle: string;
  category: string;
}

const ViewTracker: React.FC<ViewTrackerProps> = ({ postSlug, postTitle, category }) => {
  useEffect(() => {
    // Track view in database
    const trackView = async () => {
      try {
        await fetch(`/api/posts/${postSlug}/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    // Track view in Google Analytics
    trackBlogView(postSlug, postTitle, category);

    // Track database view
    trackView();

    // Track reading progress
    let maxScroll = 0;
    const trackReadingProgress = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        
        // Track reading progress milestone
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'reading_progress',
            category: 'Blog',
            label: `${postSlug}:${scrollPercent}%`,
            value: scrollPercent,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch(console.error);
      }
    };

    // Track time spent on page
    const startTime = Date.now();
    let isActive = true;

    const trackTimeSpent = () => {
      if (isActive) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 0 && timeSpent % 30 === 0) { // Every 30 seconds
          fetch('/api/analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'time_on_page',
              category: 'Engagement',
              label: postSlug,
              value: timeSpent,
              url: window.location.href,
              timestamp: Date.now(),
            }),
          }).catch(console.error);
        }
      }
    };

    // Track when user becomes inactive/active
    const handleVisibilityChange = () => {
      isActive = !document.hidden;
    };

    // Add event listeners
    window.addEventListener('scroll', trackReadingProgress, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Track time spent every 30 seconds
    const timeInterval = setInterval(trackTimeSpent, 30000);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', trackReadingProgress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(timeInterval);

      // Track final session duration
      const finalTimeSpent = Math.round((Date.now() - startTime) / 1000);
      if (finalTimeSpent > 5) { // Only track if user spent more than 5 seconds
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'session_duration',
            category: 'Engagement',
            label: postSlug,
            value: finalTimeSpent,
            url: window.location.href,
            timestamp: Date.now(),
          }),
        }).catch(console.error);
      }
    };
  }, [postSlug, postTitle, category]);

  // This component doesn't render anything visible
  return null;
};

export default ViewTracker;
