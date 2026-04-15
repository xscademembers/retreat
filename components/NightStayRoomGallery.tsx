import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { wixImg } from '../utils/wixImage';

const MAIN_W = 720;
const MAIN_H = 405; // 16:9 roughly

type SlideDirection = 'next' | 'prev' | null;

interface NightStayRoomGalleryProps {
  /** Same URLs as Accommodation / nightRoomDetails `NIGHT_ROOMS` */
  images: string[];
  title: string;
}

export const NightStayRoomGallery: React.FC<NightStayRoomGalleryProps> = ({ images, title }) => {
  const slides = useMemo(
    () => images.filter((u) => typeof u === 'string' && u.length > 0),
    [images],
  );
  const slidesKey = useMemo(() => slides.join('|'), [slides]);
  const [active, setActive] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);
  const count = slides.length;

  useEffect(() => {
    if (count === 0) return;
    setActive((i) => Math.min(i, count - 1));
  }, [count]);

  useEffect(() => {
    setSlideDirection(null);
  }, [slidesKey]);

  const safeIndex = count > 0 ? Math.min(active, count - 1) : 0;
  const current = slides[safeIndex] ?? '';

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setSlideDirection(delta > 0 ? 'next' : 'prev');
      setActive((i) => (i + delta + count) % count);
    },
    [count],
  );

  const slideClass =
    slideDirection === 'next'
      ? 'night-gallery-slide-next'
      : slideDirection === 'prev'
        ? 'night-gallery-slide-prev'
        : '';

  if (count === 0) return null;

  return (
    <div className="min-w-0 night-gallery-root">
      {/* Main hero image */}
      <div className="relative overflow-hidden night-gallery-hero group">
        <div className="relative" style={{ paddingBottom: '66.67%' }}>
          <img
            key={`${slidesKey}-${safeIndex}`}
            src={wixImg(current, MAIN_W, MAIN_H)}
            alt={`${title} — photo ${safeIndex + 1} of ${count}`}
            className={`absolute inset-0 w-full h-full object-cover ${slideClass}`}
            loading={safeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={safeIndex === 0 ? 'high' : undefined}
          />
          {/* Subtle gradient overlay for navigation contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Navigation arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="night-gallery-arrow night-gallery-arrow-left"
              aria-label="Previous photo"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="night-gallery-arrow night-gallery-arrow-right"
              aria-label="Next photo"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSlideDirection(idx > safeIndex ? 'next' : 'prev');
                  setActive(idx);
                }}
                className={`rounded-full transition-all duration-300 ${
                  idx === safeIndex
                    ? 'w-2 h-2 bg-white scale-110 shadow-sm'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
