import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SANCTUARIES } from '../constants';
import { wixImg } from '../utils/wixImage';

type RoomId = 'cabana' | 'cottage' | 'villa';

interface NightRoomConfig {
  id: RoomId;
  title: string;
  pricePerNight: number;
  guests: string;
  beds: string;
  baths: string;
  images: string[];
  overview: string[];
  addons: string[];
}

const NIGHT_ROOMS: NightRoomConfig[] = [
  {
    id: 'cabana',
    title: 'The Cabana',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'cabana')?.nightPrice ?? 3999,
    guests: '2–3 guests',
    beds: '1 queen bed',
    baths: '1 ensuite bath',
    images: [
      SANCTUARIES.find((s) => s.id === 'cabana')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_9cfdfe97a95d406a980b25fcf9ddca00~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_46f4ec3eda5b4d35973d9ead62b4f73e~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_317174fbeb334ef9bd88ed3e1a4d2c94~mv2.webp',
    ],
    overview: ['Check-in 3 PM', 'Check-out 11 AM', 'Pool access', 'Lounge sit-out', 'Nature views'],
    addons: ['Dinner buffet', 'BBQ by the pool', 'Boating at Thatipudi (2 min away)'],
  },
  {
    id: 'cottage',
    title: 'The Cottage',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'cottage')?.nightPrice ?? 2999,
    guests: '4–6 guests',
    beds: '2 bedrooms + dorm',
    baths: '2 baths',
    images: [
      SANCTUARIES.find((s) => s.id === 'cottage')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_a65bf02ed38740ae8e1542cb292fe187~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_56535fd4214d4b39994c0719ddacf234~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_ce46802178d942ef92df0b8d77290cb2~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_222dc747f753492eb30bb753c85e7691~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_66a79d614dc04d8995eba15e30bf8122~mv2.webp',
    ],
    overview: ['Check-in 3 PM', 'Check-out 11 AM', 'Spacious living area', 'Garden sit-out', 'Ideal for families & groups'],
    addons: ['Breakfast add-on', 'Evening tea & snacks', 'Bonfire (seasonal)'],
  },
  {
    id: 'villa',
    title: 'The Villa',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'villa')?.nightPrice ?? 3999,
    guests: '4–5 guests',
    beds: '2 bedrooms',
    baths: '2 baths',
    images: [
      SANCTUARIES.find((s) => s.id === 'villa')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_2ee09ff2861840feb6f476fc89cdff1c~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_a235c822be154761ab73332e930e2886~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_0a94edde421d407eaf2463784a811b4d~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_5505f08a1a5843fe976765ef740a7cb2~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_96d1766261f9401e8a3ca072cb54fac9~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_2b5a41ba2ad44d8da706cb9fc179707b~mv2.jpg',
    ],
    overview: ['Check-in 3 PM', 'Check-out 11 AM', 'Large verandah', 'Garden-facing rooms', 'Ideal for relaxed stays'],
    addons: ['Breakfast add-on', 'Dinner buffet', 'Decor for celebrations'],
  },
];

export const Accommodation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRoomId: RoomId = useMemo(() => {
    const room = searchParams.get('room') as RoomId | null;
    if (room && NIGHT_ROOMS.some((r) => r.id === room)) return room;
    return 'cabana';
  }, [searchParams]);

  const [activeRoomId, setActiveRoomId] = useState<RoomId>(initialRoomId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveRoomId(initialRoomId);
    setActiveImageIndex(0);
  }, [initialRoomId]);

  const activeRoom = NIGHT_ROOMS.find((r) => r.id === activeRoomId) ?? NIGHT_ROOMS[0];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => {
      const total = activeRoom.images.length;
      if (total === 0) return 0;
      return (prev - 1 + total) % total;
    });
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => {
      const total = activeRoom.images.length;
      if (total === 0) return 0;
      return (prev + 1) % total;
    });
  };

  const handleTabClick = (roomId: RoomId) => {
    navigate(`/accommodation?room=${roomId}`);
  };

  const handleBookNow = () => {
    navigate(`/book-now?visit=night&room=${activeRoomId}`);
  };

  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 bg-background-soft">
        <div className="max-w-7xl mx-auto space-y-10">
          <header className="space-y-3 max-w-3xl">
            <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
              Accommodation
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Night stay at Salsons Retreat
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Switch between rooms to see photos, specifications, and pricing. Book your night stay in
              a couple of taps.
            </p>
          </header>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            {NIGHT_ROOMS.map((room) => {
              const isActive = room.id === activeRoomId;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleTabClick(room.id)}
                  className={`rounded-full px-4 sm:px-6 py-2 text-sm font-semibold border transition-colors min-h-[40px] ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-primary border-gray-200 hover:border-primary/60 hover:bg-primary/5'
                  }`}
                >
                  {room.title}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative overflow-hidden rounded-3xl shadow-lg bg-gray-200">
                <div className="relative pb-[65%]">
                  <img
                    src={wixImg(activeRoom.images[activeImageIndex], 800, 520)}
                    alt={activeRoom.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                {activeRoom.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md border border-gray-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Previous room image"
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        chevron_left
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-md border border-gray-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Next room image"
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        chevron_right
                      </span>
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {activeRoom.images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden border-2 min-w-[80px] sm:min-w-[96px] aspect-video ${
                      idx === activeImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={wixImg(img, 128, 72)}
                      alt={`${activeRoom.title} image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-primary mb-1">
                  {activeRoom.title}
                </h2>
                <p className="text-lg sm:text-xl font-semibold text-primary">
                  ₹ {activeRoom.pricePerNight.toLocaleString('en-IN')}{' '}
                  <span className="text-sm text-gray-500">/ room</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-primary mb-1">Guests</p>
                  <p>{activeRoom.guests}</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Beds</p>
                  <p>{activeRoom.beds}</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Baths</p>
                  <p>{activeRoom.baths}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Overview</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {activeRoom.overview.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">
                          check_circle
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">Add-ons</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {activeRoom.addons.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">
                          add_circle
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full sm:w-auto rounded-full bg-primary px-8 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-primary/90 transition-colors"
                >
                  Book this night stay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

