import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

interface NavbarProps {
  isScrolled: boolean;
  isHome: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, isHome }) => {
  const isTransparent = isHome && !isScrolled;

  const headerClasses = isTransparent
    ? 'bg-transparent py-6'
    : 'bg-white/95 backdrop-blur-md shadow-sm py-4';

  const logoColor = isTransparent ? 'text-white' : 'text-primary';
  const titleColor = isTransparent ? 'text-white' : 'text-primary';
  const navLinkBase = isTransparent
    ? 'text-white/80 hover:text-white'
    : 'text-primary/80 hover:text-primary';
  const ctaClasses = isTransparent
    ? 'bg-white text-primary hover:bg-background-soft'
    : 'bg-primary text-white';

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group lg:-ml-8">
          <div className={logoColor}>
            <Logo size="navbar" variant={isTransparent ? 'light' : 'dark'} />
          </div>
          <h2
            className={`text-xl font-bold tracking-tighter uppercase ${titleColor}`}
          >
            Salsons Retreat
          </h2>
        </Link>

        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/"
          >
            Home
          </Link>
          <div className="relative group">
            <Link
              to="/packages"
              className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 flex items-center gap-0.5 ${navLinkBase}`}
              aria-haspopup="true"
            >
              Pricing
              <span className="material-symbols-outlined text-lg" aria-hidden="true">expand_more</span>
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px]">
                <Link
                  to="/packages#packages"
                  className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors first:rounded-t-xl"
                >
                  Day pass
                </Link>
                <Link
                  to="/packages#sanctuaries"
                  className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors last:rounded-b-xl"
                >
                  Rooms
                </Link>
              </div>
            </div>
          </div>
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/#amenities"
          >
            Amenities
          </Link>
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/gallery"
          >
            Gallery
          </Link>
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/#testimonials"
          >
            Testimonials
          </Link>
          <div className="relative group">
            <span
              className={`text-sm font-semibold transition-colors duration-300 cursor-pointer flex items-center gap-0.5 ${navLinkBase}`}
              aria-haspopup="true"
            >
              Landing
              <span className="material-symbols-outlined text-lg" aria-hidden="true">expand_more</span>
            </span>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px]">
                <Link
                  to="/corporate"
                  className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors first:rounded-t-xl"
                >
                  Corporate
                </Link>
                <Link
                  to="/schools"
                  className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors last:rounded-b-xl"
                >
                  Schools
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Link
          to="/book-now"
          className={`${ctaClasses} px-8 py-2.5 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:scale-105 transition-all inline-block`}
        >
          Book Now
        </Link>
      </div>
    </header>
  );
};
