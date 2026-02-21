
import { ExperienceTier, Amenity, Feature, Sanctuary } from './types';

export const EXPERIENCE_TIERS: ExperienceTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 990,
    description: 'Entry, pool access, farm-to-table lunch, and sports. Perfect for a relaxed day in nature.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg',
    icon: 'water_drop',
    features: ['Entry & welcome drink', 'Pool access', 'Lunch (farm-to-table, fresh hot Andhra food)', 'Sports (Cricket, Basketball, Football, Volleyball, Throwball)', 'Evening tea & cookies']
  },
  {
    id: 'value',
    name: 'Value',
    price: 1299,
    description: 'Everything in Basic plus mouth-watering barbecue on our breezy poolside deck.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745823767758-scaled.jpg',
    recommended: true,
    icon: 'restaurant',
    features: ['Everything in Basic', 'Barbecue (veg & non-veg options available)']
  },
  {
    id: 'adventure',
    name: 'Adventure',
    price: 1499,
    description: 'Everything in Value plus scenic boating at Thatipudi Reservoir, just 2 minutes away.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745404223339-scaled.jpg',
    icon: 'sailing',
    features: ['Everything in Value', 'Boating at Thatipudi Reservoir']
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'boating',
    number: '01',
    title: 'Boating at Thatipudi Reservoir',
    description: 'Glide through calm waters with a scenic boating experience at Thatipudi Reservoir, just 2 minutes from our retreat. A peaceful escape surrounded by nature.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745404223339-scaled.jpg',
    cta: 'Learn More',
    icon: 'sailing'
  },
  {
    id: 'pool',
    number: '02',
    title: 'Party Pool & Rain Dance Pool',
    description: 'Make a splash with our vibrant party pool and fun-filled rain dance zone. The perfect way to cool off and have fun with family and friends.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745403976516-scaled.jpg',
    cta: 'Learn More',
    icon: 'pool'
  },
  {
    id: 'cricket',
    number: '03',
    title: 'Cricket & Sports',
    description: 'Play cricket and other sports on our open lawns. Cricket, basketball, football, volleyball, and throwball are available for all ages—perfect for family and group fun.',
    image: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250222_095648.jpg',
    cta: 'Learn More',
    icon: 'sports_cricket'
  },
  {
    id: 'bbq',
    number: '04',
    title: 'BBQ at the Poolside Deck',
    description: 'Enjoy mouth-watering barbecue served fresh on our breezy poolside deck. Both veg and non-veg options available for the perfect outdoor dining experience.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/05/KOLORO_1745823767758-scaled.jpg',
    cta: 'Learn More',
    icon: 'restaurant'
  },
  {
    id: 'adventure',
    number: '05',
    title: 'Adventure',
    description: 'Explore nature walks, scenic trails, and outdoor adventures across our 6-acre retreat. The perfect way to unwind and discover the beauty of Thatipudi.',
    image: 'https://storage.googleapis.com/new_client_files/salsons%20retreat/20250220_164134.jpg',
    cta: 'Learn More',
    icon: 'explore'
  }
];

export const INCLUDED_FEATURES: Feature[] = [
  { id: '1', title: 'Pool Access', description: 'Party pool and rain dance pool for fun-filled splashes with family and friends.', icon: 'pool' },
  { id: '2', title: 'Farm-to-Table Lunch', description: 'Fresh hot Andhra-style lunch with locally sourced ingredients.', icon: 'restaurant' },
  { id: '3', title: 'Sports Amenities', description: 'Cricket, basketball, football, volleyball, and throwball for all ages.', icon: 'sports_soccer' },
  { id: '5', title: 'Nature Walks', description: 'Explore our 6-acre farm stay with peaceful greenery and open lawns.', icon: 'park' },
  { id: '6', title: "Children's Park", description: 'Kid-friendly spaces with safe areas for little ones to explore.', icon: 'child_care' },
  { id: '7', title: 'Indoor Games', description: 'Board games and indoor activities for relaxed downtime.', icon: 'casino' },
  { id: '8', title: 'Free Parking', description: 'Complimentary on-site parking for all guests.', icon: 'local_parking' },
  { id: '9', title: 'Others', description: 'More views of Salsons Retreat — rooms, grounds, and atmosphere.', icon: 'photo_library' }
];

/** Images per amenity tab (feature id → URLs). Used by AmenityTabs and Gallery. */
export const AMENITY_IMAGES: Record<string, string[]> = {
  '1': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/20250213_181706.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/20250220_164134.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/20250220_181023.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/20250220_181642.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/_DSC2150.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/pool%20access/_DSC2194(1).JPG',
  ],
  '2': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/20250401_194159(1).jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/20250401_200442.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/C0079T01.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/C0081T01.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/C0109T01.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/DSC01718.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/DSC01719.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/farm%20to%20lunch%20table/DSC01720.JPG',
  ],
  '3': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20250205_064653.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20250205_064747.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20250205_065100.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20251218_171142.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20251218_171345.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20251218_171508.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/20251218_171621.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/sports%20amenities/DSC07671.JPG',
  ],
  '5': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20231124_133922.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250204_135637.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250204_181848.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250205_063023.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250205_063943.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250205_064054.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250205_064114.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250205_064144.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/20250227_165237.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/nature%20walk/464084836_8498923933530546_4990788943227622358_n.jpg',
  ],
  '6': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/463967965_8498570010232605_4699588255386809466_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/463999436_8498570000232606_3969050139694318916_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464030062_8498570026899270_1668658381606751229_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464034957_8498570023565937_8838680924437929552_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464170593_8498923743530565_2979431165423215523_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464319244_8524907844265488_5894120423011943270_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464500690_8524907820932157_5667625327164885619_n.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/children_s%20park/464505859_8524907830932156_133848346347556420_n.jpg',
  ],
  '7': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/indoor%20games/Ludo.png',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/indoor%20games/UNO.png',
  ],
  '8': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/parking/parking%201.png',
  ],
  '9': [
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/20250205_062531.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/20250211_184237.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/20250223_120620.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/20250402_001324.jpg',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/C0171T01.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/C0183T01.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01544.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01837.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01842.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01849.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01870.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01872.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01879.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01906.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01942.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01949.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01953.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC01981.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC02085.JPG',
    'https://storage.googleapis.com/new_client_files/salsons%20retreat/others/DSC07574.JPG',
  ],
};

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'cabana',
    name: 'The Cabana',
    price: 2999,
    nightPrice: 3999,
    description: 'Cozy lake-facing cabanas with a private deck and terrace, perfect for glamping in nature. Enjoy stunning views, open skies, and a unique stay experience. 11 am to 7 pm.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/07/20250205_063355-768x1024.jpg'
  },
  {
    id: 'cottage',
    name: 'The Cottage',
    price: 1999,
    nightPrice: 2999,
    description: 'A charming cottage with two rooms and a dormitory, surrounded by gardens and open spaces. Spacious and homely, designed for relaxed stays with family or friends. 11 am to 7 pm.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/07/DSC01969-1024x683.jpeg',
    tag: 'Best Value'
  },
  {
    id: 'villa',
    name: 'The Villa',
    price: 2999,
    nightPrice: 3999,
    description: 'An elegant villa with two spacious rooms and large verandahs opening into lush greens. Thoughtfully designed for serene mornings and peaceful stays. 11 am to 7 pm.',
    image: 'https://salsonsretreat.com/wp-content/uploads/2025/07/DSC01937-1-1024x683.jpeg'
  }
];
