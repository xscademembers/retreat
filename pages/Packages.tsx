import React from 'react';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';
import { ExperienceCard } from '../components/ExperienceCard';
import { SanctuaryCard } from '../components/SanctuaryCard';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

export const Packages: React.FC = () => {
  return (
    <main id="main-content">
      <section id="packages" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Day Pass Packages</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Your Perfect Daycation Awaits</h3>
            <p className="text-gray-600">Unwind, explore, and recharge in a premium resort experience—without an overnight stay. Choose the package that fits your day.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {EXPERIENCE_TIERS.map((tier, idx) => (
              <AnimateOnScroll key={tier.id} animation="fade-up" delay={idx * 100} className="h-full">
                <ExperienceCard tier={tier} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="sanctuaries" className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em]">Day Pass Add-Ons</h2>
                <h3 className="text-4xl font-extrabold tracking-tight">Add Rooms to Your Day Pass</h3>
              </div>
              <p className="max-w-md text-gray-500">Add rooms to your day pass package for extra comfort. All add-ons available 11 am to 7 pm. Night stays also available—see prices below.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SANCTUARIES.map((item, idx) => (
              <AnimateOnScroll key={item.id} animation="fade-up" delay={idx * 120} className="h-full">
                <SanctuaryCard sanctuary={item} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
