import type { Metadata } from 'next';
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import './globals.css';

// Self-hosted at build time (static-export safe — no runtime Google requests).
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
});
const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://casalabs.shop'),
  icons: {
    icon: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hanken.variable} ${space.variable} ${mono.variable}`}>
      <head>
        <meta name="theme-color" content="#0C0C0F" />
      </head>
      <body>
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}
