import React, { useState } from 'react';
import { Feature } from '../types';

/** Map of feature id → image URLs for the home-page amenity tabs. */
const AMENITY_IMAGES: Record<string, string[]> = {
  '1': [
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg',
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg',
  ],
  '2': [
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745823767758-scaled.jpg',
  ],
  '3': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250222_095648.jpg',
  ],
  '4': [
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg',
  ],
  '5': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250220_164134.jpg',
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745404223339-scaled.jpg',
  ],
  '6': [
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg',
  ],
  '7': [
    'https://salsonsretreat.com/wp-content/uploads/2025/07/DSC01969-1024x683.jpeg',
  ],
  '8': [
    'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg',
  ],
};

interface AmenityTabsProps {
  features: Feature[];
}

const DEFAULT_ACTIVE_ID = '1'; // Pool Access

export const AmenityTabs: React.FC<AmenityTabsProps> = ({ features }) => {
  const [activeId, setActiveId] = useState<string>(DEFAULT_ACTIVE_ID);
  const activeFeature = features.find((f) => f.id === activeId) ?? features[0];
  const images = AMENITY_IMAGES[activeId] ?? AMENITY_IMAGES[DEFAULT_ACTIVE_ID];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Tabs: icon + label, left-aligned, touch-friendly on mobile */}
      <div
        className="flex flex-wrap justify-start gap-2 sm:gap-3 -mx-1 px-1"
        role="tablist"
        aria-label="Amenity categories"
      >
        {features.map((feature) => {
          const isActive = activeId === feature.id;
          return (
            <button
              key={feature.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`amenity-panel-${feature.id}`}
              id={`amenity-tab-${feature.id}`}
              onClick={() => setActiveId(feature.id)}
              className={`
                flex items-center gap-2 rounded-xl border-2 px-3 py-3 sm:px-4 min-h-[44px] text-left transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                [@media (prefers-reduced-motion: reduce)]:transition-none
                ${isActive
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <span
                className="material-symbols-outlined text-xl sm:text-2xl shrink-0 select-none"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">{feature.title}</span>
            </button>
          );
        })}
      </div>

      {/* Panel: images only (heading/description removed) */}
      <div
        id={`amenity-panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`amenity-tab-${activeId}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {images.map((src, idx) => (
            <div key={`${activeId}-${idx}`} className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`${activeFeature.title} — image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
