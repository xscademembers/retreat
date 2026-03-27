import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { AmenityTabs } from '../components/AmenityTabs';
import { Testimonials } from '../components/Testimonials';
import { LazySection } from '../components/LazySection';
import { Feature } from '../types';
import { CORPORATE_ITINERARY_IMAGE_URLS, INCLUDED_FEATURES } from '../constants';
import { useInView } from '../hooks/useInView';

/** Hero banner — team / outdoor image (same CDN as itinerary section) */
const CORPORATE_HERO_IMAGE =
  'https://static.wixstatic.com/media/9356bd_2c051a01ea864ef7a45e33b1d78a1307~mv2.png';

const CORPORATE_ACTIVITIES: Feature[] = [
  {
    id: 'swim',
    title: 'Swimming Pool',
    description: 'Relax and refresh with your team in our crystal-clear pool, ideal for post-meeting unwinds.',
    icon: 'pool',
  },
  {
    id: 'cricket-activity',
    title: 'Cricket',
    description: 'Set up friendly matches and tournaments on our open lawns for team bonding.',
    icon: 'sports_cricket',
  },
  {
    id: 'volleyball-activity',
    title: 'Volleyball',
    description: 'High-energy volleyball sessions that get everyone involved, on and off the court.',
    icon: 'sports_volleyball',
  },
  {
    id: 'boating-activity',
    title: 'Boating',
    description: 'Gentle boating experiences at Thatipudi Reservoir, just minutes from the retreat.',
    icon: 'sailing',
  },
  {
    id: 'bonfire-activity',
    title: 'Bonfire',
    description: 'Close the day around a warm bonfire with conversations, music, and stories.',
    icon: 'local_fire_department',
  },
];

const TRUSTED_CARDS = [
  {
    id: 'card-1',
    company: 'Radisson Blu',
    people: '180 ppl',
    package: 'Day Spend (Basic – ₹990)',
    transport: 'Arranged by Retreat',
    image:
      'https://static.wixstatic.com/media/9356bd_9263a380c43f47029d97d3ca7448116c~mv2.jpeg',
  },
  {
    id: 'card-2',
    company: 'Oxford School',
    people: '120 ppl',
    package: 'Day Spend (Basic – ₹990)',
    transport: 'Arranged by Retreat',
    image:
      'https://static.wixstatic.com/media/9356bd_0b96740b7f94421390f2ef977fb2966d~mv2.jpg',
  },
  {
    id: 'card-3',
    company: 'Shriram Life Insurance',
    people: '50 ppl',
    package: 'Night Stay (Full Retreat)',
    transport: 'Own Arrangement',
    image:
      'https://static.wixstatic.com/media/9356bd_b4992d19dffc46869c5b07039e4b47cb~mv2.jpg',
  },
  {
    id: 'card-4',
    company: 'Kotak School',
    people: '70 ppl',
    package: 'Day Spend (Basic – ₹990)',
    transport: 'Own Arrangement',
    image:
      'https://static.wixstatic.com/media/9356bd_37765711a58044968ecb66adb3beff87~mv2.jpg',
  },
  {
    id: 'card-5',
    company: 'Bothra Shipping',
    people: '250 ppl',
    package: 'Day Spend (Basic – ₹990)',
    transport: 'Own Arrangement',
    image:
      'https://static.wixstatic.com/media/9356bd_72b4de6522874b8cb019957a09d9fb79~mv2.jpg',
  },
  {
    id: 'card-6',
    company: 'Tech Tammina',
    people: '30 ppl',
    package: 'Night Stay (Full Retreat)',
    transport: 'Own Arrangement',
    image:
      'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
  },
  {
    id: 'card-7',
    company: 'Muthoot Finance',
    people: '30 ppl',
    package: 'Night Stay (Full Retreat)',
    transport: 'Own Arrangement',
    image:
      'https://static.wixstatic.com/media/9356bd_3c005c17da944e3e9f9c73647e1c5d51~mv2.jpg',
  },
];

