import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';

const EXTRA_PERSON_PRICE = 999;
const MAX_ROOMS_PER_TYPE = 2;
const DORM_DAY_PRICE = 1999;
const DORM_NIGHT_PRICE = 1999;

const ROOM_CONFIG: Record<string, { defaultPerRoom: number; maxExtraPerRoom: number; hasDorm?: boolean }> = {
  cabana: { defaultPerRoom: 3, maxExtraPerRoom: 2 },
  villa: { defaultPerRoom: 3, maxExtraPerRoom: 2 },
  cottage: { defaultPerRoom: 2, maxExtraPerRoom: 1, hasDorm: true },
};

const inputClass =
  'w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50/80 transition-colors';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

const validPassIds = new Set(EXPERIENCE_TIERS.map((t) => t.id));
const validRoomIds = new Set(SANCTUARIES.map((s) => s.id));
const initialDayAddonRooms: Record<string, number> = SANCTUARIES.reduce((acc, s) => ({ ...acc, [s.id]: 0 }), {});

function Stepper({
  value,
  min,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
        aria-label={`Decrease ${ariaLabel}`}
      >
        −
      </button>
      <span className="min-w-[2rem] text-center font-bold text-lg" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
        aria-label={`Increase ${ariaLabel}`}
      >
        +
      </button>
    </div>
  );
}

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [visitType, setVisitType] = useState<'day' | 'night' | ''>('');
  const [selectedDayTier, setSelectedDayTier] = useState<string>('');
  const [dayPassGuests, setDayPassGuests] = useState(1);
  const [dayAddonRooms, setDayAddonRooms] = useState<Record<string, number>>(initialDayAddonRooms);
  const [dayAddonDorm, setDayAddonDorm] = useState(0);
  const [selectedNightRoom, setSelectedNightRoom] = useState<string>('');
  const [nightCabanaRooms, setNightCabanaRooms] = useState(1);
  const [nightVillaRooms, setNightVillaRooms] = useState(1);
  const [nightCottageRooms, setNightCottageRooms] = useState(0);
  const [nightCottageDorm, setNightCottageDorm] = useState(0);
  const [nightExtraCabana, setNightExtraCabana] = useState(0);
  const [nightExtraVilla, setNightExtraVilla] = useState(0);
  const [nightExtraCottageRooms, setNightExtraCottageRooms] = useState(0);

  useEffect(() => {
    const visit = searchParams.get('visit');
    const pass = searchParams.get('pass');
    const room = searchParams.get('room');
    if (visit === 'day') {
      setVisitType('day');
      if (pass && validPassIds.has(pass)) {
        setSelectedDayTier(pass);
        setDayPassGuests(1);
      }
    } else if (visit === 'night') {
      setVisitType('night');
      if (room && validRoomIds.has(room)) setSelectedNightRoom(room);
    }
  }, [searchParams]);

  const setDayAddonRoom = (id: string, n: number) => {
    const val = Math.max(0, Math.min(MAX_ROOMS_PER_TYPE, n));
    setDayAddonRooms((prev) => ({ ...prev, [id]: val }));
  };

  const dayTotalAmount = useMemo(() => {
    if (visitType !== 'day' || !selectedDayTier) return 0;
    const tier = EXPERIENCE_TIERS.find((t) => t.id === selectedDayTier);
    if (!tier) return 0;
    let sum = tier.price * dayPassGuests;
    SANCTUARIES.forEach((s) => { sum += s.price * (dayAddonRooms[s.id] ?? 0); });
    sum += DORM_DAY_PRICE * dayAddonDorm;
    return sum;
  }, [visitType, selectedDayTier, dayPassGuests, dayAddonRooms, dayAddonDorm]);

  const nightTotalAmount = useMemo(() => {
    if (visitType !== 'night' || !selectedNightRoom) return 0;
    const s = SANCTUARIES.find((r) => r.id === selectedNightRoom);
    if (!s || s.nightPrice == null) return 0;
    if (selectedNightRoom === 'cabana') return s.nightPrice * nightCabanaRooms + EXTRA_PERSON_PRICE * nightExtraCabana;
    if (selectedNightRoom === 'villa') return s.nightPrice * nightVillaRooms + EXTRA_PERSON_PRICE * nightExtraVilla;
    if (selectedNightRoom === 'cottage') {
      return (s.nightPrice ?? 0) * nightCottageRooms + DORM_NIGHT_PRICE * nightCottageDorm
        + EXTRA_PERSON_PRICE * nightExtraCottageRooms;
    }
    return 0;
  }, [visitType, selectedNightRoom, nightCabanaRooms, nightVillaRooms, nightCottageRooms, nightCottageDorm, nightExtraCabana, nightExtraVilla, nightExtraCottageRooms]);

  const totalAmount = visitType === 'day' ? dayTotalAmount : visitType === 'night' ? nightTotalAmount : 0;
  const hasDayRoomAddon = visitType === 'day' && ((dayAddonRooms.cabana ?? 0) + (dayAddonRooms.villa ?? 0) + (dayAddonRooms.cottage ?? 0) + dayAddonDorm > 0);

  const resetDay = () => {
    setSelectedDayTier('');
    setDayPassGuests(1);
    setDayAddonRooms(initialDayAddonRooms);
    setDayAddonDorm(0);
  };
  const resetNight = () => {
    setSelectedNightRoom('');
    setNightCabanaRooms(1);
    setNightVillaRooms(1);
    setNightCottageRooms(0);
    setNightCottageDorm(0);
    setNightExtraCabana(0);
    setNightExtraVilla(0);
    setNightExtraCottageRooms(0);
  };

  const [showDayAddons, setShowDayAddons] = useState(false);
  const dayTierScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollDayTiers = (direction: 'prev' | 'next') => {
    const container = dayTierScrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLButtonElement>('button');
    const cardWidth = card ? card.getBoundingClientRect().width : container.clientWidth;
    const delta = direction === 'next' ? cardWidth + 16 : -cardWidth - 16;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <form className="p-6 sm:p-8 space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="Booking form">
        {/* 1. Choose your visit */}
        <section aria-labelledby="visit-type-heading">
          <h2 id="visit-type-heading" className="text-lg font-bold text-primary mb-4">Choose your visit</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => { setVisitType('day'); resetNight(); if (!selectedDayTier) setDayPassGuests(1); }}
              className={`rounded-2xl border-2 p-6 text-left transition-all ${visitType === 'day' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/40 bg-white'}`}
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-2 block" aria-hidden="true">wb_sunny</span>
              <span className="font-bold text-lg text-primary block">Day visit</span>
              <span className="text-sm text-gray-500 mt-0.5 block">9 AM – 7 PM · Pool, lunch & more</span>
            </button>
            <button
              type="button"
              onClick={() => { setVisitType('night'); resetDay(); if (!selectedNightRoom) setSelectedNightRoom('cabana'); }}
              className={`rounded-2xl border-2 p-6 text-left transition-all ${visitType === 'night' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/40 bg-white'}`}
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-2 block" aria-hidden="true">nightlight</span>
              <span className="font-bold text-lg text-primary block">Night stay</span>
              <span className="text-sm text-gray-500 mt-0.5 block">Rooms & cabanas</span>
            </button>
          </div>
        </section>

        {/* 2. Stay (day pass or night stay) */}
        {visitType === 'day' && (
          <section aria-labelledby="day-pass-heading" className="space-y-6">
            <h2 id="day-pass-heading" className="text-lg font-bold text-primary">Stay</h2>

            <div>
              <p className={labelClass}>Select one pass</p>
              <div className="relative">
                <div
                  ref={dayTierScrollRef}
                  className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory"
                >
                  {EXPERIENCE_TIERS.map((tier) => {
                    const isSelected = selectedDayTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => { setSelectedDayTier(tier.id); setDayPassGuests(dayPassGuests < 1 ? 1 : dayPassGuests); }}
                        className={`rounded-xl border-2 p-4 text-left transition-all snap-start min-w-[82%] sm:min-w-0 ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-primary/30'
                        }`}
                      >
                        <span className="font-bold text-primary">{tier.name}</span>
                        <span className="block text-sm font-semibold text-gray-600 mt-0.5">₹{tier.price.toLocaleString('en-IN')}/person</span>
                        <p className="text-xs text-gray-500 mt-2">{tier.description}</p>
                        <ul className="mt-2 space-y-1 text-[11px] text-gray-500">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex gap-1">
                              <span aria-hidden="true">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                <div className="flex sm:hidden justify-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => scrollDayTiers('prev')}
                    className="min-w-[36px] min-h-[36px] rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center shadow-sm"
                    aria-label="Previous pass"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollDayTiers('next')}
                    className="min-w-[36px] min-h-[36px] rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center shadow-sm"
                    aria-label="Next pass"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {selectedDayTier && (
              <>
                <div>
                  <label className={labelClass}>Number of guests</label>
                  <Stepper value={dayPassGuests} min={1} max={99} onChange={setDayPassGuests} ariaLabel="guests" />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowDayAddons((prev) => !prev)}
                    className="flex items-center justify-between w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-left text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    aria-expanded={showDayAddons}
                  >
                    <div>
                      <p className="text-sm font-semibold text-primary">Add rooms (optional)</p>
                      <p className="text-xs text-gray-500">Max 2 per type. Breakfast free with any room add-on.</p>
                    </div>
                    <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                      {showDayAddons ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {showDayAddons && (
                    <div className="mt-4 space-y-3">
                      {SANCTUARIES.map((s) => {
                        const n = dayAddonRooms[s.id] ?? 0;
                        const cfg = ROOM_CONFIG[s.id];
                        return (
                          <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                            <div>
                              <span className="font-semibold text-primary text-sm">{s.name}</span>
                              <span className="text-xs text-gray-500 ml-2">₹{s.price.toLocaleString('en-IN')}/room · {cfg?.defaultPerRoom ?? 3} per room</span>
                            </div>
                            <Stepper value={n} min={0} max={2} onChange={(v) => setDayAddonRoom(s.id, v)} ariaLabel={s.name} />
                          </div>
                        );
                      })}
                      <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                        <div>
                          <span className="font-semibold text-primary text-sm">Cottage dorm (4 beds)</span>
                          <span className="text-xs text-gray-500 ml-2">₹{DORM_DAY_PRICE.toLocaleString('en-IN')} · 1 room, 4 people (no extra persons)</span>
                        </div>
                        <Stepper value={dayAddonDorm} min={0} max={1} onChange={setDayAddonDorm} ariaLabel="dorm" />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {dayTotalAmount > 0 && (
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-primary mb-0.5">Total</p>
                <p className="text-2xl font-extrabold text-primary">₹{dayTotalAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500 mt-1">We’ll confirm on WhatsApp.</p>
              </div>
            )}
          </section>
        )}

        {visitType === 'night' && (
          <section aria-labelledby="night-stay-heading" className="space-y-6">
            <h2 id="night-stay-heading" className="text-lg font-bold text-primary">Stay</h2>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <span className="material-symbols-outlined shrink-0" aria-hidden="true">info</span>
              <p>Food not included. Extra person ₹{EXTRA_PERSON_PRICE.toLocaleString('en-IN')} each.</p>
            </div>

            <div>
              <p className={labelClass}>Room type</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SANCTUARIES.map((room) => {
                  const isSelected = selectedNightRoom === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => { setSelectedNightRoom(room.id); if (room.id === 'cottage') { setNightCottageRooms(0); setNightCottageDorm(0); setNightExtraCottageRooms(0); } }}
                      className={`rounded-xl border-2 overflow-hidden text-left transition-all ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/40'}`}
                    >
                      <div className="aspect-[4/3] bg-gray-100">
                        <img src={room.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <span className="font-bold text-primary">{room.name}</span>
                        <span className="block text-sm font-semibold text-gray-600">₹{(room.nightPrice ?? room.price).toLocaleString('en-IN')}/night</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedNightRoom === 'cabana' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Rooms (max 2)</label>
                  <Stepper value={nightCabanaRooms} min={1} max={2} onChange={setNightCabanaRooms} ariaLabel="Cabana rooms" />
                </div>
                <div>
                  <label className={labelClass}>Extra persons (₹{EXTRA_PERSON_PRICE}/person, max 2 per room)</label>
                  <Stepper value={nightExtraCabana} min={0} max={nightCabanaRooms * 2} onChange={setNightExtraCabana} ariaLabel="extra persons" />
                </div>
              </div>
            )}
            {selectedNightRoom === 'villa' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Rooms (max 2)</label>
                  <Stepper value={nightVillaRooms} min={1} max={2} onChange={setNightVillaRooms} ariaLabel="Villa rooms" />
                </div>
                <div>
                  <label className={labelClass}>Extra persons (₹{EXTRA_PERSON_PRICE}/person, max 2 per room)</label>
                  <Stepper value={nightExtraVilla} min={0} max={nightVillaRooms * 2} onChange={setNightExtraVilla} ariaLabel="extra persons" />
                </div>
              </div>
            )}
            {selectedNightRoom === 'cottage' && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Rooms (max 2)</label>
                  <Stepper value={nightCottageRooms} min={0} max={2} onChange={setNightCottageRooms} ariaLabel="Cottage rooms" />
                </div>
                <div>
                  <label className={labelClass}>Dorm (1 room, 4 people — no extra persons)</label>
                  <Stepper value={nightCottageDorm} min={0} max={1} onChange={setNightCottageDorm} ariaLabel="dorm" />
                </div>
                {nightCottageRooms > 0 && (
                  <div>
                    <label className={labelClass}>Extra persons in rooms (max 1 per room)</label>
                    <Stepper value={nightExtraCottageRooms} min={0} max={nightCottageRooms} onChange={setNightExtraCottageRooms} ariaLabel="extra in rooms" />
                  </div>
                )}
              </div>
            )}

            {nightTotalAmount > 0 && (
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-primary mb-0.5">Total</p>
                <p className="text-2xl font-extrabold text-primary">₹{nightTotalAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500 mt-1">We’ll confirm on WhatsApp.</p>
              </div>
            )}
          </section>
        )}

        {/* 3. When */}
        <section aria-labelledby="date-heading">
          <h2 id="date-heading" className="text-lg font-bold text-primary mb-4">When</h2>
          <div>
            <label htmlFor="book-date" className={labelClass}>Entry date</label>
            <input id="book-date" type="date" name="date" className={inputClass} required aria-required="true" />
          </div>
        </section>

        {/* 4. Your details */}
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="text-lg font-bold text-primary mb-4">Your details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="book-name" className={labelClass}>Name</label>
                <input id="book-name" type="text" name="name" className={inputClass} placeholder="Your name" required aria-required="true" />
              </div>
              <div>
                <label htmlFor="book-phone" className={labelClass}>Phone</label>
                <input id="book-phone" type="tel" name="phone" defaultValue="+91 " className={inputClass} placeholder="98765 43210" required aria-required="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Hidden fields for submission */}
        {visitType === 'day' && <input type="hidden" name="visitType" value="day" />}
        {visitType === 'night' && <input type="hidden" name="visitType" value="night" />}
        {selectedDayTier && <input type="hidden" name="dayPass" value={selectedDayTier} />}
        {visitType === 'day' && <input type="hidden" name="dayPassGuests" value={dayPassGuests} />}
        {SANCTUARIES.map((s) => <input key={s.id} type="hidden" name={`dayRoom_${s.id}`} value={dayAddonRooms[s.id] ?? 0} />)}
        <input type="hidden" name="dayDorm" value={dayAddonDorm} />
        {selectedNightRoom && <input type="hidden" name="nightRoom" value={selectedNightRoom} />}
        <input type="hidden" name="nightCabanaRooms" value={nightCabanaRooms} />
        <input type="hidden" name="nightVillaRooms" value={nightVillaRooms} />
        <input type="hidden" name="nightCottageRooms" value={nightCottageRooms} />
        <input type="hidden" name="nightCottageDorm" value={nightCottageDorm} />
        <input type="hidden" name="nightExtra_cabana" value={nightExtraCabana} />
        <input type="hidden" name="nightExtra_villa" value={nightExtraVilla} />
        <input type="hidden" name="nightExtra_cottageRooms" value={nightExtraCottageRooms} />

        {/* Submit */}
        <section className="pt-4 border-t-2 border-gray-100">
          <button
            type="submit"
            disabled={!visitType || (visitType === 'day' && !selectedDayTier) || (visitType === 'night' && !selectedNightRoom)}
            className="w-full min-h-[52px] bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
          >
            Submit booking request
          </button>
        </section>
      </form>
    </div>
  );
};
