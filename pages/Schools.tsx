import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES, INCLUDED_FEATURES } from '../constants';
import { ExperienceCard } from '../components/ExperienceCard';
import { SanctuaryCard } from '../components/SanctuaryCard';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { AmenityTabs } from '../components/AmenityTabs';
import { BookingForm } from '../components/BookingForm';

export const Schools: React.FC = () => {
  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      {/* Hero - full impact like Home */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center bg-primary text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg")',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-white/90 text-sm font-bold uppercase tracking-[0.3em] mb-4">For Schools</p>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            School Picnics & Day Trips
          </h1>
          <div className="w-20 h-1 bg-accent-gold rounded-full mx-auto mt-8" aria-hidden="true" />
          <p className="text-white/95 mt-6 sm:mt-8 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl leading-relaxed font-light px-1">
            Bring your students for a safe, fun day out. Same pricing—pool, lunch, sports, and nature. Perfect for school picnics and educational trips near Vizag.
          </p>
          <Link
            to="/schools#contact"
            className="inline-block mt-10 bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-background-soft hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Why Schools - full-width band like Home */}
      <section className="bg-primary text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Why Schools Love Us</span>
            <h2 className="text-3xl lg:text-5xl font-semibold leading-snug">
              Safe & fun for children
            </h2>
            <div className="w-20 h-px bg-white/30 mx-auto" aria-hidden="true" />
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed max-w-2xl mx-auto">
              A 6-acre retreat with pool, rain dance, sports, and nature walks. Farm-to-table lunch, children’s park, and indoor games. We’ve hosted school groups—complimentary for kids under 5. Ideal for picnics and day trips.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-gold text-2xl" aria-hidden="true">child_care</span>
                <span className="text-base font-medium">Kids under 5 complimentary</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent-gold text-2xl" aria-hidden="true">schedule</span>
                <span className="text-base font-medium">9 AM – 7 PM · All days</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Included amenities - tabs with images (same as Home) */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft" aria-labelledby="school-included-heading">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <header className="mb-10 sm:mb-16 max-w-2xl">
              <h2 id="school-included-heading" className="text-4xl font-extrabold tracking-tight mb-4">Included in every package</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4" aria-hidden="true" />
              <p className="text-lg text-gray-600">All day pass packages include these amenities. 9 AM to 7 PM.</p>
            </header>
          </AnimateOnScroll>
          <AmenityTabs features={INCLUDED_FEATURES} />
        </div>
      </section>

      {/* Pricing - Day pass */}
      <section id="pricing" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up" className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Same pricing for schools</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">Day pass packages</h3>
            <p className="text-lg text-gray-600">Per person. Kids under 5 complimentary. All include pool, lunch, sports, and more.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {EXPERIENCE_TIERS.map((tier, idx) => (
              <AnimateOnScroll key={tier.id} animation="fade-up" delay={idx * 100} className="h-full">
                <ExperienceCard tier={tier} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Rooms */}
      <section id="rooms" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em]">Add-ons for your trip</h2>
                <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Rooms & cabanas</h3>
              </div>
              <p className="max-w-lg text-lg text-gray-500">Add rooms for rest or breakouts. Same rates for day or night.</p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {SANCTUARIES.map((item, idx) => (
              <AnimateOnScroll key={item.id} animation="fade-up" delay={idx * 120} className="h-full">
                <SanctuaryCard sanctuary={item} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Book Now form - same as Book Now page */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <AnimateOnScroll animation="fade-right">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                    <h2 className="text-primary font-bold text-lg">Find Us Here</h2>
                    <p className="text-primary/70 text-sm mt-0.5">School trip enquiries — your escape awaits</p>
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
              <div className="mt-8 w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 aspect-[4/3] min-h-[240px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.9033241741204!2d83.2187149!3d18.168366900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bc263d91a65e9%3A0x3b1d67813f341ee4!2sSalsons%20Retreat!5e0!3m2!1sen!2sin!4v1771088032329!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Salsons Retreat location"
                />
              </div>
            </aside>

            <div className="lg:col-span-8">
              <AnimateOnScroll animation="fade-left">
                <BookingForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
