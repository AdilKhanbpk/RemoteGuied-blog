import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://remotework.com",
    title: "RemoteWork - Remote work made simple",
    description: "Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.",
    siteName: "RemoteWork",
  },
  twitter: {
    card: "summary_large_image",
    title: "RemoteWork - Remote work made simple",
    description: "Your trusted resource for remote work tips, productivity strategies, and the latest opportunities in the distributed work landscape.",
    creator: "@alexjohnson",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
