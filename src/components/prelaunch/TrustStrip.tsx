const ITEMS = [
  'Third-party tested',
  '99%+ purity',
  'GMP manufactured',
  'COA documentation included',
];

export default function TrustStrip() {
  return (
    <div className="trust">
      <div className="wrap">
        {ITEMS.map((item) => (
          <span key={item}>
            <i className="dot" /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
