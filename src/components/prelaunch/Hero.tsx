import { MAX_BUNDLES } from '@/config/preorder';
import { numWord } from '@/lib/preorder/pricing';

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/prelaunch/casa-logo.png" alt="CASA Labs" />
        </div>
        <div className="eyebrow">Pre-Launch · Limited Founding Release</div>
        <h1>Founding Research Bundles</h1>
        <p className="sub">
          Three purpose-built compound sets for your research program, offered at founding
          pre-order pricing before public launch. Reserve up to {numWord(MAX_BUNDLES)} bundles per
          customer.
        </p>
        <div className="cta-row">
          <a href="#bundles" className="btn btn-ghost">
            View the bundles
          </a>
          <a href="#order" className="btn btn-primary">
            Reserve your pre-order
          </a>
        </div>
      </div>
    </header>
  );
}
