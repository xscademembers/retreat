import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface NavbarProps {
  isScrolled: boolean;
  isHome: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, isHome }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTransparent = isHome && !isScrolled && !mobileOpen;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const headerClasses = isTransparent
    ? 'bg-transparent py-4 sm:py-6'
    : 'bg-white/95 backdrop-blur-md shadow-sm py-4';

  const logoColor = isTransparent ? 'text-white' : 'text-primary';
  const titleColor = isTransparent ? 'text-white' : 'text-primary';
  const navLinkBase = isTransparent
    ? 'text-white/80 hover:text-white'
    : 'text-primary/80 hover:text-primary';
  const ctaClasses = isTransparent
    ? 'bg-white text-primary hover:bg-background-soft'
    : 'bg-primary text-white';

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 lg:-ml-8" onClick={closeMenu}>
          <div className={logoColor}>
            <Logo size="navbar" variant={isTransparent ? 'light' : 'dark'} />
          </div>
          <h2 className={`text-lg sm:text-xl font-bold tracking-tighter uppercase ${titleColor}`}>
            Salsons Retreat
          </h2>
        </Link>

        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main navigation"
        >
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/">Home</Link>
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/book-now">Pricing</Link>
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/amenities">Amenities</Link>
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/#testimonials">Testimonials</Link>
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/blogs">Blogs</Link>
          <Link className={`text-sm font-semibold transition-colors hover:underline underline-offset-4 min-h-[44px] flex items-center ${navLinkBase}`} to="/corporate">Corporate Events</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/book-now"
            className={`hidden sm:inline-block ${ctaClasses} px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:scale-105 transition-all min-h-[44px] flex items-center justify-center`}
          >
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-current hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl overflow-y-auto transition-all duration-300 ${
          mobileOpen ? 'max-h-[calc(100vh-4rem)] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
          <Link
            to="/"
            className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/book-now"
            className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5"
            onClick={closeMenu}
          >
            Pricing
          </Link>
          <Link to="/amenities" className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5" onClick={closeMenu}>Amenities</Link>
          <Link to="/#testimonials" className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5" onClick={closeMenu}>Testimonials</Link>
          <Link to="/blogs" className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5" onClick={closeMenu}>Blogs</Link>
          <Link to="/corporate" className="block py-3 px-4 rounded-xl text-primary font-semibold hover:bg-primary/5" onClick={closeMenu}>Corporate Events</Link>
          <Link to="/book-now" className="block mt-4 py-4 px-4 rounded-xl bg-primary text-white font-bold text-center hover:bg-primary/90" onClick={closeMenu}>Book Now</Link>
        </nav>
      </div>
    </header>
  );
};
