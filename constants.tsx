
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
  { id: '4', title: 'Wi-Fi', description: 'Stay connected with Wi-Fi available across the retreat.', icon: 'wifi' },
  { id: '5', title: 'Nature Walks', description: 'Explore our 6-acre farm stay with peaceful greenery and open lawns.', icon: 'park' },
  { id: '6', title: "Children's Park", description: 'Kid-friendly spaces with safe areas for little ones to explore.', icon: 'child_care' },
  { id: '7', title: 'Indoor Games', description: 'Board games and indoor activities for relaxed downtime.', icon: 'casino' },
  { id: '8', title: 'Free Parking', description: 'Complimentary on-site parking for all guests.', icon: 'local_parking' }
];

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
    nightPrice: 3999,
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
