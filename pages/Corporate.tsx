import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { AmenityTabs } from '../components/AmenityTabs';
import { Testimonials } from '../components/Testimonials';
import { Feature } from '../types';
import { INCLUDED_FEATURES } from '../constants';

const BROCHURE_URL = '#'; // replace with actual brochure link when available

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
    company: 'Radisson',
    testimonial:
      'Our regional leadership team had a fantastic offsite at Salsons Retreat. The pool, food, and open spaces made it the perfect break from routine.',
    image:
      'https://static.wixstatic.com/media/9356bd_6208e3777f554b45bac8222ec20c614f~mv2.jpg',
  },
  {
    id: 'card-2',
    company: 'Tech Mahindra',
    testimonial:
      'We brought 80+ engineers for a team-building day. The sports, boating, and BBQ kept everyone engaged — highly recommended for large teams.',
    image:
      'https://static.wixstatic.com/media/9356bd_0b96740b7f94421390f2ef977fb2966d~mv2.jpg',
  },
  {
    id: 'card-3',
    company: 'Infosys',
    testimonial:
      'A refreshing change from conference rooms. The farm-to-table lunch and rain dance pool were highlights for our quarterly outing.',
    image:
      'https://static.wixstatic.com/media/9356bd_b4992d19dffc46869c5b07039e4b47cb~mv2.jpg',
  },
];

const ITINERARY_ITEMS = [
  {
    id: 'it-1',
    time: '9:30 AM',
    title: 'Arrival & Welcome Drink',
    image: 'https://static.wixstatic.com/media/9356bd_cf3a8a3d18cf48e8897bc3c754cba84b~mv2.jpg',
  },
  {
    id: 'it-2',
    time: '10:00 AM',
    title: 'Team Games & Sports',
    image: 'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
  },
  {
    id: 'it-3',
    time: '11:30 AM',
    title: 'Pool & Rain Dance',
    image: 'https://static.wixstatic.com/media/9356bd_d054a7523ffe40a19119b7d594c1dc32~mv2.webp',
  },
  {
    id: 'it-4',
    time: '1:30 PM',
    title: 'Andhra Lunch Buffet',
    image: 'https://static.wixstatic.com/media/9356bd_2bd050337a89460eb03a3ae211182d6a~mv2.webp',
  },
  {
    id: 'it-5',
    time: '3:00 PM',
    title: 'Boating & Team Activities',
    image: 'https://static.wixstatic.com/media/9356bd_37765711a58044968ecb66adb3beff87~mv2.jpg',
  },
  {
    id: 'it-6',
    time: '5:00 PM',
    title: 'Tea & Snacks',
    image: 'https://static.wixstatic.com/media/9356bd_b9b735c1f92f4b2a94d7db8cfe09eba1~mv2.webp',
  },
  {
    id: 'it-7',
    time: '6:30 PM',
    title: 'Wrap Up & Departures',
    image: 'https://static.wixstatic.com/media/9356bd_cb187cfabdf14aab8cf12939d9b5346d~mv2.jpg',
  },
];

