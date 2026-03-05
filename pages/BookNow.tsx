import React from 'react';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { BookingForm } from '../components/BookingForm';

export const BookNow: React.FC = () => {
  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-6xl lg:max-w-7xl mx-auto space-y-10">
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Book Your Visit
            </h1>
            <div className="w-12 h-1 bg-accent-gold rounded-full mx-auto mt-4" aria-hidden="true" />
          </header>
          <div>
            <AnimateOnScroll animation="fade-up">
              <BookingForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
};
