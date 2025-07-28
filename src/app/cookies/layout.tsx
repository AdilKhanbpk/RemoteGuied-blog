import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - RemoteWork',
  description: 'Learn how RemoteWork uses cookies to enhance your browsing experience, analyze site usage, and provide personalized content. Manage your cookie preferences.',
  keywords: 'cookies, privacy, data protection, website cookies, cookie policy, RemoteWork',
  openGraph: {
    title: 'Cookie Policy - RemoteWork',
    description: 'Learn how RemoteWork uses cookies to enhance your browsing experience, analyze site usage, and provide personalized content.',
    type: 'website',
    url: 'https://remotework.com/cookies',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy - RemoteWork',
    description: 'Learn how RemoteWork uses cookies to enhance your browsing experience, analyze site usage, and provide personalized content.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://remotework.com/cookies',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
