'use client';

import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Typography from '../ui/Typography';

// Layout styles moved from globals.css
const layoutStyles = `
  .section-padding {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .section-padding {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }

  @media (min-width: 1024px) {
    .section-padding {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }

  .container-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 75rem;
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media (min-width: 640px) {
    .container-content {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container-content {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  .gradient-hero {
    background: linear-gradient(135deg, hsl(221 91% 91%) 0%, hsl(226 100% 94%) 100%);
  }

  .gradient-cta {
    background: linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(221 83% 48%) 100%);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  // Inject styles on first render
  useEffect(() => {
    const styleId = 'layout-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = layoutStyles;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        <Typography>
          {children}
        </Typography>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
