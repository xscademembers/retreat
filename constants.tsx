
import { ExperienceTier, Amenity, Feature, Sanctuary } from './types';

export const EXPERIENCE_TIERS: ExperienceTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 990,
    description: 'Entry, pool access, farm-to-table lunch, and sports. Perfect for a relaxed day in nature.',
    image: 'https://static.wixstatic.com/media/9356bd_3816a1b00f28406f9c5b34e61a665185~mv2.webp',
    icon: 'water_drop',
    features: ['Entry & welcome drink', 'Pool access', 'Lunch (farm-to-table, fresh hot Andhra food)', 'Sports (Cricket, Basketball, Football, Volleyball, Throwball)', 'Evening tea & cookies']
  },
  {
    id: 'value',
    name: 'Value',
    price: 1299,
    description: 'Everything in Basic plus mouth-watering barbecue on our breezy poolside deck.',
    image: 'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
    icon: 'restaurant',
    features: ['Everything in Basic', 'Barbecue (veg & non-veg options available)']
  },
  {
    id: 'adventure',
    name: 'Adventure',
    price: 1499,
    description: 'Everything in Value plus scenic boating at Thatipudi Reservoir, just 2 minutes away.',
    image: 'https://static.wixstatic.com/media/9356bd_3b34eead3ee14eb8ac3a8cb75ea1d6ce~mv2.webp',
    recommended: true,
    icon: 'sailing',
    features: ['Everything in Basic', 'Barbecue (veg & non-veg options available)', 'Boating at Thatipudi Reservoir']
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'boating',
    number: '01',
    title: 'Boating at Thatipudi Reservoir',
    description: 'Glide through calm waters with a scenic boating experience at Thatipudi Reservoir, just 2 minutes from our retreat. A peaceful escape surrounded by nature.',
    image: 'https://static.wixstatic.com/media/9356bd_37765711a58044968ecb66adb3beff87~mv2.jpg',
    cta: 'Learn More',
    icon: 'sailing'
  },
  {
    id: 'pool',
    number: '02',
    title: 'Party Pool & Rain Dance Pool',
    description: 'Make a splash with our vibrant party pool and fun-filled rain dance zone. The perfect way to cool off and have fun with family and friends.',
    image: 'https://static.wixstatic.com/media/9356bd_d054a7523ffe40a19119b7d594c1dc32~mv2.webp',
    cta: 'Learn More',
    icon: 'pool'
  },
  {
    id: 'cricket',
    number: '03',
    title: 'Cricket & Sports',
    description: 'Play cricket and other sports on our open lawns. Cricket, basketball, football, volleyball, and throwball are available for all ages—perfect for family and group fun.',
    image: 'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
    cta: 'Learn More',
    icon: 'sports_cricket'
  },
  {
    id: 'bbq',
    number: '04',
    title: 'BBQ at the Poolside Deck',
    description: 'Enjoy mouth-watering barbecue served fresh on our breezy poolside deck. Both veg and non-veg options available for the perfect outdoor dining experience.',
    image: 'https://static.wixstatic.com/media/9356bd_b9b735c1f92f4b2a94d7db8cfe09eba1~mv2.webp',
    cta: 'Learn More',
    icon: 'restaurant'
  },
  {
    id: 'adventure',
    number: '05',
    title: 'Adventure',
    description: 'Explore nature walks, scenic trails, and outdoor adventures across our 6-acre retreat. The perfect way to unwind and discover the beauty of Thatipudi.',
    image: 'https://static.wixstatic.com/media/9356bd_cbdf0a00e7034899b94d66fcded840fb~mv2.jpg',
    cta: 'Learn More',
    icon: 'explore'
  }
];

