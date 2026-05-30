'use client';

import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'casa_notify';

export default function NotifyForm() {
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = inputRef.current;
    const value = (input?.value || '').trim();

    if (!EMAIL_RE.test(value)) {
      input?.focus();
      if (input) input.style.borderColor = 'var(--cl-error)';
      return;
    }

    // Placeholder capture: addresses stash to localStorage only — no backend yet.
    try {
      const list: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!list.includes(value)) list.push(value);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* ignore storage errors */
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
