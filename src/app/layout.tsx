import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientAnalytics from "@/components/analytics/ClientAnalytics";
import PerformanceOptimizer from "@/components/performance/PerformanceOptimizer";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "RemoteWork - Remote work made simple",
    template: "%s | RemoteWork"
  },
  description: "Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.",
  keywords: ["remote work", "productivity", "work from home", "distributed teams", "remote jobs"],
  authors: [{ name: "Alex Johnson" }],
  creator: "Alex Johnson",
  publisher: "RemoteWork",
  metadataBase: new URL('https://remotework.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico', // This prevents the apple-touch-icon.png 404 error
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remotework.com',
    title: 'RemoteWork - Remote work made simple',
    description: 'Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.',
    siteName: 'RemoteWork',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'RemoteWork - Remote work made simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteWork - Remote work made simple',
    description: 'Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.',
    creator: '@alexjohnson',
    images: ['/images/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Performance hints */}
        <link rel="preload" href="/images/hero-remote-work.jpg" as="image" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        {/* Client-side Analytics */}
        <ClientAnalytics />

        {/* Performance Optimizer */}
        <PerformanceOptimizer />

        {/* <TooltipProvider> */}
          {/* <Toaster /> */}
          {/* <Sonner /> */}
          {children}
        {/* </TooltipProvider> */}
      </body>
    </html>
  );
}
