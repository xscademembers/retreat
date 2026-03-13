import React, { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = 'https://www.gmbqrcode.com/api/public/reviews';
const BUSINESS_ID = '69a6783020ce686764c18268';
const API_KEY = '34a60e189d033ea4729e9c212e3200c4012dd30d680af545f75628db13bddab9';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ6WUa2WPCOzoR5B40P4FnHTs';

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  createTime: string;
  updateTime: string;
  hasReply: boolean;
  reply: string | null;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'r-1',
    reviewer: 'Saranya Guttula',
    rating: 5,
    comment: 'An authentic vibe of mango fields with additional modern amenities. Nice experience.',
    createTime: '2026-02-21T12:09:32.578711Z',
    updateTime: '2026-02-21T12:09:32.578711Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-2',
    reviewer: 'Prasanna Kotaru',
    rating: 5,
    comment: 'The best stay! The staff service and hospitality is awesome. I suggest for one more visit.',
    createTime: '2026-02-21T09:49:39.296692Z',
    updateTime: '2026-02-21T09:49:39.296692Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-3',
    reviewer: 'Harsha P',
    rating: 5,
    comment: 'Awesome place',
    createTime: '2026-02-14T10:35:56.906349Z',
    updateTime: '2026-02-14T10:35:56.906349Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-4',
    reviewer: 'Ramya Suseela',
    rating: 5,
    comment: 'Nice hospitality and ambience',
    createTime: '2026-02-14T10:29:16.520327Z',
    updateTime: '2026-02-14T10:29:16.520327Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-5',
    reviewer: 'SOLDIER IND',
    rating: 5,
    comment: 'Good pure south indian taste',
    createTime: '2026-02-01T16:53:51.473659Z',
    updateTime: '2026-02-01T16:53:51.473659Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-6',
    reviewer: 'Jalli Estheru',
    rating: 3,
    comment: 'Good',
    createTime: '2026-02-01T12:58:17.609680Z',
    updateTime: '2026-02-01T12:58:17.609680Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-7',
    reviewer: 'Bheema Sankhar',
    rating: 5,
    comment: 'Excellent service and nature, good staff, must visit with family',
    createTime: '2026-02-01T04:35:02.730483Z',
    updateTime: '2026-02-01T04:35:02.730483Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-8',
    reviewer: 'Yogesh',
    rating: 5,
    comment: 'Successfully completed 1st month in 2026 in Salsons!',
    createTime: '2026-02-01T04:34:08.450686Z',
    updateTime: '2026-02-01T04:34:08.450686Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-9',
    reviewer: 'Madhurima',
    rating: 5,
    comment: "Great for families get together. The staff are very particular about female's privacy and security which is very admirable. The pool and rain dance area is very clean. Resort's ambience with trees surrounding is so peaceful. It's a delight for nature lovers. Food is great too. Overall 5 star experience for a weekend chill.",
    createTime: '2026-01-25T07:43:45.059149Z',
    updateTime: '2026-01-25T07:43:45.059149Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-10',
    reviewer: 'Girish Paturi',
    rating: 5,
    comment: 'We stayed overnight in Dec 2025 with family. Kids enjoyed playing basketball and cricket. Prices were reasonable. Food was hygienic and delicious and made to order. Bon Fire in the night time was wonderful. Vishnu and his team were courteous and very helpful. Overall a great experience.',
    createTime: '2026-01-13T07:25:57.364168Z',
    updateTime: '2026-01-13T07:25:57.364168Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-11',
    reviewer: 'Koti Koti',
    rating: 5,
    comment: 'Amazing location with amazing people',
    createTime: '2026-01-03T12:18:05.736178Z',
    updateTime: '2026-01-03T12:18:05.736178Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-12',
    reviewer: 'Sampath Sai',
    rating: 5,
    comment: 'Had a wonderful stay at this resort. The food was delicious with great variety, the staff were extremely courteous and helpful, and the service was truly top-notch throughout. Everything was well managed, making the experience relaxing and memorable. Highly recommended!',
    createTime: '2025-12-30T04:10:17.209714Z',
    updateTime: '2025-12-30T04:10:17.209714Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-13',
    reviewer: 'Mritunjay Singh',
    rating: 5,
    comment: 'Excellent service and amazing staff.',
    createTime: '2025-12-30T04:07:18.905323Z',
    updateTime: '2025-12-30T04:07:18.905323Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-14',
    reviewer: 'Rekha Charles',
    rating: 5,
    comment: "We didn't use rooms, but had a good time in the tent provided, it's location and hospitality and services by Mr. Vishnu and team was wonderful",
    createTime: '2025-12-27T11:05:51.245754Z',
    updateTime: '2025-12-27T11:05:51.245754Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-15',
    reviewer: 'Kranthi kumar Yandrapu',
    rating: 5,
    comment: 'There is a swimming pool is very convenient to use and the reciving of the resort people is very convenient',
    createTime: '2025-12-10T14:53:37.134969Z',
    updateTime: '2025-12-10T14:53:37.134969Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-16',
    reviewer: 'Sudheer Muni',
    rating: 5,
    comment: "It's has great felling spending time in this resort have a nine rooms with good ambience in the resort the food is very delicious, and there is good receive of the our family",
    createTime: '2025-12-10T14:51:40.322751Z',
    updateTime: '2025-12-10T14:51:40.322751Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-17',
    reviewer: 'askar surisetty',
    rating: 5,
    comment: '',
    createTime: '2026-02-21T12:05:29.131858Z',
    updateTime: '2026-02-21T12:05:29.131858Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-18',
    reviewer: 'Prasad Sunki',
    rating: 5,
    comment: '',
    createTime: '2026-02-01T13:01:14.344693Z',
    updateTime: '2026-02-01T13:01:14.344693Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-19',
    reviewer: 'Allen Joseph',
    rating: 5,
    comment: '',
    createTime: '2025-12-27T11:03:28.375258Z',
    updateTime: '2025-12-27T11:03:28.375258Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-20',
    reviewer: 'Jagnmohan Rao',
    rating: 1,
    comment: '',
    createTime: '2025-12-27T08:09:30.241890Z',
    updateTime: '2025-12-27T08:09:31.815883Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-21',
    reviewer: 'harika vermuru',
    rating: 4,
    comment: '',
    createTime: '2025-12-26T15:45:15.349549Z',
    updateTime: '2025-12-26T15:45:15.349549Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-22',
    reviewer: 'GANA GAMING ARMY',
    rating: 4,
    comment: '',
    createTime: '2025-12-24T05:44:01.044008Z',
    updateTime: '2025-12-24T05:44:01.044008Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-23',
    reviewer: 'Yogesh Sambhana',
    rating: 5,
    comment: '',
    createTime: '2025-12-11T17:05:29.261261Z',
    updateTime: '2025-12-11T17:07:58.872798Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-24',
    reviewer: 'Venkataramesh Gundala',
    rating: 5,
    comment: '',
    createTime: '2025-12-09T10:32:04.986554Z',
    updateTime: '2025-12-09T10:32:04.986554Z',
    hasReply: true,
    reply: null,
  },
  {
    id: 'r-25',
    reviewer: 'Md Salman',
    rating: 5,
    comment: '',
    createTime: '2025-12-03T10:39:18.027046Z',
    updateTime: '2025-12-03T10:39:18.027046Z',
    hasReply: true,
    reply: null,
  },
];

function formatTimeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'Today';
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const AVATAR_COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#7B1FA2', '#00838F'];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const GoogleLogo: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined text-base ${i < count ? 'text-amber-400' : 'text-gray-300'}`}
        aria-hidden="true"
      >
        star
      </span>
    ))}
  </div>
);

function wordCount(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.rating !== b.rating) {
      return b.rating - a.rating; // 5★ → 1★
    }
    const aWords = wordCount(a.comment);
    const bWords = wordCount(b.comment);
    return bWords - aWords; // longer → shorter
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}?businessId=${BUSINESS_ID}&limit=25`, {
      headers: { 'x-api-key': API_KEY },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => { throw new Error(e.error); });
        return res.json();
      })
      .then((data: { reviews: Review[]; businessName: string }) => {
        if (data.reviews.length > 0) setReviews(data.reviews);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;
    const page = Math.round(el.scrollLeft / (cardWidth * 4));
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();
    requestAnimationFrame(updateScrollState);

    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, reviews]);

  const scroll = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / 4));

  return (
    <section
      id="testimonials"
      className="pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-32 px-4 sm:px-6 lg:px-12 bg-white"
      aria-label="Google Reviews"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-10 sm:mb-14">
          What Our Customers Say
        </h2>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 sm:p-6 lg:p-8 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <GoogleLogo size={28} />
              <span className="text-lg font-semibold text-gray-500">Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">{avgRating}</span>
              <Stars count={Math.round(Number(avgRating))} />
              <span className="text-sm text-gray-500">(476 reviews)</span>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4285F4] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3367D6] transition-colors shrink-0"
          >
            Review us on Google
          </a>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll('left')}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl" aria-hidden="true">chevron_left</span>
            </button>
          )}

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl" aria-hidden="true">chevron_right</span>
            </button>
          )}

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sortedReviews.map((review) => {
              const isExpanded = expandedIds.has(review.id);
              const isLong = review.comment.length > 140;
              const displayText = isLong && !isExpanded
                ? review.comment.slice(0, 140) + '…'
                : review.comment;

              return (
                <article
                  key={review.id}
                  className="shrink-0 w-[280px] sm:w-[300px] snap-start rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: avatarColor(review.reviewer) }}
                      >
                        {getInitials(review.reviewer)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <GoogleLogo size={12} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{review.reviewer}</h3>
                      <p className="text-xs text-gray-500">{formatTimeAgo(review.createTime)}</p>
                    </div>
                  </div>

                  <Stars count={review.rating} />

                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {review.comment ? displayText : (
                      <span className="text-gray-400 italic">Rated {review.rating} stars</span>
                    )}
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(review.id)}
                        className="ml-1 text-blue-600 hover:text-blue-800 font-medium text-sm focus:outline-none"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentPage ? 'w-6 bg-gray-800' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
