'use client';

import { useEffect, useRef, useState } from 'react';
import { ACTIVE_TIER, MAX_BUNDLES } from '@/config/preorder';
import { BUNDLES, type BundleId } from '@/lib/preorder/data';
import { maxPct, priceFor, usd } from '@/lib/preorder/pricing';
import { orderTotal, submitPreorder, type Quantities, type SubmitResult } from '@/lib/preorder/submit';
import SectionHead from './SectionHead';

export default function OrderForm() {
  const [qty, setQty] = useState<Quantities>({ origin: 0, metabolic: 0, neuro: 0 });
  const [ack, setAck] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<SubmitResult | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen readers announce it and the
  // keyboard user isn't stranded when the submit button disables itself.
  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

  const totalQty = qty.origin + qty.metabolic + qty.neuro;
  const total = orderTotal(qty);
  const atMax = totalQty >= MAX_BUNDLES;

  function bump(id: BundleId, d: 1 | -1) {
    setQty((q) => {
      const next = { ...q };
      const tq = q.origin + q.metabolic + q.neuro;
      if (d > 0) {
        if (tq < MAX_BUNDLES && q[id] < MAX_BUNDLES) next[id]++;
      } else if (q[id] > 0) {
        next[id]--;
      }
      return next;
    });
  }

  const submitDisabled = !!sent || sending || totalQty === 0 || !ack;
  const submitLabel = sent
    ? sent.method === 'mailto'
      ? 'Pre-order email prepared ✓'
      : 'Pre-order sent ✓'
    : sending
      ? 'Sending…'
      : totalQty === 0
        ? 'Select at least one bundle'
        : !ack
          ? 'Confirm the research-use acknowledgment'
          : `Reserve ${totalQty} bundle${totalQty > 1 ? 's' : ''} · ${usd(total)}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (totalQty === 0 || sent || sending) return;
    setSending(true);
    const f = e.currentTarget;
    const v = (n: string) => {
      const el = f.elements.namedItem(n);
      return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ? el.value : '';
    };
    try {
      const result = await submitPreorder(
        {
          name: v('name'),
          email: v('email'),
          phone: v('phone'),
          organization: v('organization'),
          notes: v('notes'),
          company: honeypotRef.current?.value ?? '',
        },
        qty
      );
      setSent(result);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="order">
      <div className="wrap">
        <SectionHead eyebrow="Reserve Now" title="Place your pre-order">
          Select your bundles (up to {MAX_BUNDLES} total). We&apos;ll confirm your tier pricing and
          payment details by email.
        </SectionHead>
        <form className="formcard" onSubmit={handleSubmit}>
          <div className="qty-grid" style={{ opacity: sent ? 0.5 : 1 }}>
            {BUNDLES.map((b) => (
              <div key={b.id} className="qrow">
                <div className="qinfo">
                  <div className="qn">{b.name}</div>
                  <div className="qp">
                    {usd(priceFor(b, ACTIVE_TIER))} / bundle · save {maxPct(ACTIVE_TIER)}%
                  </div>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    aria-label={`Decrease ${b.name} quantity`}
                    onClick={() => bump(b.id, -1)}
                  >
                    –
                  </button>
                  <input readOnly value={qty[b.id]} aria-label={`${b.name} quantity`} />
                  <button
                    type="button"
                    aria-label={`Increase ${b.name} quantity`}
                    onClick={() => bump(b.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={`limit-note${atMax ? ' warn' : ''}`} aria-live="polite">
            {atMax
              ? `Maximum of ${MAX_BUNDLES} bundles reached.`
              : `Reserve up to ${MAX_BUNDLES} bundles total, ${MAX_BUNDLES - totalQty} remaining.`}
          </div>
          <div className="totrow">
            <span className="tl">Estimated pre-order total</span>
            <span className="tv">{usd(total)}</span>
          </div>
          <div className="fields">
            <div>
              <label className="fl" htmlFor="po-name">
                Full name
              </label>
              <input id="po-name" className="ti" type="text" name="name" required autoComplete="name" />
            </div>
            <div>
              <label className="fl" htmlFor="po-email">
                Email
              </label>
              <input id="po-email" className="ti" type="email" name="email" required autoComplete="email" />
            </div>
            <div>
              <label className="fl" htmlFor="po-phone">
                Phone (optional)
              </label>
              <input id="po-phone" className="ti" type="tel" name="phone" autoComplete="tel" />
            </div>
            <div>
              <label className="fl" htmlFor="po-org">
                Organization / research entity (optional)
              </label>
              <input id="po-org" className="ti" type="text" name="organization" />
            </div>
            <div className="full">
              <label className="fl" htmlFor="po-notes">
                Notes (optional)
              </label>
              <textarea
                id="po-notes"
                className="ti"
                name="notes"
                maxLength={500}
                placeholder="Shipping questions, quantities beyond the limit, or anything else."
              />
            </div>
          </div>
          {/* Honeypot: hidden from real users; bot-filled submissions are dropped server-side. */}
          <input
            ref={honeypotRef}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <label className="ack">
            <input
              type="checkbox"
              checked={ack}
              onChange={(e) => setAck(e.target.checked)}
            />
            <span>
              I confirm these materials are ordered for laboratory and research use only, not for
              human or veterinary consumption, and I am authorized to purchase research chemicals.
            </span>
          </label>
          <button type="submit" className="submit-btn" disabled={submitDisabled}>
            {submitLabel}
          </button>
          <div className="form-foot">
            Your card is not charged now. This reserves your founding tier price, and we email an
            invoice to confirm.
          </div>
          {/* Live region stays mounted (and never display:none) so the
              confirmation is reliably announced when its content appears. */}
          <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" style={{ outline: 'none' }}>
            {sent &&
              (sent.method === 'mailto' ? (
                <div className="msg ok">
                  Almost done — your email app has opened with your pre-order details. Press Send
                  to complete your reservation. Nothing opened?{' '}
                  <a href={sent.mailtoUrl}>Email your order to alex@casalabs.shop</a>.
                </div>
              ) : (
                <div className="msg ok">
                  Thank you. Your pre-order request has been sent. We&apos;ll be in touch shortly
                  to confirm.
                </div>
              ))}
          </div>
        </form>
      </div>
    </section>
  );
}
