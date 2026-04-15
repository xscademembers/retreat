import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';
import { getNightRoom, NIGHT_ROOMS, type NightRoomId } from '../nightRoomDetails';
import { NightStayRoomGallery } from './NightStayRoomGallery';
import { NightStayRoomTabs } from './NightStayRoomTabs';
import { wixImg } from '../utils/wixImage';

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
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className="size-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
        aria-label={`Decrease ${ariaLabel}`}
      >
        −
      </button>
      <span className="w-7 text-center font-bold text-base" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className="size-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
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

interface BookingFormProps {
  onSubmitSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmitSuccess }) => {
  const [searchParams] = useSearchParams();
  const [visitType, setVisitType] = useState<'day' | 'night' | ''>('');
  const [selectedDayTier, setSelectedDayTier] = useState<string>('');
  const [dayPassGuests, setDayPassGuests] = useState(1);
  const [dayAddonRooms, setDayAddonRooms] = useState<Record<string, number>>(initialDayAddonRooms);
  const [dayAddonDorm, setDayAddonDorm] = useState(0);
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

  const [nightStayNavActive, setNightStayNavActive] = useState<NightRoomId>('cabana');

  const [entryDate, setEntryDate] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const visit = searchParams.get('visit');
    const pass = searchParams.get('pass');
    if (visit === 'day') {
      setVisitType('day');
      if (pass && validPassIds.has(pass)) {
        setSelectedDayTier(pass);
        setDayPassGuests(1);
      }
    } else if (visit === 'night') {
      setVisitType('night');
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

  const nightNightsCount = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffMs = end.getTime() - start.getTime();
    const nights = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  }, [checkInDate, checkOutDate]);

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

    // Cottage dorm – 499 per person, per night
    if (cottageDormSelected) {
      sum += DORM_NIGHT_PRICE * cottageDormPersons;
    }

    return sum * nightNightsCount;
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
    nightNightsCount,
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
        label: `Cabana – Room 1 (${cabanaRoom1Persons} persons / night)`,
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
        label: `Cabana – Room 2 (${cabanaRoom2Persons} persons / night)`,
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
        label: `Villa – Room 1 (${villaRoom1Persons} persons / night)`,
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
        label: `Villa – Room 2 (${villaRoom2Persons} persons / night)`,
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
        label: `Cottage – Room 1 (${cottageRoom1Persons} persons / night)`,
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
        label: `Cottage – Room 2 (${cottageRoom2Persons} persons / night)`,
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
        label: `Cottage – Dorm (${cottageDormPersons} persons / night)`,
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

  const canShowDateSection =
    (visitType === 'day' && !!selectedDayTier) ||
    (visitType === 'night' && hasNightSelection);

  const canShowDetailsSection =
    (visitType === 'day' && !!entryDate) ||
    (visitType === 'night' && !!checkInDate && !!checkOutDate);

  const nightPricingNote = useMemo(() => {
    if (visitType !== 'night') return '';
    if (checkInDate && checkOutDate) {
      const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      const from = new Date(checkInDate).toLocaleDateString('en-IN', opts);
      const to = new Date(checkOutDate).toLocaleDateString('en-IN', opts);
      return `These prices are calculated from ${from} to ${to}.`;
    }
    return 'These prices are for one night.';
  }, [visitType, checkInDate, checkOutDate]);

  const resetDay = () => {
    setSelectedDayTier('');
    setDayPassGuests(1);
    setDayAddonRooms(initialDayAddonRooms);
    setDayAddonDorm(0);
    setEntryDate('');
  };
  const resetNight = () => {
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

    setNightStayNavActive('cabana');

    setCheckInDate('');
    setCheckOutDate('');
  };

  const [showDayAddons, setShowDayAddons] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const cabanaSectionRef = useRef<HTMLElement | null>(null);
  const cottageSectionRef = useRef<HTMLElement | null>(null);
  const villaSectionRef = useRef<HTMLElement | null>(null);
  const lastScrolledNightRoom = useRef<string | null>(null);

  const scrollToNightStaySection = useCallback((id: NightRoomId) => {
    setNightStayNavActive(id);
    const ref =
      id === 'cabana' ? cabanaSectionRef : id === 'cottage' ? cottageSectionRef : villaSectionRef;
    window.requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  }, []);

  useEffect(() => {
    if (visitType !== 'night') {
      lastScrolledNightRoom.current = null;
      return;
    }
    const room = searchParams.get('room');
    if (room === 'cabana' || room === 'cottage' || room === 'villa') {
      setNightStayNavActive(room);
    } else {
      setNightStayNavActive('cabana');
    }
    if (room !== 'cabana' && room !== 'cottage' && room !== 'villa') return;
    if (lastScrolledNightRoom.current === room) return;
    lastScrolledNightRoom.current = room;
    const ref =
      room === 'cabana' ? cabanaSectionRef : room === 'cottage' ? cottageSectionRef : villaSectionRef;
    window.requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  }, [visitType, searchParams]);

  useEffect(() => {
    if (visitType !== 'night') return;
    const sections: { id: NightRoomId; el: HTMLElement | null }[] = [
      { id: 'cabana', el: cabanaSectionRef.current },
      { id: 'cottage', el: cottageSectionRef.current },
      { id: 'villa', el: villaSectionRef.current },
    ];
    const els = sections.filter((s): s is { id: NightRoomId; el: HTMLElement } => s.el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target instanceof HTMLElement)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const node = visible[0].target;
        if (!(node instanceof HTMLElement)) return;
        const id = node.dataset.nightNavId as NightRoomId | undefined;
        if (id) setNightStayNavActive(id);
      },
      { root: null, rootMargin: '-96px 0px -50% 0px', threshold: [0, 0.08, 0.2, 0.35, 0.5] },
    );

    els.forEach(({ id, el }) => {
      el.dataset.nightNavId = id;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visitType]);

  const summaryBlock = shouldShowSummary ? (
    <div className="rounded-2xl border border-primary/20 bg-white shadow-xl px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-3">
        Booking summary
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-gray-700">
        {visitType === 'day' && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">group</span>
              <span>{dayPassGuests} guest{dayPassGuests > 1 ? 's' : ''}</span>
            </div>
            {entryDate && (
              <>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">calendar_today</span>
                  <span>{new Date(entryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </>
        )}
        {visitType === 'night' && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">group</span>
              <span>
                {[
                  cabanaRoom1Selected ? cabanaRoom1Persons : 0,
                  cabanaRoom2Selected ? cabanaRoom2Persons : 0,
                  cottageRoom1Selected ? cottageRoom1Persons : 0,
                  cottageRoom2Selected ? cottageRoom2Persons : 0,
                  cottageDormSelected ? cottageDormPersons : 0,
                  villaRoom1Selected ? villaRoom1Persons : 0,
                  villaRoom2Selected ? villaRoom2Persons : 0,
                ].reduce((a, b) => a + b, 0)} guest{[
                  cabanaRoom1Selected ? cabanaRoom1Persons : 0,
                  cabanaRoom2Selected ? cabanaRoom2Persons : 0,
                  cottageRoom1Selected ? cottageRoom1Persons : 0,
                  cottageRoom2Selected ? cottageRoom2Persons : 0,
                  cottageDormSelected ? cottageDormPersons : 0,
                  villaRoom1Selected ? villaRoom1Persons : 0,
                  villaRoom2Selected ? villaRoom2Persons : 0,
                ].reduce((a, b) => a + b, 0) > 1 ? 's' : ''}
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">dark_mode</span>
              <span>{nightNightsCount} night{nightNightsCount > 1 ? 's' : ''}</span>
            </div>
          </>
        )}
      </div>
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
      {visitType === 'night' && (
        <div className="flex items-center gap-2 mt-3 px-2.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
          <span className="material-symbols-outlined text-emerald-600 text-base" aria-hidden="true">restaurant</span>
          <span className="text-xs font-semibold text-emerald-700">Complimentary – Breakfast included</span>
        </div>
      )}
    </div>
  ) : null;

  const buildWhatsAppMessage = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = ((formData.get('name') as string) || '').trim() || 'N/A';
    const phone = ((formData.get('phone') as string) || '').trim() || 'N/A';
    const company = ((formData.get('company') as string) || '').trim();

    const lines: string[] = [];
    lines.push('Booking enquiry - Salsons Retreat');
    lines.push('');
    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    if (company) {
      lines.push(`Company: ${company}`);
    }

    if (visitType === 'day') {
      const tier = EXPERIENCE_TIERS.find((t) => t.id === selectedDayTier);
      lines.push('Visit type: Day spend');
      if (tier) {
        lines.push(`Pass: ${tier.name}`);
      }
      lines.push(`Guests: ${dayPassGuests}`);
      if (entryDate) {
        const formatted = new Date(entryDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        lines.push(`Date: ${formatted}`);
      }
    } else if (visitType === 'night') {
      const totalGuests =
        (cabanaRoom1Selected ? cabanaRoom1Persons : 0) +
        (cabanaRoom2Selected ? cabanaRoom2Persons : 0) +
        (cottageRoom1Selected ? cottageRoom1Persons : 0) +
        (cottageRoom2Selected ? cottageRoom2Persons : 0) +
        (cottageDormSelected ? cottageDormPersons : 0) +
        (villaRoom1Selected ? villaRoom1Persons : 0) +
        (villaRoom2Selected ? villaRoom2Persons : 0);

      lines.push('Visit type: Night stay');
      lines.push(`Guests: ${totalGuests}`);
      lines.push(`Nights: ${nightNightsCount}`);

      if (checkInDate) {
        const formatted = new Date(checkInDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        lines.push(`Check-in: ${formatted}`);
      }
      if (checkOutDate) {
        const formatted = new Date(checkOutDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        lines.push(`Check-out: ${formatted}`);
      }
    }

    if (summaryBreakdown.length > 0) {
      lines.push('');
      lines.push('Breakdown:');
      summaryBreakdown.forEach((item) => {
        lines.push(`- ${item.label}: ₹${item.amount.toLocaleString('en-IN')}`);
      });
    }

    if (totalAmount > 0) {
      lines.push('');
      lines.push(`Estimated total: ₹${totalAmount.toLocaleString('en-IN')}`);
    }

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = buildWhatsAppMessage(form);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918555079190?text=${encodedMessage}`;

    // Report Meta Pixel Contact conversion
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact');
    }

    // Report Google Ads conversion
    if (typeof window !== 'undefined' && typeof (window as any).gtag_report_conversion === 'function') {
      (window as any).gtag_report_conversion(whatsappUrl);
    } else if (typeof window !== 'undefined') {
      window.location.href = whatsappUrl;
    } else {
      setFormSubmitted(true);
      onSubmitSuccess?.();
    }
  };

  if (formSubmitted) {
    return (
      <div className="rounded-2xl overflow-visible">
        <div className="p-6 sm:p-8 max-w-screen-2xl mx-auto space-y-10">
          <div className="text-center py-12 sm:py-16 space-y-6">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-4xl" aria-hidden="true">check_circle</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">Thank you for submitting your request!</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
                Mr. Vishnu (<a href="tel:+918555079190" className="text-primary font-semibold hover:underline">8555079190</a>) will contact you shortly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-6 items-stretch">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-primary/5 px-6 py-5 border-b border-gray-100">
                <h3 className="text-primary font-bold text-lg">Find Us Here</h3>
                <p className="text-primary/70 text-sm mt-0.5">Your escape awaits</p>
              </div>
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-center">
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
                    <p className="font-semibold text-gray-900">Call or WhatsApp <span className="font-normal text-gray-500">(Mr. Vishnu)</span></p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      <a href="tel:+918074799387" className="text-primary hover:underline">+91 80747 99387</a>
                      <span className="text-gray-300 mx-1">·</span>
                      <a href="tel:+917569242082" className="text-primary hover:underline">+91 75692 42082</a>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 pt-2">~70 km from Vizag. We'll confirm your booking on WhatsApp.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white min-h-[300px]">
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
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-visible">
      <div
        className={`p-6 sm:p-8 w-full ${
          shouldShowSummary
            ? 'md:grid md:grid-cols-[1fr_minmax(280px,400px)] md:gap-8 lg:gap-10 md:items-start'
            : ''
        }`}
      >
        <form
          id="booking-form"
          className="space-y-8 w-full min-w-0"
          onSubmit={handleSubmit}
          aria-label="Booking form"
        >
          <section aria-labelledby="visit-type-heading">
            <h2 id="visit-type-heading" className="sr-only">
              Choose your visit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  setVisitType('day');
                  resetNight();
                  if (!selectedDayTier) setDayPassGuests(1);
                }}
                className={`relative rounded-2xl sm:rounded-3xl border-2 overflow-hidden text-left transition-all group ${
                  visitType === 'day'
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-primary/40 hover:shadow-md'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(6, 57, 46, 0.45), rgba(6, 57, 46, 0.05)), url("https://static.wixstatic.com/media/9356bd_3b34eead3ee14eb8ac3a8cb75ea1d6ce~mv2.webp")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r sm:bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-4 sm:gap-0 px-5 py-7 sm:p-6 sm:h-full sm:aspect-[4/3] text-white">
                  <span
                    className="material-symbols-outlined text-3xl sm:mb-2 shrink-0"
                    aria-hidden="true"
                  >
                    wb_sunny
                  </span>
                  <div className="min-w-0" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                    <span className="font-bold text-base sm:text-xl block">Day spend</span>
                    <span className="text-xs sm:text-sm text-white/90 mt-0.5 block">
                      9 AM – 7 PM · Pool, lunch &amp; more
                    </span>
                  </div>
                  {visitType === 'day' && (
                    <span className="material-symbols-outlined text-xl ml-auto sm:hidden text-white/90" aria-hidden="true">
                      check_circle
                    </span>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setVisitType('night');
                  resetDay();
                }}
                className={`relative rounded-2xl sm:rounded-3xl border-2 overflow-hidden text-left transition-all group ${
                  visitType === 'night'
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-primary/40 hover:shadow-md'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(5, 31, 51, 0.45), rgba(5, 31, 51, 0.05)), url("https://static.wixstatic.com/media/9356bd_3816a1b00f28406f9c5b34e61a665185~mv2.webp")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r sm:bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="relative z-10 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between gap-4 sm:gap-0 px-5 py-7 sm:p-6 sm:h-full sm:aspect-[4/3] text-white">
                  <span
                    className="material-symbols-outlined text-3xl sm:mb-2 shrink-0"
                    aria-hidden="true"
                  >
                    nightlight
                  </span>
                  <div className="min-w-0" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                    <span className="font-bold text-base sm:text-xl block">Night stay</span>
                    <span className="text-xs sm:text-sm text-white/90 mt-0.5 block">
                      Rooms &amp;&nbsp;cabanas
                    </span>
                  </div>
                  {visitType === 'night' && (
                    <span className="material-symbols-outlined text-xl ml-auto sm:hidden text-white/90" aria-hidden="true">
                      check_circle
                    </span>
                  )}
                </div>
              </button>
            </div>
          </section>

          {/* 2. Stay (day spend or night stay) */}
          {visitType === 'day' && (
            <section aria-labelledby="day-pass-heading" className="space-y-6">
              <h2 id="day-pass-heading" className="text-lg font-bold text-primary">
                Stay
              </h2>

              <div>
                <p className={labelClass}>Select one pass</p>

                {/* Desktop: 3-col grid (Basic | Adventure | Value) */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-4">
                  {EXPERIENCE_TIERS.map((tier) => {
                    const isSelected = selectedDayTier === tier.id;
                    const isTopPick = !!tier.recommended;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setSelectedDayTier(tier.id);
                          setDayPassGuests(dayPassGuests < 1 ? 1 : dayPassGuests);
                        }}
                        className={`text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-soft ${isTopPick ? 'order-2' : tier.id === 'basic' ? 'order-1' : 'order-3'}`}
                      >
                        <div
                          className={`flex flex-col h-full rounded-3xl border bg-white p-7 relative transition-all duration-500 hover-lift ${
                            isTopPick
                              ? isSelected
                                ? 'border-primary shadow-xl ring-2 ring-primary/30 scale-[1.02]'
                                : 'border-primary/50 shadow-lg hover:shadow-xl hover:border-primary'
                              : isSelected
                                ? 'border-primary shadow-xl ring-1 ring-primary/20'
                                : 'border-gray-200 hover:border-primary/30 hover:shadow-xl'
                          }`}
                        >
                          {isTopPick && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                              Top Pick
                            </span>
                          )}
                          <div className="space-y-3 shrink-0">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-primary font-bold text-sm uppercase tracking-[0.18em]">{tier.name}</h3>
                              <span className="material-symbols-outlined text-primary group-hover:rotate-12 motion-safe:transition-transform" aria-hidden="true">{tier.icon}</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className={`font-extrabold tracking-tight ${isSelected ? 'text-primary text-4xl' : 'text-gray-900 text-3xl'}`}>
                                ₹{tier.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-gray-500 text-sm font-medium">/person</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{tier.description}</p>
                          </div>
                          <ul className="space-y-2 pt-4 border-t border-gray-100 mt-4">
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0" aria-hidden="true">check_circle</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: one card at a time with arrows */}
                <div className="sm:hidden">
                  {(() => {
                    const basicTier = EXPERIENCE_TIERS.find((t) => t.id === 'basic')!;
                    const recommendedTier = EXPERIENCE_TIERS.find((t) => t.recommended)!;
                    const otherTier = EXPERIENCE_TIERS.find(
                      (t) => t.id !== 'basic' && t.id !== recommendedTier.id,
                    )!;
                    const mobileOrder = [basicTier, recommendedTier, otherTier];
                    const tier = mobileOrder[mobileCardIndex];
                    const isSelected = selectedDayTier === tier.id;
                    const isTopPick = !!tier.recommended;
                    return (
                      <div className="relative pt-4">
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedDayTier(tier.id);
                            setDayPassGuests(dayPassGuests < 1 ? 1 : dayPassGuests);
                          }}
                          className="text-left w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          <div
                            className={`flex flex-col rounded-3xl border bg-white p-6 relative transition-all duration-300 ${
                              isTopPick
                                ? isSelected
                                  ? 'border-primary shadow-xl ring-2 ring-primary/30'
                                  : 'border-primary/50 shadow-lg'
                                : isSelected
                                  ? 'border-primary shadow-xl ring-1 ring-primary/20'
                                  : 'border-gray-200'
                            }`}
                          >
                            {isTopPick && (
                              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                                Top Pick
                              </span>
                            )}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-primary font-bold text-sm uppercase tracking-[0.18em]">{tier.name}</h3>
                                <span className="material-symbols-outlined text-primary" aria-hidden="true">{tier.icon}</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className={`font-extrabold tracking-tight ${isSelected ? 'text-primary text-4xl' : 'text-gray-900 text-3xl'}`}>
                                  ₹{tier.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-gray-500 text-sm font-medium">/person</span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">{tier.description}</p>
                            </div>
                            <ul className="space-y-2 pt-4 border-t border-gray-100 mt-4">
                              {tier.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-xs text-gray-700">
                                  <span className="material-symbols-outlined text-primary text-base shrink-0" aria-hidden="true">check_circle</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </button>

                        <div className="flex items-center justify-center gap-4 mt-4">
                          <button
                            type="button"
                            onClick={() => setMobileCardIndex((prev) => Math.max(0, prev - 1))}
                            disabled={mobileCardIndex === 0}
                            className="min-w-[40px] min-h-[40px] rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                            aria-label="Previous pass"
                          >
                            <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_left</span>
                          </button>

                          <div className="flex items-center gap-2" aria-label={`Card ${mobileCardIndex + 1} of 3`}>
                            {[0, 1, 2].map((i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setMobileCardIndex(i)}
                                className={`rounded-full transition-all ${
                                  i === mobileCardIndex ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-gray-300'
                                }`}
                                aria-label={`Go to card ${i + 1}`}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setMobileCardIndex((prev) => Math.min(2, prev + 1))}
                            disabled={mobileCardIndex === 2}
                            className="min-w-[40px] min-h-[40px] rounded-full border border-gray-300 bg-white text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all"
                            aria-label="Next pass"
                          >
                            <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_right</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {selectedDayTier && (
                <>
                  <div>
                    <label className={labelClass}>Number of guests</label>
                    <div className="flex items-center gap-3 max-w-xs">
                      <button
                        type="button"
                        onClick={() =>
                          setDayPassGuests((prev) => Math.max(1, Math.min(99, prev - 1)))
                        }
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                        aria-label="Decrease guests"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={dayPassGuests === 0 ? '' : dayPassGuests}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d]/g, '');
                          if (raw === '') {
                            setDayPassGuests(0);
                            return;
                          }
                          const next = parseInt(raw, 10);
                          if (Number.isNaN(next)) return;
                          setDayPassGuests(Math.max(1, Math.min(99, next)));
                        }}
                        className="w-20 text-center font-bold text-lg border border-gray-200 rounded-xl py-2 px-2 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                        aria-label="Number of guests"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDayPassGuests((prev) => Math.max(1, Math.min(99, prev + 1)))
                        }
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowDayAddons((prev) => !prev)}
                      className="flex items-center justify-between w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-left text-sm font-semibold text-primary hover:border-amber-400 hover:bg-amber-100/70 transition-colors"
                      aria-expanded={showDayAddons}
                    >
                      <p className="text-sm font-semibold text-primary">Add room to your day spend?</p>
                      <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                        {showDayAddons ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>

                    {showDayAddons && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
                        {SANCTUARIES.map((s) => {
                          const n = dayAddonRooms[s.id] ?? 0;
                          const cfg = ROOM_CONFIG[s.id];
                          return (
                            <div
                              key={s.id}
                              className={`rounded-xl border-2 overflow-hidden transition-all h-full flex flex-col ${
                                n > 0
                                  ? 'border-primary ring-2 ring-primary/20'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div className="flex flex-row sm:flex-col h-full">
                                <div className="w-28 h-full shrink-0 sm:w-full sm:h-36 bg-gray-100">
                                  <img src={wixImg(s.image, 160, 144)} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="flex-1 flex items-center justify-between gap-2 p-3 sm:p-2.5">
                                  <div className="min-w-0">
                                    <span className="font-bold text-primary text-sm block truncate">{s.name}</span>
                                    <span className="text-xs text-gray-500 block">
                                      ₹{s.price.toLocaleString('en-IN')}/room · 11 AM – 7 PM
                                    </span>
                                  </div>
                                  <div className="shrink-0">
                                    <Stepper
                                      value={n}
                                      min={0}
                                      max={cfg?.maxExtraPerRoom ?? MAX_ROOMS_PER_TYPE}
                                      onChange={(v) => setDayAddonRoom(s.id, v)}
                                      ariaLabel={s.name}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </section>
          )}

          {visitType === 'night' && (
            <section aria-labelledby="night-stay-heading" className="space-y-6">
              <h2 id="night-stay-heading" className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">hotel</span>
                Stay
              </h2>

              <p className={labelClass}>Room type</p>

              {/* ─── Premium Room Type Tabs (Pill style) ─── */}
              <nav
                className="night-room-tabs-nav"
                aria-label="Jump to a room type"
              >
                {NIGHT_ROOMS.map((room) => {
                  const isActive = nightStayNavActive === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => scrollToNightStaySection(room.id)}
                      className={`night-room-tab ${isActive ? 'night-room-tab--active' : ''}`}
                    >
                      {room.title}
                    </button>
                  );
                })}
              </nav>

              {/* ─── Room Cards ─── */}
              <div className="night-rooms-grid">
                {/* Cabana */}
                <article
                  ref={cabanaSectionRef}
                  id="book-night-cabana"
                  className="night-room-card scroll-mt-24 sm:scroll-mt-28"
                >
                  <div className="night-room-card__body">
                    <div className="min-w-0">
                      <NightStayRoomGallery images={getNightRoom('cabana').images} title="The Cabana" />
                    </div>
                    <footer className="night-room-card__footer">
                      <h3 className="night-room-card__title">The Cabana</h3>
                      <NightStayRoomTabs className="night-room-card__cta" />
                    </footer>
                  </div>
                </article>

                {/* Villa */}
                <article
                  ref={villaSectionRef}
                  id="book-night-villa"
                  className="night-room-card scroll-mt-24 sm:scroll-mt-28"
                >
                  <div className="night-room-card__body">
                    <div className="min-w-0">
                      <NightStayRoomGallery images={getNightRoom('villa').images} title="The Villa" />
                    </div>
                    <footer className="night-room-card__footer">
                      <h3 className="night-room-card__title">The Villa</h3>
                      <NightStayRoomTabs className="night-room-card__cta" />
                    </footer>
                  </div>
                </article>

                {/* Cottage */}
                <article
                  ref={cottageSectionRef}
                  id="book-night-cottage"
                  className="night-room-card scroll-mt-24 sm:scroll-mt-28"
                >
                  <div className="night-room-card__body">
                    <div className="min-w-0">
                      <NightStayRoomGallery images={getNightRoom('cottage').images} title="The Cottage" />
                    </div>
                    <footer className="night-room-card__footer">
                      <h3 className="night-room-card__title">The Cottage</h3>
                      <NightStayRoomTabs className="night-room-card__cta" />
                    </footer>
                  </div>
                </article>
              </div>
            </section>
          )}

          <section aria-labelledby="date-heading">
            <h2 id="date-heading" className="sr-only">
              When
            </h2>
            {canShowDateSection && (
              <>
                {visitType === 'night' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-checkin" className={labelClass}>
                        Check-in date
                      </label>
                      <input
                        id="book-checkin"
                        type="date"
                        name="checkInDate"
                        className={inputClass}
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        onClick={(e) => {
                          const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                          input.showPicker?.();
                        }}
                        required
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="book-checkout" className={labelClass}>
                        Check-out date
                      </label>
                      <input
                        id="book-checkout"
                        type="date"
                        name="checkOutDate"
                        className={inputClass}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        onClick={(e) => {
                          const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                          input.showPicker?.();
                        }}
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="book-date" className={labelClass}>
                      Entry date
                    </label>
                    <input
                      id="book-date"
                      type="date"
                      name="date"
                      className={inputClass}
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      onClick={(e) => {
                        const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                        input.showPicker?.();
                      }}
                      required
                      aria-required="true"
                    />
                  </div>
                )}
              </>
            )}
          </section>

          {canShowDetailsSection && (
            <section aria-labelledby="details-heading">
              <h2 id="details-heading" className="sr-only">
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
                {visitType === 'day' && (
                  <div>
                    <label htmlFor="book-company" className={labelClass}>
                      Company name <span className="text-gray-400 text-xs font-normal">(optional)</span>
                    </label>
                    <input
                      id="book-company"
                      type="text"
                      name="company"
                      className={inputClass}
                      placeholder="Your company (optional)"
                      aria-required="false"
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Hidden fields for submission */}
          {visitType === 'day' && <input type="hidden" name="visitType" value="day" />}
          {visitType === 'night' && <input type="hidden" name="visitType" value="night" />}
          {selectedDayTier && <input type="hidden" name="dayPass" value={selectedDayTier} />}
          {visitType === 'day' && (
            <input type="hidden" name="dayPassGuests" value={Math.max(1, dayPassGuests || 0)} />
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

          {/* Mobile summary (above submit) */}
          {shouldShowSummary && (
            <div className="md:hidden">
              {summaryBlock}
            </div>
          )}

          {/* Submit button (after contact form) */}
          {visitType !== 'night' && (
            <section className="pt-4 border-t-2 border-gray-100">
              <button
                type="submit"
                form="booking-form"
                disabled={!visitType || (visitType === 'day' && !selectedDayTier)}
                className="w-full min-h-[52px] bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
              >
                Submit booking request
              </button>
            </section>
          )}
        </form>

        {/* Booking summary: desktop only, sticky beside the form */}
        {shouldShowSummary && (
          <aside
            className="hidden md:block sticky top-24"
            aria-label="Booking summary"
          >
            {summaryBlock}
          </aside>
        )}
      </div>
    </div>
  );
};
