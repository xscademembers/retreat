import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SANCTUARIES } from '../constants';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

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
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01837.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01849.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01906.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01942.JPG',
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
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01870.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01872.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01879.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01949.JPG',
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
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01953.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01981.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC02085.JPG',
      'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC07574.JPG',
    ],
    overview: ['Check-in 3 PM', 'Check-out 11 AM', 'Large verandah', 'Garden-facing rooms', 'Ideal for relaxed stays'],
    addons: ['Breakfast add-on', 'Dinner buffet', 'Decor for celebrations'],
  },
];

export const NightVisit: React.FC = () => {
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

  const handleViewMore = (roomId: RoomId) => {
    navigate(`/night-visit?room=${roomId}#night-rooms`);
  };

  const handleTabClick = (roomId: RoomId) => {
    navigate(`/night-visit?room=${roomId}#night-rooms`);
  };

  const handleBookNow = () => {
    navigate(`/book-now?visit=night&room=${activeRoomId}`);
  };

  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      {/* Intro + simple cards */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl">
            <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">
              Night Visit
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Choose your stay for the night
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl">
              Explore our cabana, cottage, and villa options. Tap &ldquo;View more&rdquo; on any stay to
              see full details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SANCTUARIES.map((s, idx) => (
              <AnimateOnScroll
                key={s.id}
                animation="fade-up"
                delay={idx * 120}
                className="h-full"
              >
                <article className="relative h-full rounded-3xl overflow-hidden shadow-lg group bg-black/80">
                  <div className="relative pb-[70%]">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/5" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                    <div className="flex-1" />
                    <div>
                      <h2 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 uppercase">
                        {s.name}
                      </h2>
                      <button
                        type="button"
                        onClick={() => handleViewMore(s.id as RoomId)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/5 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-white hover:text-primary transition-all"
                      >
                        View more
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">
                          arrow_outward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed night-stay tabs */}
      <section
        id="night-rooms"
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-background-soft border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
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
                    src={activeRoom.images[activeImageIndex]}
                    alt={activeRoom.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
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
                      src={img}
                      alt={`${activeRoom.title} image ${idx + 1}`}
                      className="w-full h-full object-cover"
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
                  ₹ {activeRoom.pricePerNight.toLocaleString('en-IN')} <span className="text-sm text-gray-500">/ night</span>
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


