import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedPosts from '@/components/sections/FeaturedPosts';
import CategoriesSection from '@/components/sections/CategoriesSection';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Remote work made simple',
  description: 'Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.',
  path: '/',
});

export default function Home() {
  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      <main>
        <HeroSection />
        <FeaturedPosts />
        <CategoriesSection />
      </main>
    </Layout>
  );
}
