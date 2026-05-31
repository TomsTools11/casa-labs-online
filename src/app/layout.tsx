import type { Metadata } from 'next';
import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: 'Casa Labs — Coming Soon',
  description:
    'Advanced research compounds. The Casa Labs online store opens soon — third-party-verified, batch-traceable peptides for research and laboratory use only.',
  icons: {
    icon: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Casa Labs design tokens + brand fonts (Lato self-hosted, Epilogue/Inter via Google) */}
        <link rel="stylesheet" href="/casa-labs/colors_and_type.css" />
        {/* Match mobile browser chrome to the active system theme */}
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#131313" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FBF7F0" />
      </head>
      <body>
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}
