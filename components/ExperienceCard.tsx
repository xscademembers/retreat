
import React from 'react';
import { ExperienceTier } from '../types';

interface ExperienceCardProps {
  tier: ExperienceTier;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ tier }) => {
  return (
    <div className={`flex flex-col h-full rounded-3xl border ${tier.recommended ? 'border-primary shadow-2xl ring-1 ring-primary/20' : 'border-gray-200'} bg-white p-8 group relative hover-lift transition-all duration-500 hover:shadow-2xl hover:border-primary/30`}>
      {tier.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
          Recommended
        </div>
      )}
      
      <div className="space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <h4 className="text-primary font-bold text-lg uppercase tracking-wider">{tier.name.split(' ')[0]}</h4>
          <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform" aria-hidden="true">
            {tier.icon}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-extrabold tracking-tighter ${tier.recommended ? 'text-primary' : 'text-gray-900'}`}>₹{tier.price.toLocaleString('en-IN')}</span>
          <span className="text-gray-500 font-medium">/person</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{tier.description}</p>
      </div>

      <ul className="space-y-4 pt-4 border-t border-gray-100 flex-1 min-h-0">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm">
            <span className="material-symbols-outlined text-primary text-lg shrink-0" aria-hidden="true">check_circle</span>
            {feature}
          </li>
        ))}
      </ul>

      <a href="#contact" className={`w-full py-4 rounded-full font-bold transition-all duration-300 text-sm tracking-wide text-center mt-6 shrink-0 ${tier.recommended ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-xl' : 'bg-gray-100 text-primary hover:bg-primary hover:text-white'}`}>
        Book Now
      </a>
    </div>
  );
};
