
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="px-6 lg:px-12 pt-32 pb-12 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-primary hero-animate-in break-words">
            <span className="block">The Best Day-Out</span>
            <span className="block font-light italic text-primary/70 mt-2">Spot Near Vizag</span>
          </h1>
          <p className="text-lg lg:text-xl text-primary/70 max-w-lg leading-relaxed hero-animate-in hero-animate-in-delay-1">
            Relax, recharge, and enjoy exclusive access to nature, luxury, and adventure—all in a single day.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 hero-animate-in hero-animate-in-delay-2">
            <a href="#contact" className="bg-primary text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/25 hover:translate-y-[-4px] transition-all duration-400 ease-out inline-block text-center active:translate-y-0">
              Book Your Experience
            </a>
            <a href="#experiences" className="border-2 border-primary/20 text-primary px-10 py-5 rounded-full text-lg font-bold hover:bg-primary/5 hover:border-primary/40 transition-all duration-400 inline-block text-center">
              View Packages
            </a>
          </div>
        </div>
        
        <div className="relative group hero-animate-in hero-animate-in-delay-3">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
            <img 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              src="https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg" 
              alt="Salsons Retreat - 6-acre farm stay in Thatipudi with pool, nature, and adventure near Vizag"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-100 transition-transform duration-500 hover:scale-105">
             <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <span className="material-symbols-outlined fill-current" aria-hidden="true">star</span>
                </div>
                <div>
                  <p className="text-sm font-bold">6-Acre Farm Stay</p>
                  <p className="text-xs text-gray-500">Thatipudi, Near Vizag</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
