
import React from 'react';
import { Sanctuary } from '../types';

interface SanctuaryCardProps {
  sanctuary: Sanctuary;
}

export const SanctuaryCard: React.FC<SanctuaryCardProps> = ({ sanctuary }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative hover-lift h-full flex flex-col">
      {sanctuary.tag && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          {sanctuary.tag}
        </div>
      )}
      <div className="h-64 overflow-hidden">
        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={sanctuary.image} alt={sanctuary.name} />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-2xl font-bold text-primary">{sanctuary.name}</h4>
          <span className="text-primary font-extrabold">₹{sanctuary.price.toLocaleString('en-IN')}<span className="text-xs text-gray-400 font-normal ml-1">(11am–7pm)</span></span>
        </div>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">
          {sanctuary.description}
        </p>
        <a href="/book-now" className={`w-full py-3 font-bold rounded-full transition-all duration-300 border border-primary text-center block mt-auto shrink-0 ${sanctuary.tag ? 'bg-primary text-white hover:opacity-90 hover:shadow-lg' : 'text-primary hover:bg-primary hover:text-white'}`}>
          Book Now
        </a>
      </div>
    </div>
  );
};
