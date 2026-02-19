import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';

const DAY_ADDON_PRICE = 2999;
const NIGHT_ROOM_PRICE = 3999;
const NIGHT_EXTRA_PERSON_PRICE = 999;

const inputClass =
  'w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50/80 transition-colors';
const labelClass = 'text-xs font-bold uppercase tracking-wider text-gray-500';

const validPassIds = new Set(EXPERIENCE_TIERS.map((t) => t.id));
const validRoomIds = new Set(SANCTUARIES.map((s) => s.id));

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [visitType, setVisitType] = useState<'day' | 'night' | ''>('');
  const [dayPassGuests, setDayPassGuests] = useState<Record<string, number>>({ basic: 0, value: 0, adventure: 0 });
  const [selectedDayAddon, setSelectedDayAddon] = useState<string>('');
  const [selectedNightRoom, setSelectedNightRoom] = useState<string>('');
  const [nightExtraPersons, setNightExtraPersons] = useState(0);

  useEffect(() => {
    const visit = searchParams.get('visit');
    const pass = searchParams.get('pass');
    const addon = searchParams.get('addon');
    const room = searchParams.get('room');
    if (visit === 'day') {
      setVisitType('day');
      if (pass && validPassIds.has(pass)) setDayPassGuests((prev) => ({ ...prev, [pass]: 1 }));
      if (addon && validRoomIds.has(addon)) setSelectedDayAddon(addon);
    } else if (visit === 'night') {
      setVisitType('night');
      if (room && validRoomIds.has(room)) setSelectedNightRoom(room);
    }
  }, [searchParams]);

  const setDayPassGuest = (tierId: string, count: number) => {
    setDayPassGuests((prev) => ({ ...prev, [tierId]: count < 0 ? 0 : count }));
  };

  const toggleDayPass = (tierId: string) => {
    setDayPassGuests((prev) => ({
      ...prev,
      [tierId]: prev[tierId] && prev[tierId] > 0 ? 0 : 1,
    }));
  };

  const totalAmount = useMemo(() => {
    if (visitType === 'day') {
      let sum = 0;
      EXPERIENCE_TIERS.forEach((tier) => {
        const guests = dayPassGuests[tier.id] || 0;
        if (guests > 0) sum += tier.price * guests;
      });
      if (selectedDayAddon) sum += DAY_ADDON_PRICE;
      return sum;
    }
    if (visitType === 'night' && selectedNightRoom) {
      return NIGHT_ROOM_PRICE + nightExtraPersons * NIGHT_EXTRA_PERSON_PRICE;
    }
    return 0;
  }, [visitType, dayPassGuests, selectedDayAddon, selectedNightRoom, nightExtraPersons]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="border-l-4 border-primary bg-primary/5 px-4 sm:px-6 py-4">
        <h2 className="text-primary font-bold text-base sm:text-lg">Booking details</h2>
        <p className="text-gray-600 text-sm mt-0.5">Fill in the form below</p>
      </div>

      <form className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="Booking form">
        <div className="space-y-4 sm:space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">Your details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <label htmlFor="book-name" className={labelClass}>Name</label>
              <input id="book-name" type="text" name="name" className={inputClass} placeholder="Your name" required aria-required="true" />
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

        <div className="space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">Visit option</h3>
          <div className="space-y-2">
            <label htmlFor="book-visit-type" className={labelClass}>Day or night</label>
            <select
              id="book-visit-type"
              name="visitType"
              value={visitType}
              onChange={(e) => {
                const v = e.target.value as 'day' | 'night' | '';
                setVisitType(v);
                if (v !== 'day') setDayPassGuests({ basic: 0, value: 0, adventure: 0 });
                if (v !== 'day') setSelectedDayAddon('');
                if (v !== 'night') setSelectedNightRoom('');
                if (v !== 'night') setNightExtraPersons(0);
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

        {visitType === 'day' && (
          <div className="space-y-6 rounded-xl bg-gray-50/50 p-4 sm:p-6 border border-gray-100">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-primary">Choose day pass(es) — select one or more</h4>
              <div className="space-y-4">
                {EXPERIENCE_TIERS.map((tier) => {
                  const guests = dayPassGuests[tier.id] ?? 0;
                  const isSelected = guests > 0;
                  return (
                    <div
                      key={tier.id}
                      className={`rounded-xl border-2 transition-all ${isSelected ? 'border-primary bg-white shadow-md' : 'border-gray-200 bg-white'}`}
                    >
                      <label className="block p-4 cursor-pointer">
                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            type="checkbox"
                            name="dayPass"
                            value={tier.id}
                            checked={isSelected}
                            onChange={() => toggleDayPass(tier.id)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="font-bold text-primary text-lg">{tier.name}</span>
                          <span className="text-gray-600 font-semibold">₹{tier.price.toLocaleString('en-IN')}/person</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 ml-6">{tier.description}</p>
                        <ul className="mt-2 ml-6 space-y-1 text-sm text-gray-600">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-primary">·</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </label>
                      {isSelected && (
                        <div className="px-4 pb-4 pt-0 flex flex-wrap items-center gap-4 border-t border-gray-100 mt-0 pt-4">
                          <span className="text-sm font-medium text-gray-600">No. of guests</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setDayPassGuest(tier.id, guests - 1)}
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                              aria-label={`Decrease guests for ${tier.name}`}
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center font-semibold">{guests}</span>
                            <button
                              type="button"
                              onClick={() => setDayPassGuest(tier.id, guests + 1)}
                              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                              aria-label={`Increase guests for ${tier.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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

        {visitType === 'night' && (
          <div className="space-y-6 rounded-xl bg-gray-50/50 p-4 sm:p-6 border border-gray-100">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <span className="material-symbols-outlined text-amber-600 shrink-0" aria-hidden="true">info</span>
              <p>Food is not provided for night stays; it has to be bought separately. Max 3 persons per room included; extra person ₹{NIGHT_EXTRA_PERSON_PRICE.toLocaleString('en-IN')}.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-primary">Choose your room for night stay</h4>
              <input type="hidden" name="nightRoom" value={selectedNightRoom} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
                {SANCTUARIES.map((room) => (
                  <label
                    key={room.id}
                    className={`rounded-xl border-2 overflow-hidden cursor-pointer transition-all block ${
                      selectedNightRoom === room.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/40'
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
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-primary">{room.name}</span>
                        {room.tag && <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">{room.tag}</span>}
                      </div>
                      <p className="text-gray-600 font-semibold mt-1">₹{NIGHT_ROOM_PRICE.toLocaleString('en-IN')} (3 persons)</p>
                    </div>
                  </label>
                ))}
              </div>
              {selectedNightRoom && (
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Extra persons (₹{NIGHT_EXTRA_PERSON_PRICE.toLocaleString('en-IN')}/person)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNightExtraPersons((n) => (n > 0 ? n - 1 : 0))}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                      aria-label="Decrease extra persons"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center font-semibold">{nightExtraPersons}</span>
                    <button
                      type="button"
                      onClick={() => setNightExtraPersons((n) => n + 1)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                      aria-label="Increase extra persons"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="book-date" className={labelClass}>Entry date</label>
          <input id="book-date" type="date" name="date" className={inputClass} required aria-required="true" />
        </div>

        {totalAmount > 0 && (
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-primary mb-1">Total amount</p>
            <p className="text-3xl font-extrabold text-primary">₹{totalAmount.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-500 mt-1">Calculated from your selection. We’ll confirm on WhatsApp.</p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full min-h-[48px] sm:min-h-[52px] bg-primary text-white py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.99]"
          >
            Submit booking request
          </button>
        </div>
      </form>
    </div>
  );
};
