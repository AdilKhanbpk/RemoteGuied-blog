'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Typography from '../ui/Typography';
import CSSVariables from '../ui/CSSVariables';
import BaseStyles from '../ui/BaseStyles';
import UtilityClasses from '../ui/UtilityClasses';
import AnimationClasses from '../ui/AnimationClasses';

// Layout styles moved to UtilityClasses component

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  // Styles are now injected via individual style components

  return (
    <div className="min-h-screen flex flex-col">
      {/* Inject all global styles */}
      <CSSVariables />
      <BaseStyles />
      <UtilityClasses />
      <AnimationClasses />

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
