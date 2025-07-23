'use client';

import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = '/fonts/inter.woff2';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload critical images
      const heroImage = new Image();
      heroImage.src = '/images/hero-remote-work.jpg';
    };

    // Optimize images loading
    const optimizeImages = () => {
      // Add loading="lazy" to images that don't have it
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        if (img.getBoundingClientRect().top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      });
    };

    // Reduce layout shifts
    const reduceLayoutShifts = () => {
      // Add aspect ratio to images without dimensions
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach((img) => {
        img.style.aspectRatio = '16/9';
        img.style.objectFit = 'cover';
      });
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
      scripts.forEach((script) => {
        if (!script.src.includes('essential') && !script.src.includes('critical')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeImages();
    reduceLayoutShifts();
    optimizeThirdPartyScripts();

    // Optimize on route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        optimizeImages();
        reduceLayoutShifts();
      }, 100);
    };

    // Listen for navigation
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Prefetch important pages
  useEffect(() => {
    const prefetchPages = () => {
      const importantPages = ['/blog', '/about', '/categories'];
      
      importantPages.forEach((page) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Prefetch after initial load
    setTimeout(prefetchPages, 2000);
  }, []);

  return null;
};

export default PerformanceOptimizer;
