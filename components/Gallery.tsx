
import React from 'react';

export const Gallery: React.FC = () => {
  const images: { src: string; span: string; alt?: string }[] = [
    { src: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745829330144.jpg', span: 'col-span-2 row-span-2', alt: 'Salsons Retreat nature and greenery' },
    { src: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg', span: 'col-span-1 row-span-1', alt: 'Party pool at Salsons Retreat' },
    { src: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745404223339-scaled.jpg', span: 'col-span-1 row-span-2', alt: 'Boating at Thatipudi Reservoir' },
    { src: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745823767758-scaled.jpg', span: 'col-span-1 row-span-1', alt: 'BBQ at poolside deck' },
    { src: 'https://salsonsretreat.com/wp-content/uploads/2025/07/DSC01969-1024x683.jpeg', span: 'col-span-2 row-span-1', alt: 'The Cottage at Salsons Retreat' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
      {images.map((img, idx) => (
        <div 
          key={idx} 
          className={`${img.span} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group relative shadow-md hover-scale`}
        >
          <img 
            src={img.src} 
            alt={img.alt || `Gallery image ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400"></div>
        </div>
      ))}
    </div>
  );
};
