import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';

const EXTRA_PERSON_PRICE = 999;
const MAX_ROOMS_PER_TYPE = 2;
const DORM_DAY_PRICE = 1999;
const DORM_NIGHT_PRICE = 499;

const NIGHT_BASE_PRICE = 3999;
const NIGHT_COTTAGE_BASE_PRICE = 2999;
const CABANA_VILLA_DEFAULT_PERSONS = 3;
const COTTAGE_ROOM1_DEFAULT = 2;
const COTTAGE_ROOM2_DEFAULT = 3;

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

const calculateNightRoomCost = (
  selected: boolean,
  persons: number,
  basePersons: number,
  basePrice: number,
) => {
  if (!selected) return 0;
  const extraPersons = Math.max(0, persons - basePersons);
  return basePrice + EXTRA_PERSON_PRICE * extraPersons;
};

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [visitType, setVisitType] = useState<'day' | 'night' | ''>('');
  const [selectedDayTier, setSelectedDayTier] = useState<string>('');
  const [dayPassGuests, setDayPassGuests] = useState(1);
  const [dayAddonRooms, setDayAddonRooms] = useState<Record<string, number>>(initialDayAddonRooms);
  const [dayAddonDorm, setDayAddonDorm] = useState(0);
  const [nightActiveType, setNightActiveType] = useState<'cabana' | 'cottage' | 'villa'>('cabana');
  // Night stay: per-room selections
  const [cabanaRoom1Selected, setCabanaRoom1Selected] = useState(false);
  const [cabanaRoom1Persons, setCabanaRoom1Persons] = useState<number>(CABANA_VILLA_DEFAULT_PERSONS);
  const [cabanaRoom2Selected, setCabanaRoom2Selected] = useState(false);
  const [cabanaRoom2Persons, setCabanaRoom2Persons] = useState<number>(CABANA_VILLA_DEFAULT_PERSONS);

  const [villaRoom1Selected, setVillaRoom1Selected] = useState(false);
  const [villaRoom1Persons, setVillaRoom1Persons] = useState<number>(CABANA_VILLA_DEFAULT_PERSONS);
  const [villaRoom2Selected, setVillaRoom2Selected] = useState(false);
  const [villaRoom2Persons, setVillaRoom2Persons] = useState<number>(CABANA_VILLA_DEFAULT_PERSONS);

  const [cottageRoom1Selected, setCottageRoom1Selected] = useState(false);
  const [cottageRoom1Persons, setCottageRoom1Persons] = useState<number>(COTTAGE_ROOM1_DEFAULT);
  const [cottageRoom2Selected, setCottageRoom2Selected] = useState(false);
  const [cottageRoom2Persons, setCottageRoom2Persons] = useState<number>(COTTAGE_ROOM2_DEFAULT);

  const [cottageDormSelected, setCottageDormSelected] = useState(false);
  const [cottageDormPersons, setCottageDormPersons] = useState<number>(1);

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
      if (room && validRoomIds.has(room)) {
        // Pre-select a sensible default based on the room coming from Accommodation
        if (room === 'cabana') {
          setNightActiveType('cabana');
          setCabanaRoom1Selected(true);
          setCabanaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
        } else if (room === 'villa') {
          setNightActiveType('villa');
          setVillaRoom1Selected(true);
          setVillaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
        } else if (room === 'cottage') {
          setNightActiveType('cottage');
          setCottageRoom1Selected(true);
          setCottageRoom1Persons(COTTAGE_ROOM1_DEFAULT);
        }
      }
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
    if (visitType !== 'night') return 0;

    let sum = 0;

    // Cabana – 3 persons included, extra at 999 each
    sum += calculateNightRoomCost(
      cabanaRoom1Selected,
      cabanaRoom1Persons,
      CABANA_VILLA_DEFAULT_PERSONS,
      NIGHT_BASE_PRICE,
    );
    sum += calculateNightRoomCost(
      cabanaRoom2Selected,
      cabanaRoom2Persons,
      CABANA_VILLA_DEFAULT_PERSONS,
      NIGHT_BASE_PRICE,
    );

    // Villa – same pricing as cabana
    sum += calculateNightRoomCost(
      villaRoom1Selected,
      villaRoom1Persons,
      CABANA_VILLA_DEFAULT_PERSONS,
      NIGHT_BASE_PRICE,
    );
    sum += calculateNightRoomCost(
      villaRoom2Selected,
      villaRoom2Persons,
      CABANA_VILLA_DEFAULT_PERSONS,
      NIGHT_BASE_PRICE,
    );

    // Cottage rooms – 2 / 3 persons included per room
    sum += calculateNightRoomCost(
      cottageRoom1Selected,
      cottageRoom1Persons,
      COTTAGE_ROOM1_DEFAULT,
      NIGHT_COTTAGE_BASE_PRICE,
    );
    sum += calculateNightRoomCost(
      cottageRoom2Selected,
      cottageRoom2Persons,
      COTTAGE_ROOM2_DEFAULT,
      NIGHT_COTTAGE_BASE_PRICE,
    );

    // Cottage dorm – 499 per person
    if (cottageDormSelected) {
      sum += DORM_NIGHT_PRICE * cottageDormPersons;
    }

    return sum;
  }, [
    visitType,
    cabanaRoom1Selected,
    cabanaRoom1Persons,
    cabanaRoom2Selected,
    cabanaRoom2Persons,
    villaRoom1Selected,
    villaRoom1Persons,
    villaRoom2Selected,
    villaRoom2Persons,
    cottageRoom1Selected,
    cottageRoom1Persons,
    cottageRoom2Selected,
    cottageRoom2Persons,
    cottageDormSelected,
    cottageDormPersons,
  ]);

  const totalAmount = visitType === 'day' ? dayTotalAmount : visitType === 'night' ? nightTotalAmount : 0;
  const hasDayRoomAddon =
    visitType === 'day' &&
    ((dayAddonRooms.cabana ?? 0) +
      (dayAddonRooms.villa ?? 0) +
      (dayAddonRooms.cottage ?? 0) +
      dayAddonDorm >
      0);

  const hasNightSelection =
    cabanaRoom1Selected ||
    cabanaRoom2Selected ||
    villaRoom1Selected ||
    villaRoom2Selected ||
    cottageRoom1Selected ||
    cottageRoom2Selected ||
    cottageDormSelected;

  const hasCabanaSelection = cabanaRoom1Selected || cabanaRoom2Selected;
  const hasCottageSelection = cottageRoom1Selected || cottageRoom2Selected || cottageDormSelected;
  const hasVillaSelection = villaRoom1Selected || villaRoom2Selected;

  const shouldShowSummary =
    (visitType === 'day' && !!selectedDayTier) || (visitType === 'night' && hasNightSelection);

  const dayBreakdown = useMemo(() => {
    if (visitType !== 'day' || !selectedDayTier) return [];
    const tier = EXPERIENCE_TIERS.find((t) => t.id === selectedDayTier);
    if (!tier) return [];
    const items: { label: string; amount: number }[] = [];
    items.push({
      label: `${tier.name} × ${dayPassGuests} guest${dayPassGuests > 1 ? 's' : ''}`,
      amount: tier.price * dayPassGuests,
    });
    SANCTUARIES.forEach((s) => {
      const n = dayAddonRooms[s.id] ?? 0;
      if (n > 0) {
        items.push({
          label: `${s.name} – ${n} room${n > 1 ? 's' : ''}`,
          amount: s.price * n,
        });
      }
    });
    if (dayAddonDorm > 0) {
      items.push({
        label: `Cottage dorm – ${dayAddonDorm} room${dayAddonDorm > 1 ? 's' : ''}`,
        amount: DORM_DAY_PRICE * dayAddonDorm,
      });
    }
    return items;
  }, [visitType, selectedDayTier, dayPassGuests, dayAddonRooms, dayAddonDorm]);

  const nightBreakdown = useMemo(() => {
    if (visitType !== 'night') return [];
    const items: { label: string; amount: number }[] = [];

    if (cabanaRoom1Selected) {
      items.push({
        label: `Cabana – Room 1 (${cabanaRoom1Persons} persons)`,
        amount: calculateNightRoomCost(
          cabanaRoom1Selected,
          cabanaRoom1Persons,
          CABANA_VILLA_DEFAULT_PERSONS,
          NIGHT_BASE_PRICE,
        ),
      });
    }
    if (cabanaRoom2Selected) {
      items.push({
        label: `Cabana – Room 2 (${cabanaRoom2Persons} persons)`,
        amount: calculateNightRoomCost(
          cabanaRoom2Selected,
          cabanaRoom2Persons,
          CABANA_VILLA_DEFAULT_PERSONS,
          NIGHT_BASE_PRICE,
        ),
      });
    }

    if (villaRoom1Selected) {
      items.push({
        label: `Villa – Room 1 (${villaRoom1Persons} persons)`,
        amount: calculateNightRoomCost(
          villaRoom1Selected,
          villaRoom1Persons,
          CABANA_VILLA_DEFAULT_PERSONS,
          NIGHT_BASE_PRICE,
        ),
      });
    }
    if (villaRoom2Selected) {
      items.push({
        label: `Villa – Room 2 (${villaRoom2Persons} persons)`,
        amount: calculateNightRoomCost(
          villaRoom2Selected,
          villaRoom2Persons,
          CABANA_VILLA_DEFAULT_PERSONS,
          NIGHT_BASE_PRICE,
        ),
      });
    }

    if (cottageRoom1Selected) {
      items.push({
        label: `Cottage – Room 1 (${cottageRoom1Persons} persons)`,
        amount: calculateNightRoomCost(
          cottageRoom1Selected,
          cottageRoom1Persons,
          COTTAGE_ROOM1_DEFAULT,
          NIGHT_COTTAGE_BASE_PRICE,
        ),
      });
    }
    if (cottageRoom2Selected) {
      items.push({
        label: `Cottage – Room 2 (${cottageRoom2Persons} persons)`,
        amount: calculateNightRoomCost(
          cottageRoom2Selected,
          cottageRoom2Persons,
          COTTAGE_ROOM2_DEFAULT,
          NIGHT_COTTAGE_BASE_PRICE,
        ),
      });
    }

    if (cottageDormSelected && cottageDormPersons > 0) {
      items.push({
        label: `Cottage – Dorm (${cottageDormPersons} persons)`,
        amount: DORM_NIGHT_PRICE * cottageDormPersons,
      });
    }

    return items;
  }, [
    visitType,
    cabanaRoom1Selected,
    cabanaRoom1Persons,
    cabanaRoom2Selected,
    cabanaRoom2Persons,
    villaRoom1Selected,
    villaRoom1Persons,
    villaRoom2Selected,
    villaRoom2Persons,
    cottageRoom1Selected,
    cottageRoom1Persons,
    cottageRoom2Selected,
    cottageRoom2Persons,
    cottageDormSelected,
    cottageDormPersons,
  ]);

  const summaryBreakdown = visitType === 'day' ? dayBreakdown : nightBreakdown;

  const resetDay = () => {
    setSelectedDayTier('');
    setDayPassGuests(1);
    setDayAddonRooms(initialDayAddonRooms);
    setDayAddonDorm(0);
  };
  const resetNight = () => {
    setNightActiveType('cabana');
    setCabanaRoom1Selected(false);
    setCabanaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
    setCabanaRoom2Selected(false);
    setCabanaRoom2Persons(CABANA_VILLA_DEFAULT_PERSONS);

    setVillaRoom1Selected(false);
    setVillaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
    setVillaRoom2Selected(false);
    setVillaRoom2Persons(CABANA_VILLA_DEFAULT_PERSONS);

    setCottageRoom1Selected(false);
    setCottageRoom1Persons(COTTAGE_ROOM1_DEFAULT);
    setCottageRoom2Selected(false);
    setCottageRoom2Persons(COTTAGE_ROOM2_DEFAULT);

    setCottageDormSelected(false);
    setCottageDormPersons(1);
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
    <div className="rounded-2xl overflow-visible">
      <div className="p-6 sm:p-8 md:grid md:grid-cols-[minmax(0,820px)_minmax(260px,1fr)] md:gap-8 items-start">
        <form
          id="booking-form"
          className="space-y-8 max-w-[820px] w-full"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Booking form"
        >
          {/* 1. Choose your visit */}
          <section aria-labelledby="visit-type-heading">
            <h2 id="visit-type-heading" className="text-lg font-bold text-primary mb-4">
              Choose your visit
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setVisitType('day');
                  resetNight();
                  if (!selectedDayTier) setDayPassGuests(1);
                }}
                className={`rounded-2xl border-2 p-6 text-left transition-all ${
                  visitType === 'day'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/40 bg-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-3xl text-primary mb-2 block"
                  aria-hidden="true"
                >
                  wb_sunny
                </span>
                <span className="font-bold text-lg text-primary block">Day visit</span>
                <span className="text-sm text-gray-500 mt-0.5 block">
                  9 AM – 7 PM · Pool, lunch & more
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setVisitType('night');
                  resetDay();
                  if (!hasNightSelection) {
                    setNightActiveType('cabana');
                    setCabanaRoom1Selected(true);
                    setCabanaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
                  }
                }}
                className={`rounded-2xl border-2 p-6 text-left transition-all ${
                  visitType === 'night'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/40 bg-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-3xl text-primary mb-2 block"
                  aria-hidden="true"
                >
                  nightlight
                </span>
                <span className="font-bold text-lg text-primary block">Night stay</span>
                <span className="text-sm text-gray-500 mt-0.5 block">Rooms & cabanas</span>
              </button>
            </div>
          </section>

          {/* 2. Stay (day pass or night stay) */}
          {visitType === 'day' && (
            <section aria-labelledby="day-pass-heading" className="space-y-6">
              <h2 id="day-pass-heading" className="text-lg font-bold text-primary">
                Stay
              </h2>

              <div>
                <p className={labelClass}>Select one pass</p>
                <div className="relative">
                  <div
                    ref={dayTierScrollRef}
                    className="flex sm:grid sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory"
                  >
                    {EXPERIENCE_TIERS.map((tier) => {
                      const isSelected = selectedDayTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedDayTier(tier.id);
                            setDayPassGuests(dayPassGuests < 1 ? 1 : dayPassGuests);
                          }}
                          className="text-left snap-start min-w-[82%] sm:min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-soft"
                        >
                          <div
                            className={`flex flex-col h-full rounded-3xl border bg-white p-6 sm:p-7 relative transition-all duration-500 hover-lift ${
                              isSelected
                                ? 'border-primary shadow-xl ring-1 ring-primary/20'
                                : 'border-gray-200 hover:border-primary/30 hover:shadow-xl'
                            }`}
                          >

                            <div className="space-y-3 shrink-0">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.18em]">
                                  {tier.name}
                                </h3>
                                <span
                                  className="material-symbols-outlined text-primary group-hover:rotate-12 motion-safe:transition-transform"
                                  aria-hidden="true"
                                >
                                  {tier.icon}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span
                                  className={`font-extrabold tracking-tight ${
                                    isSelected ? 'text-primary text-4xl' : 'text-gray-900 text-3xl'
                                  }`}
                                >
                                  ₹{tier.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-gray-500 text-sm font-medium">/person</span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                {tier.description}
                              </p>
                            </div>

                            <ul className="space-y-2 pt-4 border-t border-gray-100 mt-4">
                              {tier.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                  <span
                                    className="material-symbols-outlined text-primary text-base sm:text-lg shrink-0"
                                    aria-hidden="true"
                                  >
                                    check_circle
                                  </span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
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
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        chevron_left
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollDayTiers('next')}
                      className="min-w-[36px] min-h-[36px] rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center shadow-sm"
                      aria-label="Next pass"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {selectedDayTier && (
                <>
                  <div>
                    <label className={labelClass}>Number of guests</label>
                    <Stepper
                      value={dayPassGuests}
                      min={1}
                      max={99}
                      onChange={setDayPassGuests}
                      ariaLabel="guests"
                    />
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
                        <p className="text-xs text-gray-500">
                          Max 2 per type. Breakfast free with any room add-on.
                        </p>
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
                            <div
                              key={s.id}
                              className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                            >
                              <div>
                                <span className="font-semibold text-primary text-sm">{s.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ₹{s.price.toLocaleString('en-IN')}/room ·{' '}
                                  {cfg?.defaultPerRoom ?? 3} per room
                                </span>
                              </div>
                              <Stepper
                                value={n}
                                min={0}
                                max={2}
                                onChange={(v) => setDayAddonRoom(s.id, v)}
                                ariaLabel={s.name}
                              />
                            </div>
                          );
                        })}
                        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                          <div>
                            <span className="font-semibold text-primary text-sm">Cottage dorm (4 beds)</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ₹{DORM_DAY_PRICE.toLocaleString('en-IN')} · 1 room, 4 people (no extra persons)
                            </span>
                          </div>
                          <Stepper
                            value={dayAddonDorm}
                            min={0}
                            max={1}
                            onChange={setDayAddonDorm}
                            ariaLabel="dorm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </section>
          )}

          {visitType === 'night' && (
            <section aria-labelledby="night-stay-heading" className="space-y-6">
              <h2 id="night-stay-heading" className="text-lg font-bold text-primary">
                Stay
              </h2>

              {/* Room cards with images */}
              <div>
                <p className={labelClass}>Room type</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['cabana', 'cottage', 'villa'].map((id) => {
                    const room = SANCTUARIES.find((s) => s.id === id);
                    if (!room) return null;
                    const isActive = nightActiveType === id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setNightActiveType(id as 'cabana' | 'cottage' | 'villa');
                          if (id === 'cabana' && !hasCabanaSelection) {
                            setCabanaRoom1Selected(true);
                            setCabanaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
                          } else if (id === 'cottage' && !hasCottageSelection) {
                            setCottageRoom1Selected(true);
                            setCottageRoom1Persons(COTTAGE_ROOM1_DEFAULT);
                          } else if (id === 'villa' && !hasVillaSelection) {
                            setVillaRoom1Selected(true);
                            setVillaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
                          }
                        }}
                        className={`rounded-xl border-2 overflow-hidden text-left transition-all ${
                          isActive
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-gray-200 hover:border-primary/40'
                        }`}
                      >
                        <div className="aspect-[4/3] bg-gray-100">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <span className="font-bold text-primary">{room.name}</span>
                          <span className="block text-sm font-semibold text-gray-600">
                            ₹{(room.nightPrice ?? room.price).toLocaleString('en-IN')}/night
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1. Cabana */}
              {nightActiveType === 'cabana' && (
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-primary">1. Cabana</h3>
                    <p className="text-xs text-gray-500">
                      ₹{NIGHT_BASE_PRICE.toLocaleString('en-IN')}/night · {CABANA_VILLA_DEFAULT_PERSONS} persons
                      included
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Cabana room 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={cabanaRoom1Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCabanaRoom1Selected(checked);
                            if (checked) {
                              setCabanaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
                            }
                          }}
                        />
                        <span>Room 1</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[3, 4, 5].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              cabanaRoom1Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cabana-room1-persons"
                              value={count}
                              className="sr-only"
                              checked={cabanaRoom1Persons === count}
                              onChange={() => {
                                setCabanaRoom1Selected(true);
                                setCabanaRoom1Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === CABANA_VILLA_DEFAULT_PERSONS && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cabana room 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={cabanaRoom2Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCabanaRoom2Selected(checked);
                            if (checked) {
                              setCabanaRoom2Persons(CABANA_VILLA_DEFAULT_PERSONS);
                            }
                          }}
                        />
                        <span>Room 2</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[3, 4, 5].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              cabanaRoom2Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cabana-room2-persons"
                              value={count}
                              className="sr-only"
                              checked={cabanaRoom2Persons === count}
                              onChange={() => {
                                setCabanaRoom2Selected(true);
                                setCabanaRoom2Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === CABANA_VILLA_DEFAULT_PERSONS && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Cottage */}
              {nightActiveType === 'cottage' && (
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-primary">2. Cottage</h3>
                    <p className="text-xs text-gray-500">
                      ₹{NIGHT_COTTAGE_BASE_PRICE.toLocaleString('en-IN')}/night · 2–3 persons included
                      per room
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Cottage room 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={cottageRoom1Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCottageRoom1Selected(checked);
                            if (checked) {
                              setCottageRoom1Persons(COTTAGE_ROOM1_DEFAULT);
                            }
                          }}
                        />
                        <span>Room 1</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[2, 3].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              cottageRoom1Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cottage-room1-persons"
                              value={count}
                              className="sr-only"
                              checked={cottageRoom1Persons === count}
                              onChange={() => {
                                setCottageRoom1Selected(true);
                                setCottageRoom1Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === COTTAGE_ROOM1_DEFAULT && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cottage room 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={cottageRoom2Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCottageRoom2Selected(checked);
                            if (checked) {
                              setCottageRoom2Persons(COTTAGE_ROOM2_DEFAULT);
                            }
                          }}
                        />
                        <span>Room 2</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[3, 4].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              cottageRoom2Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cottage-room2-persons"
                              value={count}
                              className="sr-only"
                              checked={cottageRoom2Persons === count}
                              onChange={() => {
                                setCottageRoom2Selected(true);
                                setCottageRoom2Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === COTTAGE_ROOM2_DEFAULT && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cottage dorm */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={cottageDormSelected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCottageDormSelected(checked);
                            if (checked && cottageDormPersons < 1) {
                              setCottageDormPersons(1);
                            }
                          }}
                        />
                        <span>Dorm</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[1, 2, 3, 4].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              cottageDormPersons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="cottage-dorm-persons"
                              value={count}
                              className="sr-only"
                              checked={cottageDormPersons === count}
                              onChange={() => {
                                setCottageDormSelected(true);
                                setCottageDormPersons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === 1 && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Villa */}
              {nightActiveType === 'villa' && (
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-primary">3. Villa</h3>
                    <p className="text-xs text-gray-500">
                      ₹{NIGHT_BASE_PRICE.toLocaleString('en-IN')}/night · {CABANA_VILLA_DEFAULT_PERSONS} persons
                      included
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Villa room 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={villaRoom1Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setVillaRoom1Selected(checked);
                            if (checked) {
                              setVillaRoom1Persons(CABANA_VILLA_DEFAULT_PERSONS);
                            }
                          }}
                        />
                        <span>Room 1</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[3, 4, 5].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              villaRoom1Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="villa-room1-persons"
                              value={count}
                              className="sr-only"
                              checked={villaRoom1Persons === count}
                              onChange={() => {
                                setVillaRoom1Selected(true);
                                setVillaRoom1Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === CABANA_VILLA_DEFAULT_PERSONS && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Villa room 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-3">
                      <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={villaRoom2Selected}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setVillaRoom2Selected(checked);
                            if (checked) {
                              setVillaRoom2Persons(CABANA_VILLA_DEFAULT_PERSONS);
                            }
                          }}
                        />
                        <span>Room 2</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-500">Persons:</span>
                        {[3, 4, 5].map((count) => (
                          <label
                            key={count}
                            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                              villaRoom2Persons === count
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="villa-room2-persons"
                              value={count}
                              className="sr-only"
                              checked={villaRoom2Persons === count}
                              onChange={() => {
                                setVillaRoom2Selected(true);
                                setVillaRoom2Persons(count);
                              }}
                            />
                            <span>
                              {count} {count === 1 ? 'person' : 'persons'}
                            </span>
                            {count === CABANA_VILLA_DEFAULT_PERSONS && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                                (default)
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 3. When */}
          <section aria-labelledby="date-heading">
            <h2 id="date-heading" className="text-lg font-bold text-primary mb-4">
              When
            </h2>
            <div>
              <label htmlFor="book-date" className={labelClass}>
                Entry date
              </label>
              <input
                id="book-date"
                type="date"
                name="date"
                className={inputClass}
                required
                aria-required="true"
              />
            </div>
          </section>

          {/* 4. Your details */}
          <section aria-labelledby="details-heading">
            <h2 id="details-heading" className="text-lg font-bold text-primary mb-4">
              Your details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="book-name"
                    type="text"
                    name="name"
                    className={inputClass}
                    placeholder="Your name"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="book-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="book-phone"
                    type="tel"
                    name="phone"
                    defaultValue="+91 "
                    className={inputClass}
                    placeholder="98765 43210"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Hidden fields for submission */}
          {visitType === 'day' && <input type="hidden" name="visitType" value="day" />}
          {visitType === 'night' && <input type="hidden" name="visitType" value="night" />}
          {selectedDayTier && <input type="hidden" name="dayPass" value={selectedDayTier} />}
          {visitType === 'day' && (
            <input type="hidden" name="dayPassGuests" value={dayPassGuests} />
          )}
          {SANCTUARIES.map((s) => (
            <input
              key={s.id}
              type="hidden"
              name={`dayRoom_${s.id}`}
              value={dayAddonRooms[s.id] ?? 0}
            />
          ))}
          <input type="hidden" name="dayDorm" value={dayAddonDorm} />

          {/* Night stay summary */}
          <input
            type="hidden"
            name="nightCabanaRooms"
            value={(cabanaRoom1Selected ? 1 : 0) + (cabanaRoom2Selected ? 1 : 0)}
          />
          <input
            type="hidden"
            name="nightCabanaExtraPersons"
            value={
              (cabanaRoom1Selected
                ? Math.max(0, cabanaRoom1Persons - CABANA_VILLA_DEFAULT_PERSONS)
                : 0) +
              (cabanaRoom2Selected
                ? Math.max(0, cabanaRoom2Persons - CABANA_VILLA_DEFAULT_PERSONS)
                : 0)
            }
          />
          <input
            type="hidden"
            name="nightVillaRooms"
            value={(villaRoom1Selected ? 1 : 0) + (villaRoom2Selected ? 1 : 0)}
          />
          <input
            type="hidden"
            name="nightVillaExtraPersons"
            value={
              (villaRoom1Selected
                ? Math.max(0, villaRoom1Persons - CABANA_VILLA_DEFAULT_PERSONS)
                : 0) +
              (villaRoom2Selected
                ? Math.max(0, villaRoom2Persons - CABANA_VILLA_DEFAULT_PERSONS)
                : 0)
            }
          />
          <input
            type="hidden"
            name="nightCottageRooms"
            value={(cottageRoom1Selected ? 1 : 0) + (cottageRoom2Selected ? 1 : 0)}
          />
          <input
            type="hidden"
            name="nightCottageExtraPersons"
            value={
              (cottageRoom1Selected
                ? Math.max(0, cottageRoom1Persons - COTTAGE_ROOM1_DEFAULT)
                : 0) +
              (cottageRoom2Selected
                ? Math.max(0, cottageRoom2Persons - COTTAGE_ROOM2_DEFAULT)
                : 0)
            }
          />
          <input
            type="hidden"
            name="nightCottageDormPersons"
            value={cottageDormSelected ? cottageDormPersons : 0}
          />

          {/* Submit button (after contact form) */}
          <section className="pt-4 border-t-2 border-gray-100">
            <button
              type="submit"
              form="booking-form"
              disabled={
                !visitType ||
                (visitType === 'day' && !selectedDayTier) ||
                (visitType === 'night' && !hasNightSelection)
              }
              className="w-full min-h-[52px] bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
            >
              Submit booking request
            </button>
          </section>
        </form>

        {/* Booking summary: outside form, sticky beside the form */}
        {shouldShowSummary && (
          <aside
            className="mt-8 md:mt-0 md:sticky md:top-24 md:self-start md:w-[300px] md:ml-10"
            aria-label="Booking summary"
          >
            <div className="rounded-2xl border border-primary/20 bg-white shadow-xl px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                  Booking summary
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {visitType === 'day'
                    ? 'Day visit with selected pass and rooms.'
                    : 'Night stay with selected rooms and persons.'}
                </p>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="text-sm font-semibold text-primary">Estimated total</span>
                  <span className="text-2xl font-extrabold text-primary">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                {summaryBreakdown.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-700">
                    {summaryBreakdown.map((item) => (
                      <li key={item.label} className="flex items-baseline justify-between gap-3">
                        <span className="flex-1">{item.label}</span>
                        <span className="font-semibold whitespace-nowrap">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-[11px] text-gray-500 mt-4">
                  This is an approximate amount. We’ll confirm the final details and inclusions with you
                  on WhatsApp.
                </p>
              </div>
          </aside>
        )}
      </div>
    </div>
  );
};
