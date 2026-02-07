
import React from 'react';
import { Feature } from '../types';
import { AnimateOnScroll } from './AnimateOnScroll';

interface FeatureGridProps {
  features: Feature[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {features.map((feature, idx) => (
        <AnimateOnScroll key={feature.id} animation="fade-up" delay={idx * 80}>
        <article className="group flex flex-col gap-4 hover-lift">
          <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-400 shrink-0">
            <span className="material-symbols-outlined text-3xl select-none" aria-hidden="true">{feature.icon}</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-primary">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
};
