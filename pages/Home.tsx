import React from 'react';
import { INCLUDED_FEATURES } from '../constants';
import { Hero } from '../components/Hero';
import { AmenityTabs } from '../components/AmenityTabs';
import { Testimonials } from '../components/Testimonials';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

export const Home: React.FC = () => {
  return (
    <main id="main-content">
      <section id="hero">
        <Hero />
      </section>

      <section id="sanctuary" className="bg-primary text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">
              Why Visit Salsons Retreat?
            </span>
            <h2 className="text-3xl lg:text-5xl font-semibold leading-snug">
              Escape the city. Relax in nature.
            </h2>
            <div className="w-20 h-px bg-white/30 mx-auto" aria-hidden="true" />

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2 text-sm sm:text-base">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">
                  directions_car
                </span>
                <span className="font-medium">80 min from Vizag</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2 text-sm sm:text-base">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">
                  distance
                </span>
                <span className="font-medium">30 min from Vizianagaram</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2 text-sm sm:text-base">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">
                  nature
                </span>
                <span className="font-medium">6 acre farm stay</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">
                  child_care
                </span>
                <span className="text-sm font-medium">Complimentary for kids under 5 yrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">
                  schedule
                </span>
                <span className="text-sm font-medium">9 AM – 7 PM · Available all days</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section id="included-amenities" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white" aria-labelledby="included-heading">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <header className="mb-10 sm:mb-16 max-w-2xl">
              <h2 id="included-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Amenities</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4"></div>
              <p className="text-gray-600">All packages include access to these amenities. Enjoy our 6-acre farm stay from 9 AM to 7 PM.</p>
            </header>
          </AnimateOnScroll>
          <AmenityTabs features={INCLUDED_FEATURES} />
        </div>
      </section>

      <Testimonials />

      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <AnimateOnScroll animation="fade-right">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Find Us Here</h2>
              <h3 className="text-4xl font-extrabold tracking-tight mb-4">Your Escape Awaits</h3>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" aria-hidden="true" />
              <p className="text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">Located in peaceful North Andhra, approximately 70km from Vizag. Contact us on WhatsApp for bookings and assistance.</p>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 text-left w-full max-w-md mx-auto sm:mx-0 sm:inline-block">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-1">Salsons Retreat</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100" aria-hidden="true" />
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-2xl">phone</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-1">Call or WhatsApp</h4>
                      <p className="text-sm text-gray-500">
                        <a href="tel:+918074799387" className="hover:text-primary transition-colors">+91 80747 99387</a>
                        <span className="text-gray-300 mx-2">·</span>
                        <a href="tel:+917569242082" className="hover:text-primary transition-colors">+91 75692 42082</a>
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href="/book-now"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left">
            <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white aspect-[4/3] min-h-[280px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.9033241741204!2d83.2187149!3d18.168366900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bc263d91a65e9%3A0x3b1d67813f341ee4!2sSalsons%20Retreat!5e0!3m2!1sen!2sin!4v1771088032329!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salsons Retreat location on Google Maps"
              />
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
};
