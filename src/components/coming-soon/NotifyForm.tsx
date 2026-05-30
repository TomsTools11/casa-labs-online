'use client';

import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'casa_notify';
// Google Apps Script Web App /exec URL — paste the deployed endpoint here.
// Public endpoint, not a secret. Until a real URL is set, submissions save to localStorage only.
const NOTIFY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbylIM8u9aZl_BY031eHpyMH7kdG6KXuButjT-LcJ7etABTebK5U5Pgea3GW_753WGc8Bg/exec';

export default function NotifyForm() {
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = inputRef.current;
    const value = (input?.value || '').trim();

    if (!EMAIL_RE.test(value)) {
      input?.focus();
      if (input) input.style.borderColor = 'var(--cl-error)';
      return;
    }

    // Local backup — also keeps a per-browser dedupe list.
    try {
      const list: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!list.includes(value)) list.push(value);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore storage errors */
    }

    // Send to the Google Sheet via the Apps Script Web App. no-cors + text/plain avoids the
    // CORS preflight Apps Script can't answer; fire-and-forget — the UI is optimistic and
    // localStorage is the durable backup. Skipped until a real endpoint is configured above.
    if (NOTIFY_ENDPOINT.startsWith('http')) {
      fetch(NOTIFY_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email: value,
          source: 'coming-soon',
          company: honeypotRef.current?.value || '',
        }),
      }).catch(() => {
        /* optimistic: ignore network errors */
      });
    }

    setDone(true);
  }

  return (
    <div className={`notify${done ? ' done' : ''}`}>
      <div className="label">Be first through the door</div>
      <form className="row" onSubmit={handleSubmit} noValidate>
        <input
          ref={inputRef}
          type="email"
          name="email"
          placeholder="you@institution.edu"
          autoComplete="email"
          required
          onInput={(e) => {
            e.currentTarget.style.borderColor = '';
          }}
        />
        {/* Honeypot: hidden from real users; bot-filled submissions are dropped server-side. */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <button type="submit">Notify Me</button>
      </form>
      <div className="note">
        We&apos;ll send a single message the day the store goes live. No spam.
      </div>
      <div className="success">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        You&apos;re on the list. We&apos;ll be in touch at launch.
      </div>
    </div>
  );
}
