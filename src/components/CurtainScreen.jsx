import { useState, useEffect } from "react";

const TARGET = { hour: 23, minute: 12 };

function msUntilTarget() {
  const now = new Date();
  const t = new Date();
  t.setHours(TARGET.hour, TARGET.minute, 0, 0);
  return Math.max(0, t - now);
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
  const [msLeft, setMsLeft] = useState(msUntilTarget);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    function triggerOpen() {
      setOpening(true);
      setTimeout(onOpen, 1600);
    }

    if (msLeft === 0) {
      const t = setTimeout(triggerOpen, 400);
      return () => clearTimeout(t);
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
        <h2 className="curtain-title">Opens at 11:12 PM</h2>

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
