import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Home } from './pages/Home';

const Packages = lazy(() => import('./pages/Packages').then((m) => ({ default: m.Packages })));
const BookNow = lazy(() => import('./pages/BookNow').then((m) => ({ default: m.BookNow })));
const Amenities = lazy(() => import('./pages/Amenities').then((m) => ({ default: m.Amenities })));
const NightVisit = lazy(() => import('./pages/NightVisit').then((m) => ({ default: m.NightVisit })));
const Accommodation = lazy(() => import('./pages/Accommodation').then((m) => ({ default: m.Accommodation })));
const Corporate = lazy(() => import('./pages/Corporate').then((m) => ({ default: m.Corporate })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const BlogList = lazy(() => import('./pages/BlogList').then((m) => ({ default: m.BlogList })));
const BlogPost = lazy(() => import('./pages/BlogPost').then((m) => ({ default: m.BlogPost })));
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })));

const SEO_BY_PATH: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Salsons Retreat Thatipudi | Farmstay & Resort Near Vizag | Day Outings & Stays',
    description:
      'Salsons Retreat is a 6-acre lakeside farmstay near Vizag. Enjoy pool parties, BBQ, boating, cricket & farm-to-table Andhra meals. Day outings from ₹990. Book now.',
  },
  '/day-spend': {
    title: 'Day Outing Near Vizag | Salsons Retreat Thatipudi | Pool, BBQ & Boating from ₹990',
    description:
      'Book a day outing at Salsons Retreat, just 70 km from Vizag. Packages from ₹990/person include pool access, farm-to-table lunch, sports & activities. Groups of 10–50 welcome.',
  },
  '/day-pass': {
    title: 'Day Outing Near Vizag | Salsons Retreat Thatipudi | Pool, BBQ & Boating from ₹990',
    description:
      'Book a day outing at Salsons Retreat, just 70 km from Vizag. Packages from ₹990/person include pool access, farm-to-table lunch, sports & activities. Groups of 10–50 welcome.',
  },
  '/accommodation': {
    title: 'Rooms & Stays at Salsons Retreat | Villa, Cottage & Lake-View Cabana Near Vizag',
    description:
      'Stay at Salsons Retreat Thatipudi in a lake-view Cabana, cosy Cottage, or private Villa. Overnight stays from ₹1,999/night with farm-to-table meals and resort amenities.',
  },
  '/rooms': {
    title: 'Rooms & Stays at Salsons Retreat | Villa, Cottage & Lake-View Cabana Near Vizag',
    description:
      'Stay at Salsons Retreat Thatipudi in a lake-view Cabana, cosy Cottage, or private Villa. Overnight stays from ₹1,999/night with farm-to-table meals and resort amenities.',
  },
  '/corporate': {
    title: 'Corporate Team Outing Near Vizag | Salsons Retreat | Day & Overnight Packages',
    description:
      'Plan your corporate team outing at Salsons Retreat, a 6-acre farmstay 70 km from Vizag. Pool, BBQ, cricket, boating for groups of 10–50. Custom packages. Get a free quote.',
  },
  '/about': {
    title: 'About Salsons Retreat | 6-Acre Lakeside Farmstay in Thatipudi, Andhra Pradesh',
    description:
      'Salsons Retreat is a family-run 6-acre farmstay near Thatipudi Reservoir, blending homestay warmth with resort amenities. Eco-conscious, pet-friendly, and 70 km from Vizag.',
  },
};

const AppShell: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Preload the Corporate route chunk during idle time so clicking
    // "Corporate Events" doesn't show a long blank Suspense fallback.
    if (typeof window === 'undefined') return;
    const schedule = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(cb);
      } else {
        window.setTimeout(cb, 300);
      }
    };
    schedule(() => {
      import('./pages/Corporate').catch(() => {});
    });
  }, []);

  useEffect(() => {
    const seo = SEO_BY_PATH[location.pathname];
    if (!seo) return;

    document.title = seo.title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', seo.description);
  }, [location.pathname]);

  useEffect(() => {
    // Smooth scroll to hash targets when route or hash changes
    if (location.hash) {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 96; // approximate navbar height
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    } else {
      // When navigating to a route without hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  const isHome = location.pathname === '/';
  const isAdmin = location.pathname === '/admin';
  const hideWhatsApp = location.pathname === '/corporate' || isAdmin;

  return (
    <div className="relative min-h-screen bg-white w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      {!isAdmin && <Navbar isScrolled={isScrolled} isHome={isHome} />}

      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/day-spend" element={<Packages />} />
          <Route path="/book-now" element={<BookNow />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/night-visit" element={<NightVisit />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdmin && <Footer />}
      {!hideWhatsApp && <WhatsAppFloat />}
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;

