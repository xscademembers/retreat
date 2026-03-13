import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Feature } from '../types';
import { AMENITY_IMAGES } from '../constants';

interface AmenityTabsProps {
  features: Feature[];
}

export const AmenityTabs: React.FC<AmenityTabsProps> = ({ features }) => {
  const defaultId = (features[0] && features[0].id) || '5';
  const [activeId, setActiveId] = useState<string>(defaultId);
  const activeFeature = features.find((f) => f.id === activeId) ?? features[0];
  const images = AMENITY_IMAGES[activeId] ?? AMENITY_IMAGES[defaultId];

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    updateScrollState();
  }, [activeId, updateScrollState]);

  useEffect(() => {
    const preload = (src: string) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    };

    const primaryImages = AMENITY_IMAGES[defaultId] ?? [];
    primaryImages.slice(0, 4).forEach(preload);

    if (features.length > 1) {
      const nextId = features[1].id;
      const nextImages = AMENITY_IMAGES[nextId] ?? [];
      nextImages.slice(0, 2).forEach(preload);
    }
  }, [defaultId, features]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div
        className="flex flex-wrap justify-start gap-2 sm:gap-3"
        role="tablist"
        aria-label="Amenity categories"
      >
        {features.map((feature) => {
          const isActive = activeId === feature.id;
          return (
            <button
              key={feature.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`amenity-panel-${feature.id}`}
              id={`amenity-tab-${feature.id}`}
              onClick={() => setActiveId(feature.id)}
              className={`
                flex items-center gap-2 rounded-xl border-2 px-3 py-3 sm:px-4 min-h-[44px] text-left transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                [@media(prefers-reduced-motion:reduce)]:transition-none
                ${isActive
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <span
                className="material-symbols-outlined text-xl sm:text-2xl shrink-0 select-none"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <span className="font-semibold text-xs sm:text-sm">{feature.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`amenity-panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`amenity-tab-${activeId}`}
        className="relative group"
      >
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/90 shadow-lg border border-gray-200 text-primary hover:bg-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">chevron_left</span>
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/90 shadow-lg border border-gray-200 text-primary hover:bg-white hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">chevron_right</span>
          </button>
        )}

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((src, idx) => (
            <div
              key={`${activeId}-${idx}`}
              className="shrink-0 snap-start rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100"
              style={{ height: '360px' }}
            >
              <img
                src={src}
                alt={`${activeFeature.title} — image ${idx + 1}`}
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx < 2 ? 'high' : undefined}
                className="h-full w-auto max-w-none object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
