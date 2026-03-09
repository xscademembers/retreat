import React, { useEffect, useRef } from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';

export const InstagramFeed: React.FC = () => {
  useEffect(() => {
    const existing = document.querySelector('script[src*="elfsightcdn.com/platform.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="instagram" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll animation="fade-up">
          <header className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
              Follow Us on Instagram
            </h2>
            <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-xl mx-auto">
              Watch our latest reels and stay updated with life at Salsons Retreat.
            </p>
          </header>
        </AnimateOnScroll>
        <div
          className="elfsight-app-95885031-20a4-4fed-89c6-ef2cd731bbe9"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};
