import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SANCTUARIES } from '../constants';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

type RoomId = 'cabana' | 'cottage' | 'villa';

export const NightVisit: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMore = (roomId: RoomId) => {
    navigate(`/accommodation?room=${roomId}`);
  };

  return (
    <main id="main-content" className="pt-20 sm:pt-24">
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
              Browse our cabana, cottage, and villa options. Tap &ldquo;View more&rdquo; on any stay to
              see full details, photos, and guest capacity.
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
    </main>
  );
};

