import React from 'react';
import { Link } from 'react-router-dom';

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
          <div className={`size-8 ${logoColor}`}>
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
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
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/packages"
          >
            Packages
          </Link>
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
          <Link
            className={`text-sm font-semibold transition-colors duration-300 hover:underline underline-offset-4 ${navLinkBase}`}
            to="/#contact"
          >
            Contact
          </Link>
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
