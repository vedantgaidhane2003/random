import { useState, useEffect } from "react";

// Aug 13 at 12:00 AM (midnight start of Aug 13)
const TARGET = new Date(2026, 7, 13, 0, 0, 0, 0);

function msUntilTarget() {
  return Math.max(0, TARGET - new Date());
}

function Unit({ value, label }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-value">{String(value).padStart(2, "0")}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function CurtainScreen({ onOpen }) {
  // Track whether time was already past on mount — if so, only show button (no auto-open)
  const [msLeft, setMsLeft] = useState(msUntilTarget);
  const [alreadyPast] = useState(() => msUntilTarget() === 0);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (alreadyPast) return;

    function triggerOpen() {
      setMsLeft(0);
      setOpening(true);
      setTimeout(onOpen, 1600);
    }

    const id = setInterval(() => {
      const left = msUntilTarget();
      setMsLeft(left);
      if (left === 0) {
        clearInterval(id);
        triggerOpen();
      }
    }, 500);

    return () => clearInterval(id);
  }, []);

  const h = Math.floor(msLeft / 3_600_000);
  const m = Math.floor((msLeft % 3_600_000) / 60_000);
  const s = Math.floor((msLeft % 60_000) / 1_000);

  const isPast = msLeft === 0;

  function handleReveal() {
    setOpening(true);
    setTimeout(onOpen, 1600);
  }

  return (
    <div className={`curtain-wrapper${opening ? " curtain-opening" : ""}`}>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />

      <div className={`curtain-content${opening ? " curtain-content-fade" : ""}`}>
        <p className="curtain-eyebrow">✨ Something special awaits ✨</p>
        <h2 className="curtain-title">Opens at 12:00 AM</h2>

        {isPast ? (
          <button className="curtain-reveal-btn" onClick={handleReveal}>
            Open your surprise 🎁
          </button>
        ) : (
          <div className="countdown">
            <Unit value={h} label="hrs" />
            <span className="countdown-sep">:</span>
            <Unit value={m} label="min" />
            <span className="countdown-sep">:</span>
            <Unit value={s} label="sec" />
          </div>
        )}

        <p className="curtain-hint">Tonight, just for you 🎂</p>
      </div>
    </div>
  );
}
