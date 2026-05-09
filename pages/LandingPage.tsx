import React from 'react';
import { EXPERIENCE_TIERS, SANCTUARIES } from '../constants';
import { wixImg } from '../utils/wixImage';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { LazySection } from '../components/LazySection';
import { StickyCallBar } from '../components/StickyCallBar';

const PHONE = '+918074799387';
const PHONE2 = '+917569242082';
const PHONE_DISPLAY = '+91 80747 99387';
const MAPS_URL = 'https://www.google.com/maps/place/Salsons+Retreat/@18.168367,83.218715,15z';
const HERO_IMG = 'https://static.wixstatic.com/media/9356bd_f11dba5618f34e2a8b622238d0dfaed3~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_80,enc_avif/img.webp';

function track(e: string) {
  if ((window as any).dataLayer) (window as any).dataLayer.push({ event: e });
}

const TRUST = [
  { icon: 'directions_car', text: '90 min from Vizag' },
  { icon: 'star', text: '4.7★ on Google (476 reviews)' },
  { icon: 'water', text: '6-acre private lake' },
  { icon: 'pets', text: 'Pet-friendly' },
  { icon: 'pool', text: 'Pool, BBQ & boating' },
];
const DIST = [
  { from: 'Vizag (RK Beach)', car: '1h 30m', dist: '≈ 75 km' },
  { from: 'Vizag Airport', car: '1h 15m', dist: '≈ 65 km' },
  { from: 'Vizag Railway Station', car: '1h 25m', dist: '≈ 70 km' },
  { from: 'Anakapalle', car: '45 min', dist: '≈ 35 km' },
  { from: 'Bheemili Beach', car: '1h 45m', dist: '≈ 85 km' },
];
const DAY_INC = [
  'Welcome drink + Andhra-style buffet lunch', 'Pool access (towels provided)',
  'Boating at Thatipudi Reservoir', 'Cricket pitch + indoor games',
  'Evening tea & snacks', 'Free parking',
];
const AMEN = [
  { icon: 'pool', label: 'Swimming Pool' }, { icon: 'outdoor_grill', label: 'BBQ & Bonfire' },
  { icon: 'sailing', label: 'Boating' }, { icon: 'sports_cricket', label: 'Cricket & Sports' },
  { icon: 'casino', label: 'Indoor Games' }, { icon: 'local_fire_department', label: 'Bonfire Nights' },
  { icon: 'restaurant', label: 'Andhra Meals' }, { icon: 'pets', label: 'Pet-friendly' },
  { icon: 'local_parking', label: 'Free Parking' },
];
const GALLERY = [
  'https://static.wixstatic.com/media/9356bd_cf3a8a3d18cf48e8897bc3c754cba84b~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_0cd3be2497a84062bbec961c4d4f8755~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_37765711a58044968ecb66adb3beff87~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_2bd050337a89460eb03a3ae211182d6a~mv2.webp',
  'https://static.wixstatic.com/media/9356bd_b9b735c1f92f4b2a94d7db8cfe09eba1~mv2.webp',
  'https://static.wixstatic.com/media/9356bd_d054a7523ffe40a19119b7d594c1dc32~mv2.webp',
  'https://static.wixstatic.com/media/9356bd_463e12e935b94c90b510dd8119516c4a~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_ff7051479d6d42dcb67197b538b55359~mv2.webp',
  'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_6784106fa9cc4944864a2a970926cd68~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_cb187cfabdf14aab8cf12939d9b5346d~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_3816a1b00f28406f9c5b34e61a665185~mv2.webp',
];
const AUD = [
  { title: 'For Families', desc: 'Safe open lawns, children\'s park, pool, and wholesome Andhra meals — perfect for a family day out or weekend together.', icon: 'family_restroom', img: 'https://static.wixstatic.com/media/9356bd_3c43503016cc45abaf4287a3f858b681~mv2.webp' },
  { title: 'For Couples', desc: 'Private cabanas by the lake, sunset boating, bonfire dinners — a romantic escape just 90 minutes from the city.', icon: 'favorite', img: 'https://static.wixstatic.com/media/9356bd_463e12e935b94c90b510dd8119516c4a~mv2.jpg' },
  { title: 'For Groups', desc: 'Cricket, volleyball, pool parties, BBQ — bring your friends or colleagues for the ultimate day out. Groups of 10–50.', icon: 'groups', img: 'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg' },
];

