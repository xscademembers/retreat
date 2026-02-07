import React, { useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our stay at Salsons Retreat was truly memorable! The hospitality made us feel right at home, and the serene beauty of the farmhouse added to the charm. From the thoughtful arrangements to the soulful atmosphere—everything left a lasting impression.",
    author: "Fazal & Group",
    role: "Saudi Arabia"
  },
  {
    quote: "We recently held our Regional Heads Meet at Salsons Retreat, and it was an experience to remember. The serene poolside deck, beautifully lit ambience, and flawless event setup created the perfect backdrop for our meeting and awards ceremony. The hospitality, service, and food exceeded our expectations.",
    author: "Sriram Life Insurance",
    role: "Visakhapatnam"
  },
  {
    quote: "Our ride from Vizag found its perfect break at Salsons Retreat. The cabana rooms gave us the comfort we needed, and the pool hit the spot after a long day on the road. The food was fantastic, and the BBQ under the stars was a total win. Surrounded by trees and peace, it was the ideal pitstop.",
    author: "Nazim & Group",
    role: "Visakhapatnam"
  },
  {
    quote: "Our team outing at Salsons Retreat was a fantastic experience! The lush greenery and serene surroundings offered the perfect escape from our busy routines. Everything was managed with care and attention. We had a great time at the pool, and the food was absolutely delicious. Highly recommended for corporate getaways!",
    author: "Team Tech Tammima",
    role: "Visakhapatnam"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = TESTIMONIALS[currentIndex];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 px-6 lg:px-12 bg-primary text-white h-[640px] sm:h-[680px] lg:h-[720px] flex items-center overflow-hidden" aria-label="Testimonials">
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="flex justify-center gap-1 text-accent-gold mb-8" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined fill-current">star</span>
          ))}
        </div>

        <div className="h-[280px] sm:h-[300px] lg:h-[320px] flex items-center justify-center overflow-hidden shrink-0">
          <blockquote className="text-2xl lg:text-4xl font-light italic leading-relaxed overflow-hidden">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>

        <div className="h-16 flex flex-col items-center justify-center space-y-1 mt-8 shrink-0">
          <h4 className="font-bold text-lg line-clamp-2">{testimonial.author}</h4>
          <p className="text-sm opacity-60">{testimonial.role}</p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 h-14 shrink-0">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_back</span>
          </button>

          <div className="flex gap-2" aria-hidden="true">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-3 rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
