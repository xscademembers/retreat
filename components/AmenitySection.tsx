
import React from 'react';
import { Amenity } from '../types';

interface AmenitySectionProps {
  amenity: Amenity;
  reverse?: boolean;
}

export const AmenitySection: React.FC<AmenitySectionProps> = ({ amenity, reverse }) => {
  return (
    <div className={`flex flex-col lg:flex-row items-stretch min-h-[400px] sm:min-h-[500px] xl:min-h-[600px] ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-24 flex flex-col justify-center ${reverse ? 'bg-white' : 'bg-primary/5'}`}>
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 sm:mb-6">Amenity {amenity.number}</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 sm:mb-8 tracking-tighter text-primary">{amenity.title}</h2>
        <p className="text-base sm:text-lg text-primary/70 leading-relaxed max-w-md">
          {amenity.description}
        </p>
      </div>
      <div className="w-full lg:w-1/2 overflow-hidden relative min-h-[280px] sm:min-h-[400px]">
        <img className="w-full h-full object-cover absolute inset-0 transition-transform duration-[3s] hover:scale-105" src={amenity.image} alt={amenity.title} />
      </div>
    </div>
  );
};