const ITINERARY_STEPS = [
  { id: 'it-1', time: '9:30 AM', title: 'Arrival & welcome drink' },
  { id: 'it-2', time: '10:00 AM', title: 'Team games & sports' },
  { id: 'it-3', time: '11:30 AM', title: 'Pool & rain dance' },
  { id: 'it-4', time: '1:30 PM', title: 'Andhra lunch buffet' },
  { id: 'it-5', time: '3:00 PM', title: 'Boating / team activities' },
  { id: 'it-6', time: '5:00 PM', title: 'Tea & snacks' },
  { id: 'it-7', time: '6:30 PM', title: 'Wrap up & departures' },
] as const;

const ITINERARY_ITEMS = ITINERARY_STEPS.map((step, index) => ({
  ...step,
  image: CORPORATE_ITINERARY_IMAGE_URLS[index],
}));

const CLONE_COUNT = 1;
const MOBILE_LOOP_CARDS = [
  ...TRUSTED_CARDS.slice(-CLONE_COUNT).map((c, i) => ({ ...c, _key: `clone-tail-${i}` })),
  ...TRUSTED_CARDS.map((c) => ({ ...c, _key: c.id })),
  ...TRUSTED_CARDS.slice(0, CLONE_COUNT).map((c, i) => ({ ...c, _key: `clone-head-${i}` })),
];

const LazyMapEmbed: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, rootMargin: '300px 0px' });
  return (
    <div ref={ref} className="w-full h-full relative">
      {isInView ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.9033241741747!2d83.2187149!3d18.168366900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bc263d91a65e9%3A0x3b1d67813f341ee4!2sSalsons%20Retreat!5e0!3m2!1sen!2sin!4v1771088032329!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Salsons Retreat location on Google Maps"
        />
      ) : (
        // Placeholder to keep layout stable while iframe loads
        <div className="absolute inset-0 bg-background-soft" aria-hidden="true" />
      )}
    </div>
  );
};

