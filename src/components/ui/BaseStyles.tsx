'use client';

import { useEffect } from 'react';

// Base styles moved from globals.css
const baseStyles = `
/* Base Styles */
* {
  border-color: hsl(var(--border));
}

/* Root font size - responsive base */
html {
  font-size: 16px; /* Base 16px for desktop */
}

/* Mobile-first responsive font sizing */
@media (max-width: 320px) {
  html { font-size: 14px; }
}

@media (min-width: 321px) and (max-width: 767px) {
  html { font-size: 16px; }
}

@media (min-width: 768px) {
  html { font-size: 17px; }
}

@media (min-width: 1024px) {
  html { font-size: 18px; }
}

@media (min-width: 1280px) {
  html { font-size: 18px; }
}

@media (min-width: 1920px) {
  html { font-size: 20px; }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem; /* Always 1rem - scales with html font-size */
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  font-variation-settings: "opsz" 32;
}
`;

const BaseStyles: React.FC = () => {
  useEffect(() => {
    const styleId = 'base-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = baseStyles;
      document.head.appendChild(style);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default BaseStyles;
