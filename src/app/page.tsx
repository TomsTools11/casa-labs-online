import type { Metadata } from 'next';
import PreLaunchPage from '@/components/prelaunch/PreLaunchPage';

export const metadata: Metadata = {
  title: 'CASA Labs · Pre-Launch Research Bundles',
  description:
    'Three purpose-built research compound bundles at founding pre-order pricing before public launch. Third-party tested, 99%+ purity, COA provided. Reserve up to three bundles.',
  openGraph: {
    title: 'CASA Labs — Founding Research Bundles',
    description:
      'Founding pre-order pricing on three research compound bundles. Limited tiers — the earlier you reserve, the more you save.',
    url: 'https://casalabs.shop',
    siteName: 'CASA Labs',
    type: 'website',
    images: ['/prelaunch/casa-logo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'CASA Labs — Founding Research Bundles',
  },
};

export default function Home() {
  return <PreLaunchPage />;
}
