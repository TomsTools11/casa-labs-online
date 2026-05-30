'use client';

import { useEffect, useState } from 'react';

// Launch moment: July 1, 2026 at 09:00 in the visitor's local time
// (parsed without a timezone, matching the original design).
const LAUNCH = new Date('2026-07-01T09:00:00').getTime();

const pad = (n: number) => (n < 10 ? '0' : '') + n;

type Parts = { d: string; h: string; m: string; s: string };
const PLACEHOLDER: Parts = { d: '--', h: '--', m: '--', s: '--' };

function compute(): Parts {
  let diff = LAUNCH - Date.now();
  if (diff < 0) diff = 0;
  const total = Math.floor(diff / 1000);
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor((total % 86400) / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  };
}

export default function Countdown() {
  // Render placeholders on the server / first paint, then tick on the client.
  // Avoids hydration mismatch and a build-time-baked date in the static export.
  const [parts, setParts] = useState<Parts>(PLACEHOLDER);

  useEffect(() => {
    setParts(compute());
    const id = setInterval(() => setParts(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" role="timer" aria-live="off">
      <div className="unit"><div className="num">{parts.d}</div><div className="label">Days</div></div>
      <div className="unit"><div className="num">{parts.h}</div><div className="label">Hours</div></div>
      <div className="unit"><div className="num">{parts.m}</div><div className="label">Minutes</div></div>
      <div className="unit"><div className="num">{parts.s}</div><div className="label">Seconds</div></div>
    </div>
  );
}
