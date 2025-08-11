import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Federal Remote Jobs - USAJOBS Integration | RemoteWork Blog',
  description: 'Find the latest federal remote job opportunities through our USAJOBS integration. Search government positions that offer remote work and telework options.',
  keywords: ['federal jobs', 'remote government jobs', 'USAJOBS', 'federal remote work', 'government careers', 'telework'],
  openGraph: {
    title: 'Federal Remote Jobs - USAJOBS Integration',
    description: 'Find the latest federal remote job opportunities through our USAJOBS integration.',
    type: 'website',
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