export const INCLUDED_FEATURES: Feature[] = [
  { id: '5', title: 'Nature Walks', description: 'Explore our 6-acre farm stay with peaceful greenery and open lawns.', icon: 'park' },
  { id: '3', title: 'Sports Amenities', description: 'Cricket, basketball, football, volleyball, and throwball for all ages.', icon: 'sports_soccer' },
  { id: '9', title: 'Rooms', description: 'More views of Salsons Retreat — rooms, grounds, and atmosphere.', icon: 'photo_library' },
  { id: '1', title: 'Swimming Pool', description: 'Cool off in our crystal-clear swimming pool with views of the surrounding greenery.', icon: 'pool' },
  { id: '10', title: 'Rain Dance Pool', description: 'Dance under the open sky with music and water jets at our dedicated rain dance pool.', icon: 'pool' },
  { id: '2', title: 'Farm-to-Table Lunch', description: 'Fresh hot Andhra-style lunch with locally sourced ingredients.', icon: 'restaurant' },
  { id: '6', title: "Children's Park", description: 'Kid-friendly spaces with safe areas for little ones to explore.', icon: 'child_care' },
  { id: '7', title: 'Indoor Games', description: 'Board games and indoor activities for relaxed downtime.', icon: 'casino' },
  { id: '8', title: 'Free Parking', description: 'Complimentary on-site parking for all guests.', icon: 'local_parking' }
];

/** Images whose pixel data is rotated 90° CCW (EXIF stripped). Rotate 90° CW to display upright. */
export const ROTATED_90CW: Set<string> = new Set([
  'https://static.wixstatic.com/media/9356bd_0f7ad23f131d43579af31efc6aff1fc9~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_72b4de6522874b8cb019957a09d9fb79~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_71c947440a164b779bda8ed03c0d3b29~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_eb6eb420ac394650bad2dab7954b40bb~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_3c005c17da944e3e9f9c73647e1c5d51~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_c4eb27d54bc04113bb06dd80f4f4be0d~mv2.jpg',
  'https://static.wixstatic.com/media/9356bd_8549bc15056648f89c25e8b7eea7b199~mv2.jpg',
]);

/** Images whose pixel data is rotated 90° CW (EXIF stripped). Rotate 90° CCW to display upright. */
export const ROTATED_90CCW: Set<string> = new Set([
  'https://static.wixstatic.com/media/9356bd_f5a9ad6d0ff04b4caaecd44e11f59bd6~mv2.jpg',
]);

