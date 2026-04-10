import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { wixImg } from '../utils/wixImage';

const MAIN_W = 560;
const MAIN_H = 364;

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
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200">
        <div className="relative pb-[65%]">
          <img
            key={`${slidesKey}-${safeIndex}`}
            src={wixImg(current, MAIN_W, MAIN_H)}
            alt={`${title} — photo ${safeIndex + 1} of ${count}`}
            className={`absolute inset-0 w-full h-full object-cover ${slideClass}`}
            loading={safeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={safeIndex === 0 ? 'high' : undefined}
          />
        </div>
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-primary shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"
              aria-label="Previous photo"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                chevron_left
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-primary shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"
              aria-label="Next photo"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
