'use client';

import { useEffect, useState } from 'react';
import { ACTIVE_TIER } from '@/config/preorder';
import { BUNDLES } from '@/lib/preorder/data';
import { priceFor, saveAmount, savePct, usd, vialRows } from '@/lib/preorder/pricing';
import PeptideTip from './PeptideTip';
import SectionHead from './SectionHead';

export default function BundleGrid() {
  // Which peptide bubble is open (tap/keyboard) — at most one across all cards.
  const [openTip, setOpenTip] = useState<string | null>(null);

  useEffect(() => {
    // Next.js hydrates React at the document, so stopPropagation() inside a
    // peptide's onClick cannot shield this document-level listener — both are
    // registered on the same node. Guard by click origin instead.
    const close = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('.peptide')) return;
      setOpenTip((t) => (t ? null : t));
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <section id="bundles" style={{ paddingTop: 8 }}>
      <div className="wrap">
        <SectionHead eyebrow="The Collection" title="Choose your research bundles">
          Every bundle includes bacteriostatic water. Prices shown reflect the current active tier.
        </SectionHead>
        <div className="bundles">
          {BUNDLES.map((b) => {
            const now = priceFor(b, ACTIVE_TIER);
            return (
              <div key={b.id} className="bundle">
                <div className="cap">
                  <div className="name">{b.name}</div>
                  <div className="tag">{b.tag}</div>
                </div>
                <ul>
                  {vialRows(b).map((r, i) => {
                    const tipId = `${b.id}-${i}`;
                    return (
                      <li key={r.name}>
                        <span className="comp">
                          <PeptideTip
                            tipId={tipId}
                            name={r.name}
                            desc={r.desc}
                            open={openTip === tipId}
                            onToggle={() =>
                              setOpenTip((t) => (t === tipId ? null : tipId))
                            }
                          />
                        </span>
                        <span className={`vial${r.included ? ' inc' : ''}`}>
                          {r.included ? 'Included' : `${usd(r.price)} / vial`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="price-box">
                  <div className="pb-orig">
                    <span className="pb-lbl">Bundle Full Price:</span>
                    <span className="retail">{usd(b.alacarte)}</span>
                  </div>
                  <div className="now">
                    {usd(now)}
                    <small> / bundle</small>
                  </div>
                  <span className="save">
                    Save {usd(saveAmount(b, ACTIVE_TIER))} · {savePct(b, ACTIVE_TIER)}% off
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
