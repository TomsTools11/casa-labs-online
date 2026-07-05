'use client';

// Peptide name with an info bubble: hover reveal is pure CSS; click/tap or
// Enter/Space toggles the `open` class (touch + keyboard); Escape closes and
// keeps focus on the trigger. The bubble is linked via aria-describedby so
// screen readers announce the description on focus.

export default function PeptideTip({
  tipId,
  name,
  desc,
  open,
  onToggle,
}: {
  tipId: string;
  name: string;
  desc: string;
  open: boolean;
  onToggle: () => void;
}) {
  const bubbleId = `tip-${tipId}`;
  return (
    <span
      className={`peptide${open ? ' open' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={`${name} details`}
      aria-expanded={open}
      aria-describedby={bubbleId}
      onClick={(e) => {
        // Keep the click from reaching the document listener that closes tips.
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }
        if (e.key === 'Escape' && open) {
          onToggle();
        }
      }}
    >
      {name}
      <span className="ic" aria-hidden="true">
        i
      </span>
      <span className="bubble" role="tooltip" id={bubbleId}>
        {desc}
      </span>
    </span>
  );
}
