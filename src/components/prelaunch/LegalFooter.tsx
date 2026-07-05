export default function LegalFooter() {
  return (
    <footer className="legal">
      <div className="wrap">
        <strong>Research Use Only.</strong> All products offered by CASA Labs are sold strictly as
        chemical reference materials for laboratory research and development purposes only. They are{' '}
        <strong>not</strong> drugs, dietary supplements, cosmetics, or food, and are{' '}
        <strong>not</strong> intended for human or animal consumption, diagnostic, or therapeutic
        use. No statement on this page has been evaluated by the FDA and nothing here constitutes a
        medical or health claim.
        <div className="rule" />
        CASA Labs is a supplier of research chemicals. It is not a compounding pharmacy (503A) or an
        outsourcing facility (503B) under the Federal Food, Drug, and Cosmetic Act. Purchasers are
        responsible for compliance with all applicable federal, state, and local laws. Pre-order
        pricing is a limited promotional offer; tier availability is confirmed by order sequence and
        CASA Labs reserves the right to verify eligibility.
        <div className="rule" />
        <span className="addr">
          CASA LABS · 301 CONGRESS AVE, 12TH FLOOR, AUSTIN, TX 78701 ·{' '}
          <a href="mailto:alex@casalabs.shop" style={{ color: '#b6a99a' }}>
            alex@casalabs.shop
          </a>{' '}
          · casalabs.shop
        </span>
      </div>
    </footer>
  );
}
