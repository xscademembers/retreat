import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'How far is Salsons Retreat from Vizag?',
    answer:
      'Salsons Retreat is located in Thatipudi, approximately 75 km (about 90 minutes by car) from Vizag city centre. It\'s about 65 km from Vizag Airport and 35 km from Anakapalle.',
  },
  {
    question: 'Is Salsons Retreat pet-friendly?',
    answer:
      'Yes! Salsons Retreat is pet-friendly. We welcome well-behaved pets on the property. Please inform us in advance so we can make suitable arrangements for your furry friend.',
  },
  {
    question: 'Do you have a swimming pool? Is it open all year?',
    answer:
      'Yes, we have a party pool and a separate rain dance pool. Both are open year-round and are included in all our packages. Towels are provided.',
  },
  {
    question: 'What\'s included in the ₹990 day-outing price?',
    answer:
      'The Basic day-outing package at ₹990 per person includes: entry & welcome drink, pool access (with towels), farm-to-table Andhra-style lunch, sports (cricket, basketball, football, volleyball, throwball), evening tea & cookies, and free parking.',
  },
  {
    question: 'Do you allow alcohol on the premises?',
    answer:
      'BYOB (Bring Your Own Bottle) is permitted at Salsons Retreat. We provide glassware, ice, and mixers. Please drink responsibly.',
  },
  {
    question: 'Are there A/C rooms? Family rooms?',
    answer:
      'Yes, we offer three types of accommodation: the lake-facing Cabana (glamping-style), the spacious Cottage (two rooms + dormitory, ideal for families), and the elegant Villa (two rooms with large verandahs). All rooms are well-ventilated; A/C availability varies by room type — call us for specifics.',
  },
  {
    question: 'Is the food vegetarian / non-vegetarian / Andhra-style?',
    answer:
      'We serve authentic Andhra-style farm-to-table meals with both vegetarian and non-vegetarian options. Our BBQ also includes veg and non-veg choices. If you have dietary requirements, let us know in advance.',
  },
  {
    question: 'Can I host a small group / birthday / family function?',
    answer:
      'Absolutely! We regularly host birthday parties, family reunions, and small group events for 10–50 people. We offer customised packages including décor, cake, and special meals. Call us to plan your event.',
  },
  {
    question: 'How do I get there by car? Is there parking?',
    answer:
      'From Vizag, take the Vizianagaram Road towards Thatipudi — it\'s a scenic 90-minute drive. We provide free on-site parking for all guests. You can also use the "Open in Google Maps" button on our website for turn-by-turn directions.',
  },
  {
    question: 'What\'s your cancellation policy?',
    answer:
      'Cancellations made 48 hours or more before the booking date receive a full refund. Cancellations within 48 hours may be subject to a partial charge. Please call us for details on your specific booking.',
  },
  {
    question: 'Do you offer pickup from Vizag?',
    answer:
      'We don\'t have a shuttle service currently, but we can help arrange private transport from Vizag city or the airport on request. Most guests prefer to drive — the route is straightforward and scenic.',
  },
  {
    question: 'Is the place safe for kids and elderly guests?',
    answer:
      'Yes, Salsons Retreat is very family-friendly. We have a dedicated children\'s park, safe open lawns, and our staff is trained to assist elderly guests. The property is well-lit and secure.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="landing-section bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
            Everything you need to know before your visit to Salsons Retreat.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-left flex-1 font-semibold text-[15px] sm:text-base leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`faq-item__content ${isOpen ? 'faq-item__content--open' : ''}`}
                >
                  <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed pb-4 px-5 sm:px-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
