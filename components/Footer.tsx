
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-white">
                <Logo size="footer" variant="light" />
              </div>
              <span className="text-base font-bold tracking-tighter uppercase">Salsons Retreat</span>
            </Link>
          </div>

          <nav className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-2 text-sm opacity-80 [&>a]:py-2 [&>a]:sm:py-0 [&>a]:min-h-[44px] [&>a]:sm:min-h-0 [&>a]:flex [&>a]:items-center" aria-label="Footer navigation">
            <Link className="hover:opacity-100 transition-opacity" to="/">Home</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/packages">Pricing</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/book-now">Book Now</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/amenities">Amenities</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/#testimonials">Testimonials</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/corporate">Corporate</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/schools">Schools</Link>
          </nav>
        </div>

        <div className="pt-6 text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">
          <p>© 2026 Salsons Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
