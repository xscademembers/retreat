import React, { useState, useEffect, useCallback } from 'react';

const API_URL =
  'https://www.gmbqrcode.com/api/public/reviews?businessId=69a6783020ce686764c18268&limit=25';
const API_KEY =
  '34a60e189d033ea4729e9c212e3200c4012dd30d680af545f75628db13bddab9';

interface Review {
  author: string;
  rating: number;
  text: string;
  photoUrl?: string;
  timeDescription?: string;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    author: 'Fazal & Group',
    rating: 5,
    text: 'Our stay at Salsons Retreat was truly memorable! The hospitality made us feel right at home, and the serene beauty of the farmhouse added to the charm. From the thoughtful arrangements to the soulful atmosphere—everything left a lasting impression.',
    timeDescription: 'Saudi Arabia',
  },
  {
    author: 'Sriram Life Insurance',
    rating: 5,
    text: 'We recently held our Regional Heads Meet at Salsons Retreat, and it was an experience to remember. The serene poolside deck, beautifully lit ambience, and flawless event setup created the perfect backdrop for our meeting and awards ceremony.',
    timeDescription: 'Visakhapatnam',
  },
  {
    author: 'Nazim & Group',
    rating: 5,
    text: 'Our ride from Vizag found its perfect break at Salsons Retreat. The cabana rooms gave us the comfort we needed, and the pool hit the spot after a long day on the road. The food was fantastic, and the BBQ under the stars was a total win.',
    timeDescription: 'Visakhapatnam',
  },
  {
    author: 'Team Tech Tammima',
    rating: 5,
    text: 'Our team outing at Salsons Retreat was a fantastic experience! The lush greenery and serene surroundings offered the perfect escape from our busy routines. Everything was managed with care and attention. Highly recommended for corporate getaways!',
    timeDescription: 'Visakhapatnam',
  },
];

const STAR_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

function parseRating(raw: unknown): number {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string' && STAR_MAP[raw]) return STAR_MAP[raw];
  return 5;
}

function normaliseReviews(data: unknown): Review[] {
  if (!data || typeof data !== 'object') return [];

  const list: unknown[] =
    Array.isArray(data)
      ? data
      : Array.isArray((data as Record<string, unknown>).reviews)
        ? (data as Record<string, unknown>).reviews as unknown[]
        : [];

  return list
    .map((item: unknown) => {
      const r = item as Record<string, unknown>;
      const reviewer = (r.reviewer ?? {}) as Record<string, unknown>;

      const author =
        (r.author_name as string) ??
        (reviewer.displayName as string) ??
        (r.authorName as string) ??
        'Guest';

      const text =
        (r.text as string) ??
        (r.comment as string) ??
        '';

      if (!text) return null;

      const photoUrl =
        (r.profile_photo_url as string) ??
        (reviewer.profilePhotoUrl as string) ??
        undefined;

      const timeDescription =
        (r.relative_time_description as string) ??
        undefined;

      return {
        author,
        rating: parseRating(r.rating ?? r.starRating),
        text,
        photoUrl,
        timeDescription,
      } satisfies Review;
    })
    .filter((v): v is Review => v !== null);
}

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, {
      headers: { 'x-api-key': API_KEY },
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const parsed = normaliseReviews(data);
        if (parsed.length > 0) {
          setReviews(parsed);
          setCurrentIndex(0);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const review = reviews[currentIndex];

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, [reviews.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(goToNext, 7000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-primary text-white"
      aria-label="Google Reviews"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="flex justify-center items-center gap-2 mb-4">
          <img
            src="https://www.google.com/favicon.ico"
            alt=""
            width={20}
            height={20}
            className="opacity-80"
            aria-hidden="true"
          />
          <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-60">
            Google Reviews
          </span>
        </div>

        <div className="flex justify-center gap-1 text-accent-gold mb-8" aria-hidden="true">
          {[...Array(review.rating)].map((_, i) => (
            <span key={i} className="material-symbols-outlined fill-current">star</span>
          ))}
          {[...Array(5 - review.rating)].map((_, i) => (
            <span key={`e-${i}`} className="material-symbols-outlined fill-current opacity-30">star</span>
          ))}
        </div>

        <div className="min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] flex items-center justify-center">
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic leading-relaxed px-1">
            &ldquo;{review.text}&rdquo;
          </blockquote>
        </div>

        <div className="flex flex-col items-center justify-center space-y-1 mt-8">
          {review.photoUrl && (
            <img
              src={review.photoUrl}
              alt=""
              width={48}
              height={48}
              className="rounded-full mb-2 border-2 border-white/30"
              referrerPolicy="no-referrer"
            />
          )}
          <h4 className="font-bold text-lg">{review.author}</h4>
          {review.timeDescription && (
            <p className="text-sm opacity-60">{review.timeDescription}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous review"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_back</span>
          </button>

          <div className="flex gap-2 flex-wrap justify-center max-w-[200px]" aria-hidden="true">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60 w-2'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-3 rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next review"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
