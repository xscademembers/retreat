import React from 'react';
import { AMENITY_IMAGES } from '../constants';

interface GalleryImage {
  src: string;
  alt?: string;
}

function buildGalleryImages(): GalleryImage[] {
  const seen = new Set<string>();
  const result: GalleryImage[] = [];
  const add = (url: string, alt?: string) => {
    if (seen.has(url)) return;
    seen.add(url);
    result.push({ src: url, alt });
  };
  Object.values(AMENITY_IMAGES).flat().forEach((url) => add(url));
  return result;
}

const GALLERY_IMAGES = buildGalleryImages();

export const Gallery: React.FC = () => {
  return (
    <div className="columns-2 lg:columns-3 gap-5 md:gap-6" role="list">
      {GALLERY_IMAGES.map((img, idx) => (
        <figure
          key={img.src}
          className="mb-4 break-inside-avoid rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group relative shadow-md hover-scale focus-within:ring-2 focus-within:ring-primary/60 focus-within:ring-offset-2 w-full"
          role="listitem"
        >
          <img
            src={img.src}
            alt={img.alt || `Gallery image ${idx + 1}`}
            loading={idx < 12 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={idx < 6 ? 'high' : undefined}
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 pointer-events-none" aria-hidden="true" />
        </figure>
      ))}
    </div>
  );
};