export const LandingPage: React.FC = () => (
  <main id="main-content">
    {/* 1. HERO */}
    <section className="relative min-h-[100svh] overflow-hidden flex items-center" id="hero-section">
      <img src={HERO_IMG} alt="Aerial view of Salsons Retreat lakeside property" loading="eager" decoding="sync" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
        <div className="max-w-4xl">
          <p className="text-white/70 text-xs sm:text-sm font-bold uppercase tracking-[0.35em] mb-4 hero-animate-in hero-animate-in-delay-1">Salsons Retreat · Thatipudi</p>
          <h1 className="text-[2rem] sm:text-[2.75rem] md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white mb-5 sm:mb-6 hero-animate-in hero-animate-in-delay-2">
            A Lakeside Resort <span className="text-accent-gold">90 Minutes</span> From Vizag
            <span className="block text-lg sm:text-xl md:text-2xl font-semibold mt-3 text-white/85 leading-snug">Day Outings &amp; Weekend Stays at Salsons Retreat</span>
          </h1>
          <p className="text-base sm:text-lg text-white/75 max-w-xl leading-relaxed mb-8 sm:mb-10 hero-animate-in hero-animate-in-delay-3">6 acres on Thatipudi Reservoir. Pool, BBQ, boating, farm-to-table Andhra meals. Day plans from ₹990. Weekend cottages too.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 hero-animate-in hero-animate-in-delay-3">
            <a href={`tel:${PHONE}`} onClick={() => track('call_click_primary')} className="landing-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-9 py-4 text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]" id="hero-cta-day-outing">
              <span className="material-symbols-outlined text-xl" aria-hidden="true">call</span>Book a Day Outing — from ₹990
            </a>
            <a href={`tel:${PHONE}`} onClick={() => track('call_click_primary_stay')} className="landing-cta-secondary inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-9 py-4 text-base sm:text-lg font-bold transition-all duration-300 hover:bg-white/15" id="hero-cta-weekend-stay">
              <span className="material-symbols-outlined text-xl" aria-hidden="true">call</span>Plan a Weekend Stay
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* 2. TRUST BAR */}
    <section className="bg-primary text-white py-5 sm:py-6 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-5">
        {TRUST.map((t) => (
          <div key={t.text} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm sm:text-base whitespace-nowrap">
            <span className="material-symbols-outlined text-accent-gold text-lg" aria-hidden="true">{t.icon}</span>
            <span className="font-medium">{t.text}</span>
          </div>
        ))}
      </div>
    </section>

    {/* 3. DISTANCE */}
    <AnimateOnScroll animation="fade-up">
      <section className="landing-section bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">How to Reach Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Worth the Drive</h2>
          <p className="text-gray-500 mb-8">A scenic ride through North Andhra — here's how long it takes.</p>
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b-2 border-primary/20"><th className="py-3 px-4 text-sm font-bold text-primary uppercase tracking-wider">From</th><th className="py-3 px-4 text-sm font-bold text-primary uppercase tracking-wider">By Car</th><th className="py-3 px-4 text-sm font-bold text-primary uppercase tracking-wider">Distance</th></tr></thead>
            <tbody>{DIST.map((d) => (<tr key={d.from} className="border-b border-gray-100 hover:bg-gray-50/50"><td className="py-3 px-4 text-sm sm:text-base font-medium text-gray-800">{d.from}</td><td className="py-3 px-4 text-sm sm:text-base text-gray-600">{d.car}</td><td className="py-3 px-4 text-sm sm:text-base text-gray-600">{d.dist}</td></tr>))}</tbody>
          </table>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 rounded-full bg-primary text-white px-7 py-3 text-sm font-bold hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">map</span>Open in Google Maps →
          </a>
        </div>
      </section>
    </AnimateOnScroll>

    {/* 4. DAY OUTING */}
    <AnimateOnScroll animation="fade-up">
      <section className="landing-section bg-[#f9f7f4]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div>
            <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">Day Outing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Day Outing — from <span className="text-accent-gold">₹990</span> per person</h2>
            <p className="text-gray-500 mb-6">Everything you need for a perfect day out, all included.</p>
            <ul className="space-y-3 mb-8">{DAY_INC.map((item) => (<li key={item} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"><span className="material-symbols-outlined text-green-600 text-lg mt-0.5 shrink-0" aria-hidden="true">check_circle</span>{item}</li>))}</ul>
            <a href={`tel:${PHONE}`} onClick={() => track('call_click_day_outing')} className="landing-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-bold" id="day-outing-cta">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>Call to confirm today's availability
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[EXPERIENCE_TIERS[0]?.image, EXPERIENCE_TIERS[1]?.image, EXPERIENCE_TIERS[2]?.image, 'https://static.wixstatic.com/media/9356bd_0cd3be2497a84062bbec961c4d4f8755~mv2.jpg'].map((img, i) => (
              <img key={i} src={img!} alt={`Day outing ${i+1}`} className={`rounded-2xl object-cover w-full ${i===0?'col-span-2 aspect-[16/9]':'aspect-square'}`} loading="lazy" width={400} height={i===0?225:400} />
            ))}
          </div>
        </div>
      </section>
    </AnimateOnScroll>

    {/* 5. WEEKEND STAY */}
    <AnimateOnScroll animation="fade-up">
      <section className="landing-section bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10"><p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">Weekend Stays</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Cottages &amp; Cabanas by the Lake</h2><p className="text-gray-500 max-w-xl mx-auto">Stay overnight. Wake up to birdsong, mist over the lake, and a fresh farm breakfast.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SANCTUARIES.map((s) => (
              <article key={s.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow bg-white group">
                <div className="relative aspect-[4/3] overflow-hidden"><img src={wixImg(s.image,500,375)} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={500} height={375} />{s.tag && <span className="absolute top-3 left-3 bg-accent-gold text-white text-xs font-bold px-3 py-1 rounded-full">{s.tag}</span>}</div>
                <div className="p-5"><h3 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h3><p className="text-sm text-gray-500 mb-3 line-clamp-2">{s.description}</p><p className="text-primary font-bold text-lg">From ₹{s.nightPrice?.toLocaleString('en-IN')||s.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500"> / night</span></p></div>
              </article>
            ))}
          </div>
          <div className="bg-[#f9f7f4] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-8">
            <h3 className="font-bold text-lg mb-4 text-center">A Weekend at Salsons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
              {[
                ['2:00 PM', 'Check-in'],
                ['2:30 PM', 'Farm-to-table lunch'],
                ['4:00 PM', 'Boating'],
                ['5:00 PM', 'Pool & rain dance'],
                ['7:00 PM', 'BBQ & bonfire'],
                ['8:30 PM', 'Dinner'],
                ['7:00 AM', 'Sports'],
                ['9:00 AM', 'Breakfast'],
                ['10:30 AM', 'Check-out'],
              ].map(([t, a]) => (
                <div key={t} className="flex gap-3 py-1.5">
                  <span className="font-bold text-primary whitespace-nowrap">{t}</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center"><a href={`tel:${PHONE}`} onClick={() => track('call_click_stay')} className="landing-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-bold" id="stay-cta"><span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>Call for stay rates &amp; dates</a></div>
        </div>
      </section>
    </AnimateOnScroll>

    {/* 6. AMENITIES */}
    <AnimateOnScroll animation="fade-up">
      <section className="landing-section bg-[#f9f7f4]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">Amenities</h2>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {AMEN.map((a) => (<div key={a.label} className="flex flex-col items-center gap-2 p-4 sm:p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"><div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-primary text-2xl sm:text-3xl" aria-hidden="true">{a.icon}</span></div><span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">{a.label}</span></div>))}
          </div>
        </div>
      </section>
    </AnimateOnScroll>

    {/* 7. GALLERY */}
    <LazySection id="landing-gallery" className="landing-section bg-white" minHeight={400}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10"><p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-3">Gallery</p><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">See Salsons Retreat</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY.map((img,i) => (<img key={i} src={img} alt={`Salsons Retreat photo ${i+1}`} className={`rounded-xl object-cover w-full hover:scale-[1.02] transition-transform duration-500 ${i===0?'col-span-2 row-span-2 aspect-square':'aspect-[4/3]'}`} loading="lazy" width={400} height={i===0?400:300} />))}
        </div>
      </div>
    </LazySection>

    {/* 8. AUDIENCE CARDS */}
    <AnimateOnScroll animation="fade-up">
      <section className="landing-section bg-[#f9f7f4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Perfect For Everyone</h2><p className="text-gray-500 max-w-lg mx-auto">Whether you're planning a family outing, a romantic escape, or a group adventure.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {AUD.map((c) => (
              <article key={c.title} className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow group">
                <div className="relative aspect-[16/10] overflow-hidden"><img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={400} height={250} /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-4 left-4 flex items-center gap-2 text-white"><span className="material-symbols-outlined text-2xl" aria-hidden="true">{c.icon}</span><h3 className="text-lg font-bold">{c.title}</h3></div></div>
                <div className="p-5"><p className="text-sm text-gray-600 mb-4">{c.desc}</p><a href={`tel:${PHONE}`} onClick={() => track('call_click_audience')} className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"><span className="material-symbols-outlined text-base" aria-hidden="true">call</span>Call to book</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AnimateOnScroll>

    {/* 9. REVIEWS */}
    <LazySection id="landing-testimonials" minHeight={400}><Testimonials /></LazySection>

    {/* 10. FAQ */}
    <LazySection id="landing-faq" minHeight={400}><FAQ /></LazySection>

    {/* 11. FINAL CTA */}
    <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden" id="final-cta">
      <img src="https://static.wixstatic.com/media/9356bd_cb187cfabdf14aab8cf12939d9b5346d~mv2.jpg" alt="Sunset at Salsons Retreat" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">Ready for a break?<br/>Call us now.</h2>
        <p className="text-white/75 text-base sm:text-lg mb-8 max-w-md mx-auto">A lakeside escape is just one phone call away.</p>
        <a href={`tel:${PHONE}`} onClick={() => track('call_click_final')} className="landing-cta-primary inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-bold" id="final-cta-call">
          <span className="material-symbols-outlined text-xl" aria-hidden="true">call</span>Call ☎ {PHONE_DISPLAY}
        </a>
      </div>
    </section>

    {/* 12. CONTACT */}
    <section className="landing-section bg-background-soft">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <AnimateOnScroll animation="fade-right">
          <div className="text-center lg:text-left">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Find Us Here</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Your Escape Awaits</h3>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto lg:mx-0 mb-8" />
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 text-left max-w-md mx-auto lg:mx-0">
              <div className="space-y-5">
                <div className="flex items-start gap-4"><div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary text-2xl">location_on</span></div><div><h4 className="font-bold text-lg text-primary mb-1">Salsons Retreat</h4><p className="text-sm text-gray-500 leading-relaxed">Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221</p></div></div>
                <div className="h-px bg-gray-100" />
                <div className="flex items-start gap-4"><div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary text-2xl">phone</span></div><div><h4 className="font-bold text-lg text-primary mb-1">Call or WhatsApp <span className="font-normal text-base text-gray-500">(Mr. Vishnu)</span></h4><p className="text-sm text-gray-500"><a href={`tel:${PHONE}`} className="hover:text-primary transition-colors">{PHONE_DISPLAY}</a><span className="text-gray-300 mx-2">·</span><a href={`tel:${PHONE2}`} className="hover:text-primary transition-colors">+91 75692 42082</a></p></div></div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-left">
          <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white aspect-[4/3] min-h-[280px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.9033241741204!2d83.2187149!3d18.168366900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3bc263d91a65e9%3A0x3b1d67813f341ee4!2sSalsons%20Retreat!5e0!3m2!1sen!2sin!4v1771088032329!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Salsons Retreat on Google Maps" />
          </div>
        </AnimateOnScroll>
      </div>
    </section>

    <StickyCallBar />
  </main>
);
