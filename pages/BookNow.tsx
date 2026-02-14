import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

const DAY_ADDON_PRICE = 2999;
const NIGHT_ROOM_PRICE = 3999;

const inputClass =
  'w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50/80 transition-colors';
const labelClass = 'text-xs font-bold uppercase tracking-wider text-gray-500';

const validPassIds = new Set(EXPERIENCE_TIERS.map((t) => t.id));
const validRoomIds = new Set(SANCTUARIES.map((s) => s.id));

export const BookNow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [visitType, setVisitType] = useState<'day' | 'night' | ''>('');
  const [selectedDayPass, setSelectedDayPass] = useState<string>('');
  const [selectedDayAddon, setSelectedDayAddon] = useState<string>('');
  const [selectedNightRoom, setSelectedNightRoom] = useState<string>('');

  useEffect(() => {
    const visit = searchParams.get('visit');
    const pass = searchParams.get('pass');
    const addon = searchParams.get('addon');
    const room = searchParams.get('room');
    if (visit === 'day') {
      setVisitType('day');
      if (pass && validPassIds.has(pass)) setSelectedDayPass(pass);
      if (addon && validRoomIds.has(addon)) setSelectedDayAddon(addon);
    } else if (visit === 'night') {
      setVisitType('night');
      if (room && validRoomIds.has(room)) setSelectedNightRoom(room);
    }
  }, [searchParams]);

  return (
    <main id="main-content" className="pt-24">
      {/* Page header */}
      <section className="bg-primary text-white py-16 lg:py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/80 text-sm font-bold uppercase tracking-[0.2em] mb-2">Reservations</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Book Your Visit</h1>
          <div className="w-12 h-1 bg-accent-gold rounded-full mx-auto mt-4" aria-hidden="true" />
          <p className="text-white/90 mt-6 max-w-xl mx-auto text-lg">
            Share your details and we’ll confirm your day or night at Salsons Retreat.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Find Us Here — left column */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <AnimateOnScroll animation="fade-right">
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
                    <p className="text-sm text-gray-500 pt-2">
                      ~70 km from Vizag. We’ll confirm your booking on WhatsApp.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </aside>

            {/* Booking form — right column */}
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="fade-left">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="border-l-4 border-primary bg-primary/5 px-6 py-4">
                    <h2 className="text-primary font-bold text-lg">Booking details</h2>
                    <p className="text-gray-600 text-sm mt-0.5">Fill in the form below</p>
                  </div>

                  <form className="p-6 lg:p-8 space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="Booking form">
                    {/* Your details */}
                    <div className="space-y-5">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                        Your details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="book-name" className={labelClass}>Name</label>
                          <input id="book-name" type="text" name="name" className={inputClass} placeholder="Your name" required aria-required="true" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="book-date" className={labelClass}>Entry date</label>
                          <input id="book-date" type="date" name="date" className={inputClass} required aria-required="true" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="book-guests" className={labelClass}>Number of guests</label>
                          <input id="book-guests" type="number" name="guests" min={1} max={50} className={inputClass} placeholder="e.g. 4" required aria-required="true" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="book-phone" className={labelClass}>Phone</label>
                          <input id="book-phone" type="tel" name="phone" defaultValue="+91 " className={inputClass} placeholder="98765 43210" required aria-required="true" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="book-email" className={labelClass}>Email</label>
                        <input id="book-email" type="email" name="email" className={inputClass} placeholder="you@example.com" />
                      </div>
                    </div>

                    {/* Visit type */}
                    <div className="space-y-5">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                        Visit option
                      </h3>
                      <div className="space-y-2">
                        <label htmlFor="book-visit-type" className={labelClass}>Day or night</label>
                        <select
                          id="book-visit-type"
                          name="visitType"
                          value={visitType}
                          onChange={(e) => {
                            const v = e.target.value as 'day' | 'night' | '';
                            setVisitType(v);
                            if (v !== 'day') setSelectedDayPass('');
                            if (v !== 'day') setSelectedDayAddon('');
                            if (v !== 'night') setSelectedNightRoom('');
                          }}
                          className={inputClass}
                          required
                          aria-required="true"
                        >
                          <option value="">Select — Day or Night</option>
                          <option value="day">Day visit</option>
                          <option value="night">Night stay</option>
                        </select>
                      </div>
                    </div>

                    {/* Day: Passes + Add-on */}
                    {visitType === 'day' && (
                      <div className="space-y-6 rounded-xl bg-gray-50/50 p-6 border border-gray-100">
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-primary">Choose your day pass</h4>
                          <input type="hidden" name="dayPass" value={selectedDayPass} />
                          <div className="space-y-3">
                            {EXPERIENCE_TIERS.map((tier) => (
                              <label
                                key={tier.id}
                                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedDayPass === tier.id ? 'border-primary bg-white shadow-md' : 'border-gray-200 bg-white hover:border-primary/40'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="dayPassRadio"
                                  value={tier.id}
                                  checked={selectedDayPass === tier.id}
                                  onChange={() => setSelectedDayPass(tier.id)}
                                  className="sr-only"
                                />
                                <div className="flex items-start gap-3">
                                  <span className="font-bold text-primary text-lg">{tier.name}</span>
                                  <span className="text-gray-600 font-semibold">₹{tier.price.toLocaleString('en-IN')}/person</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{tier.description}</p>
                                <ul className="mt-2 text-sm text-gray-600 space-y-0.5">
                                  {tier.features.slice(0, 3).map((f, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <span className="text-primary">·</span> {f}
                                    </li>
                                  ))}
                                </ul>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-gray-200">
                          <h4 className="text-sm font-bold text-primary">Add-on room for day (optional)</h4>
                          <p className="text-sm text-gray-500">₹{DAY_ADDON_PRICE.toLocaleString('en-IN')} per room for the day.</p>
                          <select
                            name="dayAddon"
                            value={selectedDayAddon}
                            onChange={(e) => setSelectedDayAddon(e.target.value)}
                            className={inputClass}
                          >
                            <option value="">None</option>
                            {SANCTUARIES.map((s) => (
                              <option key={s.id} value={s.id}>{s.name} — ₹{DAY_ADDON_PRICE.toLocaleString('en-IN')} (day)</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Night: Rooms + food note */}
                    {visitType === 'night' && (
                      <div className="space-y-6 rounded-xl bg-gray-50/50 p-6 border border-gray-100">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                          <span className="material-symbols-outlined text-amber-600 shrink-0" aria-hidden="true">info</span>
                          <p>Food is not provided for night stays; it has to be bought separately.</p>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-primary">Choose your room for night stay</h4>
                          <input type="hidden" name="nightRoom" value={selectedNightRoom} />
                          <div className="space-y-3">
                            {SANCTUARIES.map((room) => (
                              <label
                                key={room.id}
                                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  selectedNightRoom === room.id ? 'border-primary bg-white shadow-md' : 'border-gray-200 bg-white hover:border-primary/40'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="nightRoomRadio"
                                  value={room.id}
                                  checked={selectedNightRoom === room.id}
                                  onChange={() => setSelectedNightRoom(room.id)}
                                  className="sr-only"
                                />
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-primary text-lg">{room.name}</span>
                                  {room.tag && (
                                    <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">{room.tag}</span>
                                  )}
                                  <span className="text-gray-600 font-semibold">₹{NIGHT_ROOM_PRICE.toLocaleString('en-IN')} (night)</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{room.description}</p>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Message */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                        Additional notes
                      </h3>
                      <label htmlFor="book-message" className={labelClass}>Message (optional)</label>
                      <textarea id="book-message" name="message" rows={4} className={inputClass} placeholder="Any special requests or notes..."></textarea>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.99]"
                      >
                        Submit booking request
                      </button>
                    </div>
                  </form>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
