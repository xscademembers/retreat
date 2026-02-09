import React from 'react';
import { EXPERIENCE_TIERS } from '../constants';
import { ExperienceCard } from '../components/ExperienceCard';
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
    </main>
  );
};
