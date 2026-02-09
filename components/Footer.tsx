
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="size-6 text-white">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tighter uppercase">Salsons Retreat</span>
            </Link>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm opacity-80" aria-label="Footer navigation">
            <Link className="hover:opacity-100 transition-opacity" to="/">Home</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/packages">Packages</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/book-now">Book Now</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/#amenities">Amenities</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/gallery">Gallery</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/#testimonials">Testimonials</Link>
            <Link className="hover:opacity-100 transition-opacity" to="/#contact">Contact</Link>
          </nav>
        </div>

        <div className="pt-6 text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">
          <p>© 2026 Salsons Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
