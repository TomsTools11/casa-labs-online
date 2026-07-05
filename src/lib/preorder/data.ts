// Pre-order tiers and bundle catalog, ported verbatim from the approved
// "Pre-Launch Bundles" design (Claude Design handoff). Prices match
// "Final Bundle Pre-Order Discounts" — priceOverride pins are authoritative.

export type TierKey = 'founding' | 'early' | 'preorder';
export type BundleId = 'origin' | 'metabolic' | 'neuro';

export interface Tier {
  label: string;
  /** Fixed headline discount % shown in the tier ladder. */
  pinPct: number;
  /** Fraction of the max safe discount — fallback pricing when a bundle has no priceOverride pin. */
  frac: number;
  who: string;
  spots: string;
  liveSpots: string;
  order: 1 | 2 | 3;
}

export type BundleItem = readonly [name: string, vialPrice: number, desc: string];

export interface Bundle {
  id: BundleId;
  name: string;
  tag: string;
  /** Bundle full price — shown struck through on the card. */
  alacarte: number;
  /** Fully loaded cost; 2 × cost is the 50%-margin floor for fallback pricing. */
  cost: number;
  /** Exact per-tier price pins — win over the computed discount. */
  priceOverride?: Partial<Record<TierKey, number>>;
  /** Optional per-tier save-chip pins [amount, pct] — win over computed savings. */
  savePin?: Partial<Record<TierKey, readonly [number, number]>>;
  items: readonly BundleItem[];
}

export const TIERS: Record<TierKey, Tier> = {
  founding: { label: 'Founding 10', pinPct: 55, frac: 1.2983, who: 'First 10 customers', spots: 'Only 10 spots', liveSpots: '10 Spots', order: 1 },
  early:    { label: 'Early 50',    pinPct: 40, frac: 0.9443, who: 'Next 50 customers',  spots: '50 spots', liveSpots: '50 Spots', order: 2 },
  preorder: { label: 'Pre-Order',   pinPct: 20, frac: 0.4721, who: 'All other pre-orders', spots: 'Open', liveSpots: 'Open', order: 3 },
};

export const BAC =
  'Sterile bacteriostatic water, the diluent used to reconstitute lyophilized research compounds.';

export const BUNDLES: readonly Bundle[] = [
  {
    id: 'origin',
    name: 'Origin',
    tag: 'Longevity & foundational recovery',
    alacarte: 120.99,
    cost: 40.92,
    priceOverride: { founding: 63.99, early: 85.99, preorder: 113.99 },
    items: [
      ['GLOW 70mg', 63.0, 'A proprietary blend of BPC-157, TB-500, and GHK-Cu, studied together in tissue-repair and regenerative research.'],
      ['Epithalon 10mg', 23.0, 'A synthetic tetrapeptide investigated in research for its influence on telomerase activity and cellular aging.'],
      ['NAD+ 100mg', 48.0, 'A coenzyme central to cellular energy metabolism, widely used in mitochondrial and longevity research.'],
      ['BAC Water 10mL', 7.99, BAC],
    ],
  },
  {
    id: 'metabolic',
    name: 'Metabolic',
    tag: 'Metabolic & growth support',
    alacarte: 107.99,
    cost: 41.72,
    priceOverride: { founding: 57.99, early: 76.99, preorder: 101.99 },
    items: [
      ['Tesamorelin 10mg', 28.0, 'A growth-hormone-releasing-hormone analog studied in research for its effects on GH secretion and visceral fat.'],
      ['Ipamorelin 10mg', 48.0, 'A selective growth-hormone secretagogue peptide studied for stimulating GH release in laboratory models.'],
      ['MOTS-C 10mg', 43.0, 'A mitochondrial-derived peptide investigated in research for its role in metabolism and insulin sensitivity.'],
      ['BAC Water 10mL', 7.99, BAC],
    ],
  },
  {
    id: 'neuro',
    name: 'Neuro',
    tag: 'Cognitive & neuro research',
    alacarte: 61.99,
    cost: 31.52,
    priceOverride: { founding: 32.99, early: 43.99, preorder: 57.99 },
    items: [
      ['Selank 11mg', 23.0, 'A synthetic peptide studied in research for its effects on anxiety-related pathways and neurotransmission.'],
      ['Semax 10mg', 18.0, 'A synthetic peptide investigated in research for its effects on focus, memory, and neuroprotection.'],
      ['DSIP 15mg', 23.0, 'Delta sleep-inducing peptide, studied in research for its role in sleep regulation and the stress response.'],
      ['BAC Water 10mL', 7.99, BAC],
    ],
  },
];
