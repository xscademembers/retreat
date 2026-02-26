import React from 'react';
import { AMENITIES, INCLUDED_FEATURES } from '../constants';
import { AmenitySection } from '../components/AmenitySection';
import { AmenityTabs } from '../components/AmenityTabs';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

export const Amenities: React.FC = () => {
  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      {/* Hero / Intro */}
      <section className="bg-primary text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-white/80 text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
            Amenities
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Everything included in your day at Salsons Retreat
          </h1>
          <div className="w-20 h-1 bg-accent-gold rounded-full mx-auto" aria-hidden="true" />
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Explore all experiences across our 6-acre retreat—from boating and pools to sports, walks,
            kids’ spaces, indoor games, and more.
          </p>
        </div>
      </section>

      {/* Highlighted amenities (story sections) */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background-soft">
        {AMENITIES.map((amenity, index) => (
          <AnimateOnScroll
            key={amenity.id}
            animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            <AmenitySection amenity={amenity} reverse={index % 2 !== 0} />
          </AnimateOnScroll>
        ))}
      </section>

      {/* Included amenities tabs (same as Home, but dedicated section) */}
      <section
        className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white"
        aria-labelledby="amenities-included-heading"
      >
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <header className="mb-10 sm:mb-16 max-w-2xl">
              <h2
                id="amenities-included-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
              >
                Included Amenities
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4" aria-hidden="true" />
              <p className="text-gray-600">
                All day pass packages include access to these amenities. Enjoy our 6-acre farm stay
                from 9 AM to 7 PM.
              </p>
            </header>
          </AnimateOnScroll>
          <AmenityTabs features={INCLUDED_FEATURES} />
        </div>
      </section>
    </main>
  );
};

