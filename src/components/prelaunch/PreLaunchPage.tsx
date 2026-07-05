import BundleGrid from './BundleGrid';
import Hero from './Hero';
import LegalFooter from './LegalFooter';
import OrderForm from './OrderForm';
import TierLadder from './TierLadder';
import TopBar from './TopBar';
import TrustStrip from './TrustStrip';

// The whole campaign page — mountable at any route.
export default function PreLaunchPage() {
  return (
    <>
      <TopBar />
      <Hero />
      <TrustStrip />
      <TierLadder />
      <BundleGrid />
      <OrderForm />
      <LegalFooter />
    </>
  );
}
