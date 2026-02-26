import React from 'react';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { BookingForm } from '../components/BookingForm';

export const BookNow: React.FC = () => {
  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      <section className="bg-primary text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/80 text-sm font-bold uppercase tracking-[0.2em] mb-2">Reservations</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Book Your Visit</h1>
          <div className="w-12 h-1 bg-accent-gold rounded-full mx-auto mt-4" aria-hidden="true" />
          <p className="text-white/90 mt-6 max-w-xl mx-auto text-lg">
            Share your details and we’ll confirm your day or night at Salsons Retreat.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <AnimateOnScroll animation="fade-up">
              <BookingForm />
            </AnimateOnScroll>
          </div>

          <div>
            <AnimateOnScroll animation="fade-up">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-primary font-bold text-lg">Find Us Here</h2>
                  <p className="text-primary/70 text-sm mt-0.5">Your escape awaits</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Salsons Retreat</p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100" aria-hidden="true" />
                  <div className="flex gap-4">
                    <div className="size-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-xl">phone</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Call or WhatsApp</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        <a href="tel:+918074799387" className="text-primary hover:underline">+91 80747 99387</a>
                        <span className="text-gray-300 mx-1">·</span>
                        <a href="tel:+917569242082" className="text-primary hover:underline">+91 75692 42082</a>
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 pt-2">~70 km from Vizag. We’ll confirm your booking on WhatsApp.</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
};
