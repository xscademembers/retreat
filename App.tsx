
import React, { useState, useEffect } from 'react';
import { 
  EXPERIENCE_TIERS, 
  AMENITIES, 
  INCLUDED_FEATURES, 
  SANCTUARIES 
} from './constants';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ExperienceCard } from './components/ExperienceCard';
import { AmenitySection } from './components/AmenitySection';
import { SanctuaryCard } from './components/SanctuaryCard';
import { FeatureGrid } from './components/FeatureGrid';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="absolute left-[-9999px] w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <Navbar isScrolled={isScrolled} />

      <main id="main-content">
        {/* Section 1: Hero */}
        <section id="hero">
          <Hero />
        </section>

        {/* Section 2: Intro/Distinction */}
        <section id="sanctuary" className="bg-primary text-white py-24 lg:py-32 px-6 lg:px-12">
          <AnimateOnScroll animation="fade-up">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">Why Visit Salsons Retreat?</span>
            <h2 className="text-3xl lg:text-5xl font-semibold leading-snug">
              Escape the city. Relax in nature.
            </h2>
            <div className="w-20 h-px bg-white/30 mx-auto"></div>
            <p className="text-lg lg:text-xl font-light opacity-80 leading-relaxed max-w-2xl mx-auto">
              Leave the noise behind and unwind in pure, peaceful greenery. Our 6-acre farm stay in Thatipudi offers a serene escape—approximately 70km from Vizag and just 2 minutes from Thatipudi Reservoir.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">child_care</span>
                <span className="text-sm font-medium">Complimentary for kids under 5 yrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent-gold" aria-hidden="true">schedule</span>
                <span className="text-sm font-medium">9 AM – 7 PM · Available all days</span>
              </div>
            </div>
          </div>
          </AnimateOnScroll>
        </section>

        {/* Section 3: Pricing & Experience Tiers */}
        <section id="experiences" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Day Pass Packages</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Your Perfect Daycation Awaits</h3>
              <p className="text-gray-600">Unwind, explore, and recharge in a premium resort experience—without an overnight stay. Choose the package that fits your day.</p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {EXPERIENCE_TIERS.map((tier, idx) => (
                <AnimateOnScroll key={tier.id} animation="fade-up" delay={idx * 100} className="h-full">
                  <ExperienceCard tier={tier} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Main Amenities */}
        <section id="amenities" className="py-12 bg-background-soft">
          {AMENITIES.map((amenity, index) => (
            <AnimateOnScroll key={amenity.id} animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
              <AmenitySection 
                amenity={amenity} 
                reverse={index % 2 !== 0} 
              />
            </AnimateOnScroll>
          ))}
        </section>

        {/* Section 5: Included Features Grid */}
        <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white" aria-labelledby="included-heading">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll animation="fade-up">
            <header className="mb-16 max-w-2xl">
              <h2 id="included-heading" className="text-4xl font-extrabold tracking-tight mb-4">Included in Every Pass</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-4"></div>
              <p className="text-gray-600">All day pass packages include access to these amenities. Enjoy our 6-acre farm stay from 9 AM to 7 PM.</p>
            </header>
            </AnimateOnScroll>
            <FeatureGrid features={INCLUDED_FEATURES} />
          </div>
        </section>

        {/* Section 6: Full Width Immersive Hero */}
        <section className="relative h-[600px] overflow-hidden flex items-center justify-center text-center px-6">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg")',
            }}
          />
          <div className="relative z-10 max-w-3xl space-y-6">
            <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tighter">Your Perfect Daycation Awaits</h2>
            <p className="text-white/90 text-lg font-medium max-w-xl mx-auto">Unwind, explore, and recharge in a premium resort experience—without an overnight stay. Nature, luxury, and adventure, all in one day.</p>
            <a href="#contact" className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-background-soft hover:shadow-2xl hover:scale-105 transition-all duration-400 shadow-xl inline-block">Book Your Experience</a>
          </div>
        </section>

        {/* Section 7: Private Sanctuaries */}
        <section id="sanctuaries" className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll animation="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em]">Day Pass Add-Ons</h2>
                <h3 className="text-4xl font-extrabold tracking-tight">Add Rooms to Your Day Pass</h3>
              </div>
              <p className="max-w-md text-gray-500">Add rooms to your day pass package for extra comfort. All add-ons available 11 am to 7 pm.</p>
            </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {SANCTUARIES.map((item, idx) => (
                <AnimateOnScroll key={item.id} animation="fade-up" delay={idx * 120}>
                  <SanctuaryCard sanctuary={item} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Gallery */}
        <section id="gallery" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll animation="fade-up" className="mb-16 text-center">
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Visual Journey</h2>
              <h3 className="text-4xl font-extrabold tracking-tight">The Gallery</h3>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale-up">
              <Gallery />
            </AnimateOnScroll>
          </div>
        </section>

        {/* Section 9: Testimonials */}
        <Testimonials />

        {/* Section 10: Concierge / Contact */}
        <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 bg-background-soft">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <AnimateOnScroll animation="fade-right">
            <div>
              <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Find Us Here</h2>
              <h3 className="text-4xl font-extrabold tracking-tight mb-8">Your Escape Awaits</h3>
              <p className="text-gray-500 mb-10 leading-relaxed">Located in peaceful North Andhra, approximately 70km from Vizag. Contact us on WhatsApp for bookings and assistance.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">location_on</span>
                  </div>
                  <div>
                    <h5 className="font-bold">Salsons Retreat</h5>
                    <p className="text-sm text-gray-500">Vizianagaram Rd, Thatipudi, Andhra Pradesh 535221</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">phone</span>
                  </div>
                  <div>
                    <h5 className="font-bold">Call or WhatsApp</h5>
                    <a href="tel:+918074799387" className="text-sm text-gray-500 hover:text-primary">+91 80747 99387</a>
                    <span className="text-gray-400 mx-1">·</span>
                    <a href="tel:+917569242082" className="text-sm text-gray-500 hover:text-primary">+91 75692 42082</a>
                  </div>
                </div>
              </div>
            </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left">
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                    <input id="contact-name" type="text" name="name" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="John Doe" required aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                    <input id="contact-email" type="email" name="email" className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="john@example.com" required aria-required="true" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase text-gray-400">How can we help?</label>
                  <textarea id="contact-message" name="message" rows={4} className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 bg-gray-50" placeholder="Share your retreat preferences..."></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-bold hover:shadow-lg transition-all active:scale-[0.98]">
                  Send Message
                </button>
              </form>
            </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
