
import React from 'react';

interface NavbarProps {
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="size-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tighter uppercase text-primary">Salsons Retreat</h2>
        </a>

        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#hero">Home</a>
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#experiences">Experiences</a>
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#amenities">Amenities</a>
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#gallery">Gallery</a>
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#testimonials">Testimonials</a>
          <a className="text-sm font-semibold text-primary/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4" href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="bg-primary text-white px-8 py-2.5 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:scale-105 transition-all inline-block">
          Book Now
        </a>
      </div>
    </header>
  );
};
