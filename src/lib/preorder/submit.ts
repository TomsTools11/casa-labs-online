// Pre-order submission: POST to the configured intake endpoint, with a
// pre-filled email as the no-endpoint / network-failure fallback.

import { ACTIVE_TIER, FALLBACK_EMAIL, FORM_ENDPOINT } from '@/config/preorder';
import { BUNDLES, TIERS, type BundleId } from './data';
import { maxPct, priceFor, usd } from './pricing';

export interface PreorderFields {
  name: string;
  email: string;
  phone: string;
  organization: string;
  notes: string;
  /** Honeypot — real users leave it empty; bot-filled submissions are dropped server-side. */
  company: string;
}

export type Quantities = Record<BundleId, number>;

const NOTES_MAX = 500;

export function orderTotal(qty: Quantities): number {
  return BUNDLES.reduce((s, b) => s + qty[b.id] * priceFor(b, ACTIVE_TIER), 0);
}

export function buildOrderSummary(qty: Quantities): string {
  const t = TIERS[ACTIVE_TIER];
  const lines = BUNDLES.filter((b) => qty[b.id] > 0).map(
    (b) =>
      `${qty[b.id]} x ${b.name} @ ${usd(priceFor(b, ACTIVE_TIER))} = ${usd(qty[b.id] * priceFor(b, ACTIVE_TIER))}`
  );
  return (
    `Tier: ${t.label} (up to ${maxPct(ACTIVE_TIER)}% bundle discount)\n` +
    lines.join('\n') +
    `\nEstimated total: ${usd(orderTotal(qty))}`
  );
}

function buildMailtoUrl(fields: PreorderFields, summary: string): string {
  const t = TIERS[ACTIVE_TIER];
  const body = encodeURIComponent(
    `CASA Labs Pre-Order Request\n\n${summary}\n\n---\nName: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || '-'}\nOrganization: ${fields.organization || '-'}\nNotes: ${fields.notes.slice(0, NOTES_MAX) || '-'}\n\nI confirm these materials are for laboratory research use only.`
  );
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent('Pre-Order Reservation: ' + t.label)}&body=${body}`;
}

export type SubmitMethod = 'endpoint' | 'mailto';

export interface SubmitResult {
  method: SubmitMethod;
  /** Pre-filled order email — lets the UI offer a retry link in mailto mode. */
  mailtoUrl: string;
}

/**
 * Submits the pre-order. Resolves once the request has been handed off —
 * the Apps Script POST is fire-and-forget (no-cors responses are opaque),
 * mirroring the pattern proven by the coming-soon notify form. With no
 * endpoint configured (current pre-launch mode), it opens a pre-filled
 * email instead and reports method: 'mailto' so the UI can tell the
 * visitor to press Send.
 */
export async function submitPreorder(fields: PreorderFields, qty: Quantities): Promise<SubmitResult> {
  const summary = buildOrderSummary(qty);
  const mailtoUrl = buildMailtoUrl(fields, summary);

  if (!FORM_ENDPOINT.startsWith('http')) {
    window.location.href = mailtoUrl;
    return { method: 'mailto', mailtoUrl };
  }

  const t = TIERS[ACTIVE_TIER];
  const payload = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    organization: fields.organization,
    notes: fields.notes.slice(0, NOTES_MAX),
    company: fields.company,
    tier: t.label,
    qty_origin: qty.origin,
    qty_metabolic: qty.metabolic,
    qty_neuro: qty.neuro,
    total: usd(orderTotal(qty)),
    order_summary: summary,
  };

  try {
    // no-cors + text/plain avoids the CORS preflight Apps Script can't answer.
    // The response is opaque, so resolution counts as success.
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return { method: 'endpoint', mailtoUrl };
  } catch {
    window.location.href = mailtoUrl;
    return { method: 'mailto', mailtoUrl };
  }
}
