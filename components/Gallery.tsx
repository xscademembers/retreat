
import React from 'react';

interface GalleryImage {
  src: string;
  alt?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250205_062345.jpg', alt: 'Sunrise view at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250205_064653.jpg', alt: 'Pathway through greenery' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250207_154728.jpg', alt: 'Daytime view around the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250220_164134.jpg', alt: 'Thatipudi surroundings near Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250222_095648.jpg', alt: 'Retreat lawn and outdoor area' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250227_164908.jpg', alt: 'Golden hour at the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/463967095_8498570003565939_8020506935474932602_n.jpg', alt: 'Guests enjoying at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/464029820_8498287826927490_6454921871188945966_n.jpg', alt: 'Evening ambience at the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/464297925_8524908457598760_6136146724379510727_n.jpg', alt: 'Outdoor seating and greenery' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/DSC01837.JPG', alt: 'Farmhouse exterior at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/DSC02072.JPG', alt: 'Boating at Thatipudi near the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/DSC07622.JPG', alt: 'Pool or activity area at the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC1862.JPG', alt: 'Rooms at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC1866.JPG', alt: 'Retreat architecture and greenery' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC1929.JPG', alt: 'Evening lights at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC2093%20(1).JPG', alt: 'Open spaces and lawns at the retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC2112.JPG', alt: 'Outdoor chillout space at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC2120.JPG', alt: 'Courtyard at Salsons Retreat' },
  { src: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/_DSC2150%20(2).JPG', alt: 'Night ambience with lights at Salsons Retreat' },
];

export const Gallery: React.FC = () => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6" role="list">
      {GALLERY_IMAGES.map((img, idx) => (
        <figure
          key={img.src}
          className="mb-4 break-inside-avoid rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group relative shadow-md hover-scale focus-within:ring-2 focus-within:ring-primary/60 focus-within:ring-offset-2 w-full"
          role="listitem"
        >
          <img
            src={img.src}
            alt={img.alt || `Gallery image ${idx + 1}`}
            loading="lazy"
            className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 pointer-events-none" aria-hidden="true" />
        </figure>
      ))}
    </div>
  );
};
