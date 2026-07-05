import type { TierKey } from '@/lib/preorder/data';

// ============================================================
// Campaign knobs — the only file to edit while the pre-order runs.
// Changing ACTIVE_TIER requires a redeploy (site is statically exported).
// ============================================================

// Which tier is currently live? Flip to 'early' / 'preorder' as spots sell out.
export const ACTIVE_TIER: TierKey = 'founding';

// Per-customer reservation cap.
export const MAX_BUNDLES = 3;

// Google Apps Script Web App /exec URL — paste the deployed endpoint here
// (see apps-script/README.md). Public endpoint, not a secret. Until a real
// URL is set, submissions fall back to opening a pre-filled email.
export const FORM_ENDPOINT = '';

export const FALLBACK_EMAIL = 'alex@casalabs.shop';
