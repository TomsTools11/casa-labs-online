import { ACTIVE_TIER, MAX_BUNDLES } from '@/config/preorder';
import { TIERS, type TierKey } from '@/lib/preorder/data';
import { maxPct } from '@/lib/preorder/pricing';
import SectionHead from './SectionHead';

export default function TierLadder() {
  const active = TIERS[ACTIVE_TIER];

  return (
    <section id="tiers">
      <div className="wrap">
        <SectionHead eyebrow="Pre-Order Pricing" title="The earlier you reserve, the more you save">
          Founding pricing is released in limited tiers. Each customer may reserve up to{' '}
          <strong>{MAX_BUNDLES} bundles</strong>. Pricing is applied by order sequence.
        </SectionHead>
        <div className="tiers">
          {(Object.entries(TIERS) as [TierKey, (typeof TIERS)[TierKey]][]).map(([k, t]) => {
            const isActive = k === ACTIVE_TIER;
            const isClosed = t.order < active.order;
            const spot = isActive ? `Live Now ⋅ ${t.liveSpots}` : isClosed ? 'Sold out' : t.spots;
            return (
              <div key={k} className={`tier${isActive ? ' active' : ''}${isClosed ? ' closed' : ''}`}>
                {isActive && <span className="pill">Active Now</span>}
                <h3>{t.label}</h3>
                <div className="off">
                  {maxPct(k)}%<small> bundle discount</small>
                </div>
                <div className="who">
                  {t.who} · up to {MAX_BUNDLES} bundles
                </div>
                <span className="spots">{spot}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
