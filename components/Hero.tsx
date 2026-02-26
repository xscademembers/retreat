
import React, { useEffect, useState } from 'react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  mediaType: 'image' | 'video';
  src: string;
  position?: 'center' | 'top' | 'bottom';
}

const SLIDES: HeroSlide[] = [
  {
    id: 'nature',
    title: 'Your Day in Nature',
    subtitle: 'Just 70 km from Vizag',
    description:
      'Wake up to misty hills, palm trees, and wide open lawns at our 6‑acre retreat in Thatipudi.',
    mediaType: 'image',
    src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250205_064653.jpg',
    position: 'center',
  },
  {
    id: 'pool',
    title: 'Pool, Rain Dance & BBQ',
    subtitle: 'All in a Single Day',
    description:
      'Make a splash in the party pool, dance in the rain zone, and unwind with a warm barbecue by the deck.',
    mediaType: 'image',
    src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC2150%20(2).JPG',
    position: 'center',
  },
  {
    id: 'boating',
    title: 'Boating at Thatipudi',
    subtitle: '2 Minutes from the Retreat',
    description:
      'Glide over calm waters surrounded by hills before returning to your private farm getaway.',
    mediaType: 'image',
    src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250227_164908.jpg',
    position: 'center',
  },
  {
    id: 'stay',
    title: 'Cabana, Cottage & Villa',
    subtitle: 'Add Rooms to Your Day Pass',
    description:
      'Upgrade your daycation with private cabanas, a cozy cottage, or a serene villa facing lush greens.',
    mediaType: 'image',
    src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/DSC07622.JPG',
    position: 'center',
  },
];

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  const activeSlide = SLIDES[current];

  const goTo = (index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  };

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Featured experiences at Salsons Retreat"
    >
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={index !== current}
        >
          {slide.mediaType === 'image' ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url('${slide.src}')`,
                backgroundPosition:
                  slide.position === 'top'
                    ? 'top center'
                    : slide.position === 'bottom'
                    ? 'bottom center'
                    : 'center center',
              }}
            />
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slide.src} />
            </video>
          )}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full px-4 sm:px-6 lg:px-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 sm:gap-10">
          <div key={activeSlide.id} className="max-w-3xl space-y-4 sm:space-y-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/70 hero-animate-in hero-animate-in-delay-1">
              Day Pass · Near Vizag
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight hero-animate-in hero-animate-in-delay-2">
              <span className="block lg:whitespace-nowrap">{activeSlide.title}</span>
              {activeSlide.subtitle && (
                <span className="mt-3 block text-lg sm:text-2xl lg:text-3xl font-light italic text-white/80">
                  {activeSlide.subtitle}
                </span>
              )}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed hero-animate-in hero-animate-in-delay-3">
              {activeSlide.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 hero-animate-in hero-animate-in-delay-3">
              <a
                href="/book-now"
                className="bg-white text-primary px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-bold hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-2px] active:translate-y-0 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Book Your Day Pass
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  north_east
                </span>
              </a>
              <a
                href="/packages#sanctuaries"
                className="border-2 border-white/70 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-bold hover:bg-white/10 hover:border-white transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Book Your Night Stay
                <span className="material-symbols-outlined text-base sm:text-lg" aria-hidden="true">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom-right controls: dots + arrows (touch-friendly, safe area) */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 px-4 sm:px-6 lg:px-12 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-3 sm:gap-4">
          <div className="flex gap-2" aria-hidden="true">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-[6px] rounded-full transition-all duration-300 min-w-[8px] ${
                  index === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/70 transition-all duration-200"
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/70 transition-all duration-200"
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
