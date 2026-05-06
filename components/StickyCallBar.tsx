import React, { useState, useEffect } from 'react';

const PHONE_PRIMARY = '+918074799387';
const PHONE_DISPLAY = '+91 80747 99387';

function trackCallClick(eventName: string) {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: eventName });
  }
}

export const StickyCallBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('hero-section');
    if (!heroEl) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero is NOT in view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sticky-call-bar ${visible ? 'sticky-call-bar--visible' : ''}`}
      role="complementary"
      aria-label="Quick call action"
    >
      <a
        href={`tel:${PHONE_PRIMARY}`}
        onClick={() => trackCallClick('call_click_sticky')}
        className="sticky-call-bar__link"
        aria-label={`Call Salsons Retreat at ${PHONE_DISPLAY}`}
        id="sticky-cta-call"
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">call</span>
        <span className="font-bold">Call Now</span>
        <span className="text-sm opacity-90 hidden min-[360px]:inline">{PHONE_DISPLAY}</span>
      </a>
    </div>
  );
};
