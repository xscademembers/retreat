import React from 'react';
import { Gallery } from '../components/Gallery';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

export const GalleryPage: React.FC = () => {
  return (
    <main id="main-content" className="pt-20 sm:pt-24">
      <section id="gallery" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="fade-up" className="mb-16 text-center">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Visual Journey</h2>
            <h3 className="text-4xl font-extrabold tracking-tight">The Gallery</h3>
          </AnimateOnScroll>
          <AnimateOnScroll animation="scale-up">
            <Gallery />
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
};