/** Images per amenity tab (feature id → URLs). Used by AmenityTabs and Gallery. */
export const AMENITY_IMAGES: Record<string, string[]> = {
  '1': [
    'https://static.wixstatic.com/media/9356bd_0cd3be2497a84062bbec961c4d4f8755~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_2f754596e62b44bfbaf4bf5cb4d09b76~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_6208e3777f554b45bac8222ec20c614f~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_8d7e3b6c9ba44bdd890d1f62f71333c5~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_b4992d19dffc46869c5b07039e4b47cb~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_5043d2c8593e4db2beeb30ef46c82fb0~mv2.jpg',
  ],
  '2': [
    'https://static.wixstatic.com/media/9356bd_2bd050337a89460eb03a3ae211182d6a~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_b9b735c1f92f4b2a94d7db8cfe09eba1~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_ce81500e796e4082afba44695f4f6591~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_7b3e8c6c95bd47b587e03fdb86c4d960~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_3d97da84f650440ab9c672bb41844bac~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_caf24074d89542f7aa4a3e363dec5229~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_b5c0adc64d504d55b193943f991b047c~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_a687930934b84003b77c9b7910108b85~mv2.webp',
  ],
  '3': [
    'https://static.wixstatic.com/media/9356bd_0f7ad23f131d43579af31efc6aff1fc9~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_72b4de6522874b8cb019957a09d9fb79~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_0b96740b7f94421390f2ef977fb2966d~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_71c947440a164b779bda8ed03c0d3b29~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_614c6420a8ca463db995ca5d6036f950~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_eb6eb420ac394650bad2dab7954b40bb~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_3c005c17da944e3e9f9c73647e1c5d51~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_c4eb27d54bc04113bb06dd80f4f4be0d~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_f5a9ad6d0ff04b4caaecd44e11f59bd6~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_8549bc15056648f89c25e8b7eea7b199~mv2.jpg',
  ],
  '5': [
    'https://static.wixstatic.com/media/9356bd_cf3a8a3d18cf48e8897bc3c754cba84b~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_cb187cfabdf14aab8cf12939d9b5346d~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_6dfb20dfb50d489096e6c9a0b19fcaf4~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_6784106fa9cc4944864a2a970926cd68~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_f43815016b924e8084e378cebaed9f13~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_9cfdfe97a95d406a980b25fcf9ddca00~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_1574897fad1248f6b5e84bca45121306~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_7e6fba9c2b9142db80ee8b47f6a46512~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_1d1035ff74864ebd8262af391620de4b~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_71c8625bb8644c82970cefa10b21629c~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_0d3d890ee54b4283966963dd6e6237e6~mv2.jpg',
  ],
  '6': [
    'https://static.wixstatic.com/media/9356bd_3c43503016cc45abaf4287a3f858b681~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_f1cda0367d874f80b9d01c163de19f9f~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_9b00d7a9870d4c70b8f39c1b822c1af3~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_0418eb3ea0384cafafad91997e7dac51~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_73a9977cb79042e9aae66a543785c63d~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_73b9120b173442d09204d34e29b74476~mv2.webp',
  ],
  '7': [
    'https://static.wixstatic.com/media/9356bd_ed2ac8bbcced49a1a62bd8025a8b8e9e~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_d0fa9f2de636434c9d51868e7cad0958~mv2.webp',
  ],
  '8': [
    'https://static.wixstatic.com/media/9356bd_9752a23d2504471a949c5daba691786f~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_0d3d890ee54b4283966963dd6e6237e6~mv2.jpg',
  ],
  '9': [
    'https://static.wixstatic.com/media/9356bd_1f1fa47aa22d433383b98f5df5705eed~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_f93bc2244d2b4a0189bfb7838eb5c387~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_7e452ea0b66b4c7e88b548d85d604be2~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_62f2843c2f914fbb8d39eed01d81b063~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_ceaf9418d88742509ab091839850cb4b~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_85df8a71399c4cfebc661d8740919d9a~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_1195f96b976648a0945b0a2c4966090d~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_e4912cc4b0934dfcbe16e71fb3de2260~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_f5158b166f1442a3943ae4ed3af2e741~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_2a90d80607074ad58a9e61215ad25463~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_4b4d2bcfe26141ae934f57285fe9e223~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_90b0787fb3e64e178cdcbb49b841c4a5~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_d5829fbf36154d06a58b4cfbd63c95cc~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_d3736690e3d64201aa3b5610b2051e04~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_73b31b3eca294c18b85b979f36fc9d04~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_e851a202483c4522bbcc98088f3690ec~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_fd6bcc947e45426b9d67ad509c4e131f~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_147a4039eaa643aab17df458070827f0~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_cd49fed2704440d7a0849ba424b04756~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_08c46042af4d4f56bab70e943009abbb~mv2.jpg',
    'https://static.wixstatic.com/media/9356bd_317174fbeb334ef9bd88ed3e1a4d2c94~mv2.webp',
  ],
  '10': [
    'https://static.wixstatic.com/media/9356bd_b8d6575cee52495c86964a4b57e49941~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_ef2997e7d9a34de29a7b71f8708992cb~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_d980c251ef6e462595efe1c09e1dfe41~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_d054a7523ffe40a19119b7d594c1dc32~mv2.webp',
    'https://static.wixstatic.com/media/9356bd_1409902ce75f464b98a31e88c56c87bf~mv2.webp',
  ],
};

export const SANCTUARIES: Sanctuary[] = [
  {
    id: 'cabana',
    name: 'The Cabana',
    price: 2999,
    nightPrice: 3999,
    description: 'Cozy lake-facing cabanas with a private deck and terrace, perfect for glamping in nature. Enjoy stunning views, open skies, and a unique stay experience. 11 am to 7 pm.',
    image: 'https://static.wixstatic.com/media/9356bd_463e12e935b94c90b510dd8119516c4a~mv2.jpg'
  },
  {
    id: 'cottage',
    name: 'The Cottage',
    price: 1999,
    nightPrice: 2999,
    description: 'A charming cottage with two rooms and a dormitory, surrounded by gardens and open spaces. Spacious and homely, designed for relaxed stays with family or friends. 11 am to 7 pm.',
    image: 'https://static.wixstatic.com/media/9356bd_66a79d614dc04d8995eba15e30bf8122~mv2.webp',
    tag: 'Best Value'
  },
  {
    id: 'villa',
    name: 'The Villa',
    price: 2999,
    nightPrice: 3999,
    description: 'An elegant villa with two spacious rooms and large verandahs opening into lush greens. Thoughtfully designed for serene mornings and peaceful stays. 11 am to 7 pm.',
    image: 'https://static.wixstatic.com/media/9356bd_ff7051479d6d42dcb67197b538b55359~mv2.webp'
  }
];
