import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

export const BookNow: React.FC = () => {
  return (
    <main id="main-content" className="pt-24">
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up" className="text-center mb-16">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Reservations</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">Book Your Day at Salsons Retreat</h3>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Fill in the details below. We’ll get back to you on WhatsApp to confirm your visit.</p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <AnimateOnScroll animation="fade-right">
              <div>
                <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Find Us Here</h2>
                <h3 className="text-4xl font-extrabold tracking-tight mb-8">Your Escape Awaits</h3>
                <p className="text-gray-500 mb-10 leading-relaxed">Located in peaceful North Andhra, approximately 70km from Vizag. Contact us on WhatsApp for bookings and assistance.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary" aria-hidden="true">location_on</span>
                    </div>
                    <div>
                      <h5 className="font-bold">Salsons Retreat</h5>
                      <p className="text-sm text-gray-500">Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary" aria-hidden="true">phone</span>
                    </div>
                    <div>
                      <h5 className="font-bold">Call or WhatsApp</h5>
                      <a href="tel:+918074799387" className="text-sm text-gray-500 hover:text-primary">+91 80747 99387</a>
                      <span className="text-gray-400 mx-1">·</span>
                      <a href="tel:+917569242082" className="text-sm text-gray-500 hover:text-primary">+91 75692 42082</a>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                  For general inquiries, <Link to="/#contact" className="text-primary font-medium hover:underline">contact us here</Link>.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left">
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-100">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Booking form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="book-date" className="text-xs font-bold uppercase text-gray-400">Visit Date</label>
                      <input id="book-date" type="date" name="date" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" required aria-required="true" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="book-package" className="text-xs font-bold uppercase text-gray-400">Day Pass Package (Optional)</label>
                      <select id="book-package" name="package" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50">
                        <option value="">Select package</option>
                        {EXPERIENCE_TIERS.map((tier) => (
                          <option key={tier.id} value={tier.id}>{tier.name} — ₹{tier.price.toLocaleString('en-IN')}/person</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="book-guests" className="text-xs font-bold uppercase text-gray-400">Number of Guests</label>
                      <input id="book-guests" type="number" name="guests" min={1} max={50} className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="e.g. 4" required aria-required="true" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="book-addon" className="text-xs font-bold uppercase text-gray-400">Add-on Room (Optional)</label>
                      <select id="book-addon" name="addon" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50">
                        <option value="">None</option>
                        {SANCTUARIES.map((s) => (
                          <option key={s.id} value={s.id}>{s.name} — ₹{s.price.toLocaleString('en-IN')}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="book-name" className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                      <input id="book-name" type="text" name="name" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="John Doe" required aria-required="true" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="book-email" className="text-xs font-bold uppercase text-gray-400">Email Address (Optional)</label>
                      <input id="book-email" type="email" name="email" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="book-phone" className="text-xs font-bold uppercase text-gray-400">Phone / WhatsApp</label>
                    <input id="book-phone" type="tel" name="phone" defaultValue="+91 " className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="98765 43210" required aria-required="true" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="book-message" className="text-xs font-bold uppercase text-gray-400">Special Requests or Notes</label>
                    <textarea id="book-message" name="message" rows={4} className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="Dietary preferences, timings, or any other details..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-bold hover:shadow-lg transition-all active:scale-[0.98]">
                    Send Booking Request
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
