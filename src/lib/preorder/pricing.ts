// Pricing math ported 1:1 from the approved design prototype.
// Exact per-tier price pins (bundle.priceOverride) win over the computed
// discount; savings are measured against the buy-each-vial-separately sum.

import { BUNDLES, TIERS, type Bundle, type TierKey } from './data';

export const usd = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const numWord = (n: number) => WORDS[n] ?? String(n);

/** 50% margin floor for the fallback discount curve. */
const floorPrice = (b: Bundle) => 2 * b.cost;

export function priceFor(b: Bundle, k: TierKey): number {
  const pinned = b.priceOverride?.[k];
  if (pinned != null) return pinned;
  const t = TIERS[k];
  return b.alacarte - t.frac * (b.alacarte - floorPrice(b));
}

/** Buy-each-vial-separately total — the baseline the save chip is measured against. */
export const vialSum = (b: Bundle) => b.items.reduce((s, i) => s + i[1], 0);

const savePinFor = (b: Bundle, k: TierKey) => b.savePin?.[k] ?? null;

export const saveAmount = (b: Bundle, k: TierKey) =>
  savePinFor(b, k)?.[0] ?? vialSum(b) - priceFor(b, k);

export const savePct = (b: Bundle, k: TierKey) =>
  savePinFor(b, k)?.[1] ?? Math.round((1 - priceFor(b, k) / vialSum(b)) * 100);

/** Headline % for a tier: the pinned value, else the best bundle savings. */
export const maxPct = (k: TierKey) =>
  TIERS[k].pinPct ?? Math.max(...BUNDLES.map((b) => savePct(b, k)));

export interface VialRow {
  name: string;
  price: number;
  desc: string;
  included: boolean;
}

/**
 * Rows for a bundle card: the BAC water price is baked equally into the other
 * vials (2-decimal rounding, remainder on the last one) and BAC shows as
 * "Included". The buy-separately total is preserved.
 */
export function vialRows(b: Bundle): VialRow[] {
  const rows: VialRow[] = b.items.map((i) => ({ name: i[0], price: i[1], desc: i[2], included: false }));
  const bac = rows.find((r) => /^BAC Water/i.test(r.name));
  if (bac) {
    const others = rows.filter((r) => r !== bac);
    const share = Math.round((bac.price / others.length) * 100) / 100;
    let acc = 0;
    others.forEach((r) => {
      r.price = Math.round((r.price + share) * 100) / 100;
      acc += share;
    });
    const rem = Math.round((bac.price - acc) * 100) / 100;
    if (rem) {
      const last = others[others.length - 1];
      last.price = Math.round((last.price + rem) * 100) / 100;
    }
    bac.price = 0;
    bac.included = true;
  }
  return rows;
}
