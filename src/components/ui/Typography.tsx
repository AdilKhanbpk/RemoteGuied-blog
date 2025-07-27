'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

// Typography styles moved from globals.css
const typographyStyles = `
  /* Responsive Typography System */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    letter-spacing: -0.025em;
    color: hsl(var(--content-primary));
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  /* Mobile-first heading sizes (reduced by 5%) */
  h1 {
    font-size: 1.9rem; /* 2rem reduced by 5% = 1.9rem */
    font-weight: 700;
    line-height: 1.1;
  }

  h2 {
    font-size: 1.425rem; /* 1.5rem reduced by 5% = 1.425rem */
    font-weight: 600;
  }

  h3 {
    font-size: 1.1875rem; /* 1.25rem reduced by 5% = 1.1875rem */
    font-weight: 600;
  }

  h4 {
    font-size: 1.06875rem; /* 1.125rem reduced by 5% = 1.06875rem */
    font-weight: 600;
  }

  h5 {
    font-size: 0.95rem; /* 1rem reduced by 5% = 0.95rem */
    font-weight: 600;
  }

  h6 {
    font-size: 0.83125rem; /* 0.875rem reduced by 5% = 0.83125rem */
    font-weight: 600;
  }

  /* Tablet and up heading scaling (reduced by 5%) */
  @media (min-width: 768px) {
    h1 { font-size: 2.1375rem; } /* 2.25rem reduced by 5% = 2.1375rem */
    h2 { font-size: 1.6625rem; } /* 1.75rem reduced by 5% = 1.6625rem */
    h3 { font-size: 1.30625rem; } /* 1.375rem reduced by 5% = 1.30625rem */
    h4 { font-size: 1.1875rem; } /* 1.25rem reduced by 5% = 1.1875rem */
  }

  /* Desktop heading scaling (reduced by 5%) */
  @media (min-width: 1024px) {
    h1 { font-size: 2.375rem; } /* 2.5rem reduced by 5% = 2.375rem */
    h2 { font-size: 1.9rem; } /* 2rem reduced by 5% = 1.9rem */
    h3 { font-size: 1.425rem; } /* 1.5rem reduced by 5% = 1.425rem */
    h4 { font-size: 1.30625rem; } /* 1.375rem reduced by 5% = 1.30625rem */
  }

  /* Large desktop heading scaling (reduced by 5%) */
  @media (min-width: 1920px) {
    h1 { font-size: 2.6125rem; } /* 2.75rem reduced by 5% = 2.6125rem */
    h2 { font-size: 2.1375rem; } /* 2.25rem reduced by 5% = 2.1375rem */
    h3 { font-size: 1.6625rem; } /* 1.75rem reduced by 5% = 1.6625rem */
    h4 { font-size: 1.425rem; } /* 1.5rem reduced by 5% = 1.425rem */
  }

  /* Body text and paragraphs (reduced by 5%) */
  p {
    color: hsl(var(--content-body));
    line-height: 1.7;
    font-size: 0.95rem; /* 1rem reduced by 5% = 0.95rem */
    margin-bottom: 1em;
  }

  /* Lead text styles removed - now using Tailwind classes directly */

  /* Caption and secondary text (reduced by 5%) */
  .caption {
    color: hsl(var(--content-caption));
    font-size: 0.83125rem; /* 0.875rem reduced by 5% = 0.83125rem */
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    .caption { font-size: 0.7125rem; } /* 0.75rem reduced by 5% = 0.7125rem */
  }

  /* Enhanced Reading Experience */
  .prose-content {
    max-width: 65ch;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 768px) {
    .prose-content {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  .prose-content p {
    margin-bottom: 1.5rem;
    font-size: 1.06875rem; /* 1.125rem reduced by 5% = 1.06875rem */
    line-height: 1.7;
  }

  @media (max-width: 767px) {
    .prose-content p {
      font-size: 0.95rem; /* 1rem reduced by 5% = 0.95rem */
      line-height: 1.6;
    }
  }

  .prose-content h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }

  .prose-content h3 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .prose-content h4 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
`;

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ children, className }) => {
  // Inject styles on first render
  useEffect(() => {
    const styleId = 'typography-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = typographyStyles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className={cn('typography', className)}>
      {children}
    </div>
  );
};

export default Typography;
