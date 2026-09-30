import React, { useState } from 'react';

const WHATSAPP_NUMBER = '918074799387';

const EVENT_TYPES = [
  'Haldi',
  'Sangeet',
  'First Birthday Party',
  'Anniversary',
  'Wedding Party',
  'Reception',
  'Engagement',
  'Others',
] as const;

const inputClass =
  'w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50/80 transition-colors';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

export const Garden: React.FC = () => {
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');

  const buildWhatsAppMessage = () => {
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';

    const lines = [
      'Event enquiry - Salsons Garden',
      '',
      `Date of Event: ${formattedDate}`,
      `Type of Event: ${eventType || 'N/A'}`,
      `Name: ${name.trim() || 'N/A'}`,
      `Phone: ${phone.trim() || 'N/A'}`,
    ];

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact');
    }

    if (typeof window !== 'undefined' && typeof (window as any).gtag_report_conversion === 'function') {
      (window as any).gtag_report_conversion(whatsappUrl);
    } else if (typeof window !== 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-background-soft flex flex-col">
      <header className="bg-white/95 backdrop-blur-md shadow-sm py-4 sm:py-5">
        <div className="max-w-xl mx-auto px-4 sm:px-6 flex items-center justify-center">
          <h1 className="text-lg sm:text-xl font-bold tracking-tighter uppercase text-primary">
            Salsons Garden
          </h1>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex items-start justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Enquire About Your Event
            </h2>
            <div className="w-12 h-1 bg-accent-gold rounded-full mx-auto mt-4" aria-hidden="true" />
            <p className="mt-4 text-sm text-gray-500">
              Fill in the details below and we&apos;ll connect with you on WhatsApp.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-5"
            aria-label="Salsons Garden event enquiry form"
          >
            <div>
              <label htmlFor="garden-event-date" className={labelClass}>
                Date of Event
              </label>
              <input
                id="garden-event-date"
                type="date"
                name="eventDate"
                className={inputClass}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                onClick={(e) => {
                  const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
                  input.showPicker?.();
                }}
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="garden-event-type" className={labelClass}>
                Type of Event
              </label>
              <select
                id="garden-event-type"
                name="eventType"
                className={inputClass}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
                aria-required="true"
              >
                <option value="" disabled>
                  Select event type
                </option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="garden-name" className={labelClass}>
                Name
              </label>
              <input
                id="garden-name"
                type="text"
                name="name"
                className={inputClass}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="garden-phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="garden-phone"
                type="tel"
                name="phone"
                className={inputClass}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[52px] bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.99]"
            >
              Submit enquiry
            </button>

            <p className="text-xs text-center text-gray-400 pt-1">
              Opens WhatsApp to message Mr. Vishnu (+91 80747 99387)
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
