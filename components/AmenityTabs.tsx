import React, { useState } from 'react';
import { Feature } from '../types';
import { AMENITY_IMAGES } from '../constants';

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

      {/* Panel: masonry layout, images shown fully (no crop) */}
      <div
        id={`amenity-panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`amenity-tab-${activeId}`}
      >
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-5">
          {images.map((src, idx) => (
            <div
              key={`${activeId}-${idx}`}
              className="break-inside-avoid mb-4 overflow-hidden rounded-xl sm:rounded-2xl"
            >
              <img
                src={src}
                alt={`${activeFeature.title} — image ${idx + 1}`}
                loading={idx < 8 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx < 4 ? 'high' : undefined}
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
