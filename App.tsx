import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Home } from './pages/Home';
import { Packages } from './pages/Packages';
import { BookNow } from './pages/BookNow';
import { GalleryPage } from './pages/GalleryPage';
import { Corporate } from './pages/Corporate';
import { Schools } from './pages/Schools';

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

  return (
    <div className="relative min-h-screen bg-white">
      <a
        href="#main-content"
        className="absolute left-[-9999px] w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navbar isScrolled={isScrolled} isHome={isHome} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/schools" element={<Schools />} />
      </Routes>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
