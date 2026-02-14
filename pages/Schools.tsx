import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES, INCLUDED_FEATURES } from '../constants';
import { ExperienceCard } from '../components/ExperienceCard';
import { SanctuaryCard } from '../components/SanctuaryCard';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

const inputClass =
  'w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50/80 transition-colors text-base';
const labelClass = 'text-xs font-bold uppercase tracking-wider text-gray-500';

export const Schools: React.FC = () => {
  return (
    <main id="main-content" className="pt-24">
      {/* Hero - full impact like Home */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-primary text-white py-24 lg:py-32 px-6 lg:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg")',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-white/90 text-sm font-bold uppercase tracking-[0.3em] mb-4">For Schools</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            School Picnics & Day Trips
          </h1>
          <div className="w-20 h-1 bg-accent-gold rounded-full mx-auto mt-8" aria-hidden="true" />
          <p className="text-white/95 mt-8 max-w-2xl mx-auto text-xl lg:text-2xl leading-relaxed font-light">
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
      <section className="bg-primary text-white py-24 lg:py-32 px-6 lg:px-12">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-4xl mx-auto text-center space-y-12">
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

      {/* Benefits - larger cards */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <header className="mb-16 max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-primary">What’s included for your trip</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4" aria-hidden="true" />
              <p className="text-lg text-gray-600">Everything you need for a safe, memorable school picnic.</p>
            </header>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: 'pool', title: 'Pool & rain dance', desc: 'Supervised fun in our party pool and rain dance zone. Perfect for students.' },
              { icon: 'restaurant', title: 'Lunch & outdoor play', desc: 'Farm-to-table lunch and space for outdoor games and activities.' },
              { icon: 'park', title: 'Sports, park & nature', desc: 'Children’s park, sports, nature walks, and indoor games. Safe and engaging.' },
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                <div className="text-center p-8 lg:p-10 rounded-2xl bg-background-soft border border-gray-100 hover:shadow-lg transition-shadow">
                  <span className="material-symbols-outlined text-primary text-5xl mb-6" aria-hidden="true">{item.icon}</span>
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Included amenities - like Home */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft" aria-labelledby="school-included-heading">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <header className="mb-16 max-w-2xl">
              <h2 id="school-included-heading" className="text-4xl font-extrabold tracking-tight mb-4">Included in every package</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4" aria-hidden="true" />
              <p className="text-lg text-gray-600">All day pass packages include these amenities. 9 AM to 7 PM.</p>
            </header>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {INCLUDED_FEATURES.slice(0, 8).map((feature, idx) => (
              <AnimateOnScroll key={feature.id} animation="fade-up" delay={idx * 80}>
                <article className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">{feature.description}</p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band - like Home */}
      <section className="relative h-[480px] lg:h-[520px] overflow-hidden flex items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url("https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg")',
          }}
        />
        <div className="relative z-10 max-w-3xl space-y-8">
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">Plan your school picnic</h2>
          <p className="text-white/95 text-lg md:text-xl font-medium max-w-xl mx-auto">Same pricing, safe environment. We’ll confirm your school booking on WhatsApp.</p>
          <Link to="/schools#contact" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-background-soft hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl inline-block">
            Send enquiry
          </Link>
        </div>
      </section>

      {/* Pricing - Day pass */}
      <section id="pricing" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
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
      <section id="rooms" className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft">
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

      {/* Contact + Form - like Home layout with map */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <AnimateOnScroll animation="fade-right">
              <div className="max-w-xl">
                <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Find us here</h2>
                <h3 className="text-4xl font-extrabold tracking-tight mb-8">School trip enquiries</h3>
                <p className="text-lg text-gray-500 mb-10 leading-relaxed">Located ~70 km from Vizag. We’ll confirm your booking on WhatsApp.</p>
                <div className="bg-background-soft rounded-2xl p-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">Salsons Retreat</h4>
                      <p className="text-base text-gray-500 mt-1">Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200" aria-hidden="true" />
                  <div className="flex gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">phone</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">Call or WhatsApp</h4>
                      <p className="text-base text-gray-500 mt-1">
                        <a href="tel:+918074799387" className="text-primary hover:underline">+91 80747 99387</a>
                        <span className="text-gray-300 mx-2">·</span>
                        <a href="tel:+917569242082" className="text-primary hover:underline">+91 75692 42082</a>
                      </p>
                    </div>
                  </div>
                </div>
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
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left">
              <div className="bg-background-soft rounded-2xl p-8 lg:p-10 border border-gray-100">
                <h3 className="text-2xl font-extrabold text-primary mb-2">School trip enquiry</h3>
                <p className="text-gray-600 mb-8">Share your school details and we’ll get back on WhatsApp.</p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="School trip enquiry form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="school-name" className={labelClass}>School name</label>
                      <input id="school-name" type="text" name="school" className={inputClass} placeholder="Your school" required aria-required="true" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="school-contact" className={labelClass}>Contact person</label>
                      <input id="school-contact" type="text" name="contact" className={inputClass} placeholder="Teacher / coordinator" required aria-required="true" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="school-email" className={labelClass}>Email</label>
                      <input id="school-email" type="email" name="email" className={inputClass} placeholder="school@example.com" required aria-required="true" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="school-phone" className={labelClass}>Phone / WhatsApp</label>
                      <input id="school-phone" type="tel" name="phone" defaultValue="+91 " className={inputClass} placeholder="98765 43210" required aria-required="true" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="school-grade" className={labelClass}>Grade / class (optional)</label>
                      <input id="school-grade" type="text" name="grade" className={inputClass} placeholder="e.g. Class 5–7" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="school-students" className={labelClass}>Approx. number of students</label>
                      <input id="school-students" type="number" name="students" min={1} max={500} className={inputClass} placeholder="e.g. 40" required aria-required="true" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="school-date" className={labelClass}>Preferred date</label>
                    <input id="school-date" type="date" name="date" className={inputClass} required aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="school-message" className={labelClass}>Notes (optional)</label>
                    <textarea id="school-message" name="message" rows={4} className={inputClass} placeholder="e.g. Picnic day, need lunch for all, any special requests..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.99]">
                    Send school enquiry
                  </button>
                </form>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
};
