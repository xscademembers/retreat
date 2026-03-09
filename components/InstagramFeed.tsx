import React, { useEffect } from 'react';

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
    <section id="instagram" className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 bg-background-soft">
      <div className="max-w-7xl mx-auto">
        <div
          className="elfsight-app-95885031-20a4-4fed-89c6-ef2cd731bbe9"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};
