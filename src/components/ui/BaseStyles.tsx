'use client';

import React from 'react';

// Base styles moved from globals.css
const baseStyles = `
/* Base Styles */
* {
  border-color: hsl(var(--border));
}

/* Root font size - responsive base (reduced by 5%) */
html {
  font-size: 15.2px; /* Base 16px reduced by 5% = 15.2px */
}

/* Mobile-first responsive font sizing */
@media (max-width: 320px) {
  html { font-size: 13.3px; } /* 14px reduced by 5% = 13.3px */
}

@media (min-width: 321px) and (max-width: 767px) {
  html { font-size: 15.2px; } /* 16px reduced by 5% = 15.2px */
}

@media (min-width: 768px) {
  html { font-size: 16.15px; } /* 17px reduced by 5% = 16.15px */
}

@media (min-width: 1024px) {
  html { font-size: 17.1px; } /* 18px reduced by 5% = 17.1px */
}

@media (min-width: 1280px) {
  html { font-size: 17.1px; } /* 18px reduced by 5% = 17.1px */
}

@media (min-width: 1920px) {
  html { font-size: 19px; } /* 20px reduced by 5% = 19px */
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
  return (
    <style
      id="base-styles"
      dangerouslySetInnerHTML={{ __html: baseStyles }}
    />
  );
};

export default BaseStyles;
