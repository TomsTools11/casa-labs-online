import type { TierKey } from '@/lib/preorder/data';

// ============================================================
// Campaign knobs — the only file to edit while the pre-order runs.
// Changing ACTIVE_TIER requires a redeploy (site is statically exported).
// ============================================================

// Which tier is currently live? Flip to 'early' / 'preorder' as spots sell out.
export const ACTIVE_TIER: TierKey = 'founding';

// Per-customer reservation cap.
export const MAX_BUNDLES = 3;

// Pre-launch mode: left empty on purpose — the form runs off a pre-filled
// email (mailto) to FALLBACK_EMAIL. When the real order pipeline lands at
// launch, paste a Google Apps Script Web App /exec URL here (see
// apps-script/README.md) or swap in the new endpoint. Not a secret.
export const FORM_ENDPOINT = '';

export const FALLBACK_EMAIL = 'alex@casalabs.shop';