export const Corporate: React.FC = () => {
  const trustedDesktopRef = useRef<HTMLDivElement | null>(null);
  const trustedMobileRef = useRef<HTMLDivElement | null>(null);
  const pricingMobileRef = useRef<HTMLDivElement | null>(null);
  const isRepositioning = useRef(false);

  const scrollToCardIndex = useCallback((el: HTMLDivElement, idx: number, smooth = false) => {
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: offset, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  useEffect(() => {
    const el = trustedMobileRef.current;
    if (!el) return;
    scrollToCardIndex(el, CLONE_COUNT, false);
  }, [scrollToCardIndex]);

  useEffect(() => {
    const el = trustedMobileRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;
    const reposition = () => {
      if (isRepositioning.current) return;
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      const totalReal = TRUSTED_CARDS.length;

      let idx = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < best) { best = d; idx = i; }
      });

      if (idx < CLONE_COUNT) {
        isRepositioning.current = true;
        scrollToCardIndex(el, idx + totalReal, false);
        requestAnimationFrame(() => { isRepositioning.current = false; });
      } else if (idx >= CLONE_COUNT + totalReal) {
        isRepositioning.current = true;
        scrollToCardIndex(el, idx - totalReal, false);
        requestAnimationFrame(() => { isRepositioning.current = false; });
      }
    };

    const onScroll = () => { clearTimeout(timeout); timeout = setTimeout(reposition, 120); };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); clearTimeout(timeout); };
  }, [scrollToCardIndex]);

  const scrollMobile = useCallback((direction: 'left' | 'right') => {
    const el = trustedMobileRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const amount = card.offsetWidth + gap;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  const scrollDesktop = useCallback((direction: 'left' | 'right') => {
    const el = trustedDesktopRef.current;
    if (!el) return;
    const card = el.querySelector('article') as HTMLElement | null;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const amount = card.offsetWidth + gap;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    const atStart = el.scrollLeft <= 2;
    if (direction === 'right' && atEnd) {
      el.scrollTo({ left: 0, behavior: reduced ? 'auto' : 'smooth' });
    } else if (direction === 'left' && atStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: reduced ? 'auto' : 'smooth' });
    } else {
      el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: reduced ? 'auto' : 'smooth' });
    }
  }, []);

  const scrollPricingMobile = useCallback((direction: 'left' | 'right') => {
    const el = pricingMobileRef.current;
    if (!el) return;
    const card = el.querySelector('article') as HTMLElement | null;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const amount = card.offsetWidth + gap;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  return (
    <main id="main-content" className="pt-12 sm:pt-16 bg-white">
      {/* 1. Hero banner */}
      <section
        className="relative min-h-screen flex items-center text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden"
        aria-labelledby="corporate-hero-heading"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={CORPORATE_HERO_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/35" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
          <div className="max-w-3xl space-y-4 sm:space-y-6 text-left">
            <h1
              id="corporate-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
            >
              <span className="block lg:whitespace-nowrap">Corporate team outing near Vizag</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
              A refreshing day in nature with activities, food, and team bonding at Salsons Retreat.
            </p>
            <ul className="list-disc list-outside pl-5 sm:pl-6 max-w-xl space-y-2 text-base sm:text-lg text-white/80 marker:text-white/50">
              <li>70 km from Vizag</li>
              <li>Packages from ₹990</li>
              <li>Ideal for 30–300 teams</li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/book-now"
                className="bg-white text-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-bold hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-2px] active:translate-y-0 transition-all duration-300 inline-flex items-center justify-center gap-2 [@media(prefers-reduced-motion:reduce)]:hover:translate-y-0 [@media(prefers-reduced-motion:reduce)]:transition-none"
              >
                Book Now
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  north_east
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted by leading teams */}
      <section
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white"
        aria-labelledby="trusted-heading"
      >
        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-12">
          <header className="text-center max-w-3xl mx-auto space-y-4">
            <h2
              id="trusted-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Trusted by leading teams
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              From small leadership huddles to full-team outings, Salsons Retreat gives your teams space to connect,
              think, and celebrate together.
            </p>
          </header>

          {/* Mobile infinite-loop carousel */}
          <div className="relative md:hidden">
            <div
              ref={trustedMobileRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide px-[5%]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {MOBILE_LOOP_CARDS.map((card) => (
                <article
                  key={card._key}
                  className="w-[87%] flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 snap-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={`${card.company} team at Salsons Retreat`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">{card.company}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">group</span>
                        <span><span className="font-semibold text-gray-800">People:</span> {card.people}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">inventory_2</span>
                        <span><span className="font-semibold text-gray-800">Package:</span> {card.package}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">directions_bus</span>
                        <span><span className="font-semibold text-gray-800">Transport:</span> {card.transport}</span>
                      </li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollMobile('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Previous card"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollMobile('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Next card"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_right</span>
            </button>
          </div>

          {/* Desktop carousel */}
          <div className="relative hidden md:block -mx-4 px-4">
            <div
              ref={trustedDesktopRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TRUSTED_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="w-[32%] lg:w-[30%] flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 snap-start transition-shadow duration-300 hover:shadow-lg [@media(prefers-reduced-motion:reduce)]:transition-none"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={`${card.company} team at Salsons Retreat`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 lg:p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">{card.company}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">group</span>
                        <span><span className="font-semibold text-gray-800">People:</span> {card.people}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">inventory_2</span>
                        <span><span className="font-semibold text-gray-800">Package:</span> {card.package}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">directions_bus</span>
                        <span><span className="font-semibold text-gray-800">Transport:</span> {card.transport}</span>
                      </li>
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollDesktop('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Scroll previous"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollDesktop('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Scroll next"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sample corporate itinerary — horizontal timeline (desktop) / vertical (mobile) */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-itinerary-bg overflow-x-clip overflow-y-visible"
        aria-labelledby="itinerary-heading"
      >
        <div className="max-w-[1400px] mx-auto space-y-8 lg:space-y-10">
          <header className="text-left">
            <h2
              id="itinerary-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-itinerary-text"
            >
              Your team&apos;s day at Salsons
            </h2>
          </header>

          {/* Mobile & tablet: vertical straight spine (between first/last circle centres) */}
          <div className="relative isolate min-h-0 overflow-visible lg:hidden">
            <span
              className="pointer-events-none absolute left-[48px] top-[48px] bottom-[48px] z-0 w-0.5 -translate-x-1/2 rounded-full bg-itinerary-spine sm:left-[56px] sm:top-[56px] sm:bottom-[56px]"
              aria-hidden="true"
            />
            <ol className="relative z-[1] m-0 list-none space-y-8 p-0" aria-label="Itinerary schedule">
              {ITINERARY_ITEMS.map((item) => (
                <li key={item.id} className="relative z-[1] flex gap-4 sm:gap-5">
                  <div className="relative z-[2] flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-itinerary-line bg-background-light shadow-md sm:h-28 sm:w-28">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 ease-out [@media(prefers-reduced-motion:no-preference)]:hover:scale-105 [@media(prefers-reduced-motion:reduce)]:transition-none"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex flex-col justify-center gap-1 py-0.5">
                    <p className="text-sm font-bold leading-tight text-itinerary-text">{item.time}</p>
                    <p className="text-sm font-normal leading-snug text-itinerary-text-soft">
                      {item.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop: horizontal straight line through circle centres (no extension past first/last) */}
          <div className="hidden lg:block">
            <div className="relative pb-4 pt-2">
              <span
                className="pointer-events-none absolute left-[calc((100%-3rem)/14)] right-[calc((100%-3rem)/14)] top-[56px] z-0 h-0.5 -translate-y-1/2 rounded-full bg-itinerary-spine xl:left-[calc((100%-4.5rem)/14)] xl:right-[calc((100%-4.5rem)/14)] xl:top-[64px]"
                aria-hidden="true"
              />
              <ul className="relative z-10 m-0 flex list-none flex-row gap-2 p-0 xl:gap-3 [&>li]:min-w-0 [&>li]:flex-1">
                {ITINERARY_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    className="group flex min-w-0 flex-1 flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-24 w-24 shrink-0 items-center justify-center xl:h-28 xl:w-28">
                      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-itinerary-line bg-background-light shadow-md xl:h-28 xl:w-28">
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 ease-out [@media(prefers-reduced-motion:no-preference)]:group-hover:scale-105 [@media(prefers-reduced-motion:reduce)]:transition-none"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <p className="mb-2 text-xs font-bold leading-tight text-itinerary-text xl:text-sm">
                      {item.time}
                    </p>
                    <p className="max-w-[9rem] text-xs font-normal leading-snug text-itinerary-text-soft xl:max-w-[10.5rem] xl:text-sm">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing packages */}
      <section
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto">
          <header className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Packages for every team
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Choose the experience that fits your team&apos;s vibe and budget.
            </p>
          </header>

          <div className="relative">
            <div
              ref={pricingMobileRef}
              className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 scrollbar-hide px-[5%] md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {/* Basic */}
            <article className="relative w-[87%] md:w-auto flex-shrink-0 md:flex-shrink flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm snap-center md:snap-start md:min-h-[520px] transition-shadow duration-300 hover:shadow-lg [@media(prefers-reduced-motion:reduce)]:transition-none">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-900">Basic</h3>
                <span className="material-symbols-outlined text-2xl text-gray-400" aria-hidden="true">diamond</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">₹990</span>
                <span className="text-base text-gray-500 ml-1">/person</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Entry, pool access, farm-to-table lunch, and sports. Perfect for a relaxed day in nature.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {[
                  'Entry & welcome drink',
                  'Pool access',
                  'Lunch (farm-to-table, fresh hot Andhra food)',
                  'Sports (Cricket, Basketball, Football, Volleyball, Throwball)',
                  'Evening tea & cookies',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
                    <span className="inline-flex h-5 w-5 items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-base leading-none">check_circle</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/book-now"
                className="mt-auto w-full inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-8 py-3.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors [@media(prefers-reduced-motion:reduce)]:transition-none"
              >
                Book Now
              </Link>
            </article>

            {/* Value — TOP PICK */}
            <article className="relative w-[87%] md:w-auto flex-shrink-0 md:flex-shrink flex flex-col rounded-2xl border-2 border-primary bg-white p-6 sm:p-8 shadow-lg snap-center md:snap-start md:min-h-[520px] transition-shadow duration-300 hover:shadow-xl [@media(prefers-reduced-motion:reduce)]:transition-none">
              <span className="absolute top-3 md:-top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full z-10">
                Top Pick
              </span>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-900">Value</h3>
                <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">equalizer</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">₹1,299</span>
                <span className="text-base text-gray-500 ml-1">/person</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Everything in Basic plus mouth-watering barbecue on our breezy poolside deck.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {[
                  'Everything in Basic',
                  'Barbecue (veg & non-veg options available)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
                    <span className="inline-flex h-5 w-5 items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-base leading-none">check_circle</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/book-now"
                className="mt-auto w-full inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-primary/90 transition-colors [@media(prefers-reduced-motion:reduce)]:transition-none"
              >
                Book Now
              </Link>
            </article>

            {/* Adventure */}
            <article className="relative w-[87%] md:w-auto flex-shrink-0 md:flex-shrink flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm snap-center md:snap-start md:min-h-[520px] transition-shadow duration-300 hover:shadow-lg [@media(prefers-reduced-motion:reduce)]:transition-none">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-900">Adventure</h3>
                <span className="material-symbols-outlined text-2xl text-gray-400" aria-hidden="true">landscape</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-gray-900">₹1,499</span>
                <span className="text-base text-gray-500 ml-1">/person</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Everything in Value plus scenic boating at Thatipudi Reservoir, just 2 minutes away.
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {[
                  'Everything in Basic',
                  'Barbecue (veg & non-veg options available)',
                  'Boating at Thatipudi Reservoir',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
                    <span className="inline-flex h-5 w-5 items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <span className="material-symbols-outlined text-primary text-base leading-none">check_circle</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/book-now"
                className="mt-auto w-full inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-8 py-3.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors [@media(prefers-reduced-motion:reduce)]:transition-none"
              >
                Book Now
              </Link>
            </article>
            </div>
            <button
              type="button"
              onClick={() => scrollPricingMobile('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex md:hidden items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Previous package"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollPricingMobile('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex md:hidden items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Next package"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Activities for team bonding (tabs) */}
      <section
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white"
        aria-labelledby="activities-heading"
      >
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <h2
              id="activities-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              Activities for team bonding
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Mix and match pool time, sports, boating, and bonfires to design a day that fits your team&apos;s energy
              and comfort levels.
            </p>
          </header>

          <AnimateOnScroll animation="fade-up">
            <AmenityTabs
              features={CORPORATE_ACTIVITIES.length ? CORPORATE_ACTIVITIES : INCLUDED_FEATURES}
              imageAlign="left"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. Testimonials (same as home) */}
      <LazySection id="testimonials" minHeight={420}>
        <Testimonials />
      </LazySection>

      {/* 6. Find us here (same layout as home) */}
      <section
        id="contact"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-background-soft"
        aria-labelledby="find-us-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <AnimateOnScroll animation="fade-right">
              <div className="max-w-2xl mx-auto text-center">
                <h2
                  id="find-us-heading"
                  className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4"
                >
                  Find Us Here
                </h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                  Your Escape Awaits
                </h3>
                <div
                  className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"
                  aria-hidden="true"
                />
                <p className="text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">
                  Located in peaceful North Andhra, approximately 70km from Vizag. Contact us on WhatsApp for bookings
                  and assistance.
                </p>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 text-left w-full max-w-md mx-auto sm:mx-0 sm:inline-block">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-primary mb-1">Salsons Retreat</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-gray-100" aria-hidden="true" />
                    <div className="flex items-start gap-4">
                      <div
                        className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="material-symbols-outlined text-primary text-2xl">phone</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-primary mb-1">
                          Call or WhatsApp <span className="font-normal text-base text-gray-500">(Mr. Vishnu)</span>
                        </h4>
                        <p className="text-sm text-gray-500">
                          <a href="tel:+918074799387" className="hover:text-primary transition-colors">
                            +91 80747 99387
                          </a>
                          <span className="text-gray-300 mx-2">·</span>
                          <a href="tel:+917569242082" className="hover:text-primary transition-colors">
                            +91 75692 42082
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/book-now"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left">
              <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white aspect-[4/3] min-h-[280px] relative">
                <LazyMapEmbed />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

    </main>
  );
};
