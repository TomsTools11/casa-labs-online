import Countdown from '@/components/coming-soon/Countdown';
import NotifyForm from '@/components/coming-soon/NotifyForm';

export default function ComingSoonPage() {
  return (
    <>
      <div className="bg" aria-hidden="true" />

      <header className="site">
        <picture>
          <source srcSet="/casa-labs/casa-labs-cream.png" media="(prefers-color-scheme: dark)" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wordmark" src="/casa-labs/casa-labs-charcoal.png" alt="Casa Labs" />
        </picture>
      </header>

      <main>
        <span className="eyebrow">Arriving Soon</span>

        <h1 className="headline">
          Advanced Research<br />
          <em>Compounds.</em>
        </h1>

        <p
          className="sub"
          style={{ fontSize: '19px', maxWidth: '472px', color: 'var(--cl-fg2)' }}
        >
          The Casa Labs online store opens July 1, 2026. We provide
          third-party-verified, batch-traceable peptides.
        </p>

        <Countdown />

        <NotifyForm />

        <div className="trust">
          <span className="item">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            </svg>
            Third Party Tested
          </span>
          <span className="dot" />
          <span className="item">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 12 2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            99% Purity Guaranteed
          </span>
          <span className="dot" />
          <span className="item">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20M4 20V8l6-3v3l6-3v15M14 20v-4h-4v4" />
            </svg>
            GMP Manufactured
          </span>
        </div>
      </main>

      <section className="referral" aria-labelledby="referral-heading">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mark-deco" src="/casa-labs/mark-cream.png" alt="" aria-hidden="true" />
        <div className="copy">
          <span className="eyebrow">Referral Partner Program</span>
          <h2
            id="referral-heading"
            style={{ fontSize: '34px', maxWidth: '548px', fontWeight: 600 }}
          >
            Become a <span style={{ color: 'var(--cl-gold)' }}>CASA Labs</span> referral partner.
          </h2>
          <p>
            Earn a percentage of every sale made with your unique referral code. We handle
            fulfillment, testing, and chain of custody — you bring the audience and get paid on
            each order.
          </p>
        </div>
        <a
          className="cta"
          href="https://forms.gle/se9Ffua4hvApTUzc8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply to Partner
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      <footer className="site">
        <div className="disclaimer">
          For Research &amp; Laboratory Use Only · Not for Human Consumption
        </div>
        <div className="links">
          <a href="mailto:alex@casalabs.shop">hello@casalabs.shop</a>
          <span className="sep">·</span>
          <a href="#">Certificates of Analysis</a>
          <span className="sep">·</span>
          <a href="#">Contact</a>
        </div>
        <div className="copyright">© 2026 Casa Labs. All rights reserved.</div>
        <a className="footer-mark" href="#" aria-label="Back to top">
          <picture>
            <source srcSet="/casa-labs/casa-labs-footer-cream.png" media="(prefers-color-scheme: dark)" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/casa-labs/casa-labs-footer-charcoal.png" alt="Casa Labs" />
          </picture>
        </a>
      </footer>
    </>
  );
}