export const Corporate: React.FC = () => {
  const trustedCarouselRef = useRef<HTMLDivElement | null>(null);
  const itineraryCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const scrollTrusted = (direction: 'left' | 'right') => scrollCarousel(trustedCarouselRef, direction);
  const scrollItinerary = (direction: 'left' | 'right') => scrollCarousel(itineraryCarouselRef, direction);

  return (
    <main id="main-content" className="pt-12 sm:pt-16 bg-white">
      {/* 1. Hero banner */}
      <section
        className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden"
        aria-labelledby="corporate-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg")',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
            For Corporates
          </p>
          <h1
            id="corporate-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Corporate team outing near Vizag
          </h1>
          <p className="text-white/90 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            A refreshing day in nature with activities, food, and team bonding at Salsons Retreat.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-2 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                distance
              </span>
              <span>70 km from Vizag</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-2 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                currency_rupee
              </span>
              <span>Packages from ₹990</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-2 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                groups
              </span>
              <span>Ideal for 30–150 teams</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
            <Link
              to="/book-now"
              className="inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-white text-primary shadow-lg hover:bg-[rgba(255,255,255,0.9)] hover:shadow-xl transition-colors"
            >
              Book Now
            </Link>
            <a
              href={BROCHURE_URL}
              target={BROCHURE_URL === '#' ? undefined : '_blank'}
              rel={BROCHURE_URL === '#' ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/5 px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Download Brochure
            </a>
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
            <p className="text-primary/70 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
              Trusted by leading teams
            </p>
            <h2
              id="trusted-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
            >
              A nature-first venue for your next offsite
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              From small leadership huddles to full-team outings, Salsons Retreat gives your teams space to connect,
              think, and celebrate together.
            </p>
          </header>

          {/* Mobile carousel */}
          <div className="md:hidden -mx-4 px-4 relative">
            <div
              ref={trustedCarouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TRUSTED_CARDS.map((card) => (
                <article
                  key={card.id}
                  className="min-w-[280px] max-w-[85%] rounded-2xl overflow-hidden bg-white shadow-md snap-start border border-gray-100"
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
                    <h3 className="text-base font-bold text-gray-900">{card.company}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{card.testimonial}&rdquo;</p>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollTrusted('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label="Scroll previous"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTrusted('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label="Scroll next"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">chevron_right</span>
            </button>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {TRUSTED_CARDS.map((card) => (
              <article
                key={card.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-lg [@media(prefers-reduced-motion:reduce)]:transition-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.company} team at Salsons Retreat`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 lg:p-6 space-y-3 flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{card.company}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{card.testimonial}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sample corporate itinerary — Expansion Gallery */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden"
        aria-labelledby="itinerary-heading"
      >
        <div className="max-w-[1400px] mx-auto space-y-10 lg:space-y-14">
          <h2
            id="itinerary-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 text-center"
          >
            Sample Corporate Itinerary
          </h2>

          {/* ── Mobile / Tablet: snap carousel with arrows ── */}
          <div className="lg:hidden relative">
            <div
              ref={itineraryCarouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {ITINERARY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="relative min-w-[75vw] max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden snap-center shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5">
                    <p className="text-xs font-semibold text-violet-300 tracking-wide">{item.time}</p>
                    <h3 className="text-base font-semibold text-white leading-snug">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollItinerary('left')}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-white/20 text-gray-800 hover:bg-white transition-colors"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollItinerary('right')}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-white/20 text-gray-800 hover:bg-white transition-colors"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">chevron_right</span>
            </button>
          </div>

          {/* ── Desktop: Expansion gallery ── */}
          <div className="hidden lg:block">
            <style>{`
              .exp-gallery { display: flex; gap: 12px; height: 480px; }
              .exp-card {
                flex: 1; position: relative; border-radius: 24px; overflow: hidden; cursor: pointer;
                transition: flex 0.5s cubic-bezier(0.16,1,0.3,1);
              }
              @media (prefers-reduced-motion: reduce) {
                .exp-card { transition: none; }
                .exp-card img { transition: none !important; }
                .exp-card .exp-time-label { transition: none !important; }
              }
              .exp-card:hover { flex: 2.5; }
              .exp-card::after {
                content: ''; position: absolute; inset: 0;
                background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, transparent 100%);
                transition: background 0.5s cubic-bezier(0.16,1,0.3,1);
              }
              .exp-card:hover::after {
                background: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 100%);
              }
              .exp-card img {
                width: 100%; height: 100%; object-fit: cover;
                transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
              }
              .exp-card:hover img { transform: scale(1.05); }
              .exp-card .exp-time-label {
                transform: translateY(8px); opacity: 0.7;
                transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
              }
              .exp-card:hover .exp-time-label { transform: translateY(0); opacity: 1; }
            `}</style>
            <div className="exp-gallery">
              {ITINERARY_ITEMS.map((item) => (
                <div key={item.id} className="exp-card" role="img" aria-label={`${item.time} — ${item.title}`}>
                  <img src={item.image} alt="" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col">
                    <span className="exp-time-label text-violet-300 text-sm font-semibold mb-1.5">
                      {item.time}
                    </span>
                    <h3 className="text-white text-base font-semibold leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Activities for team bonding (tabs) */}
      <section
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white"
        aria-labelledby="activities-heading"
      >
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
          <header className="max-w-3xl space-y-4">
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
            <AmenityTabs features={CORPORATE_ACTIVITIES.length ? CORPORATE_ACTIVITIES : INCLUDED_FEATURES} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. Testimonials (same as home) */}
      <Testimonials />

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
              <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white aspect-[4/3] min-h-[280px]">
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
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Floating Download Brochure button (replaces WhatsApp on this page) */}
      <a
        href={BROCHURE_URL}
        target={BROCHURE_URL === '#' ? undefined : '_blank'}
        rel={BROCHURE_URL === '#' ? undefined : 'noopener noreferrer'}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-primary text-white px-5 py-3.5 shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 [@media(prefers-reduced-motion:reduce)]:transition-none"
        aria-label="Download brochure"
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">
          download
        </span>
        <span className="text-sm font-semibold hidden sm:inline">Download Brochure</span>
      </a>
    </main>
  );
};
