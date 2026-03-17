import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main
      id="main-content"
      className="pt-20 sm:pt-24 min-h-[70vh] flex items-center justify-center bg-background-soft px-4 sm:px-6 lg:px-12"
    >
      <section className="w-full max-w-3xl mx-auto text-center">
        <p className="text-primary/60 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4">
          Error 404
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          This page is taking a day off
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
          The link you tried to open does not exist. It may have moved or the URL might be typed
          incorrectly. Let&apos;s take you back to your escape at Salsons Retreat.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary text-white px-8 py-3 text-sm sm:text-base font-bold tracking-wide hover:bg-primary/90 transition-colors min-h-[44px]"
          >
            Back to Home
          </Link>
          <Link
            to="/book-now"
            className="inline-flex items-center justify-center rounded-full border border-primary/30 text-primary px-8 py-3 text-sm sm:text-base font-semibold hover:bg-primary/5 transition-colors min-h-[44px]"
          >
            Book your visit
          </Link>
        </div>
      </section>
    </main>
  );
};

