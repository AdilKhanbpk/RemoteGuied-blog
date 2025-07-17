import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories – Remote Work Blog',
  description: 'Explore articles by category: productivity, team management, tools, and more.',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-content py-16">
        <h1 className="text-4xl font-bold mb-8">Categories</h1>
        <p className="mb-8">Browse articles by category. (Implement dynamic category listing as needed.)</p>
      </main>
      <Footer />
    </div>
  );
}
