import { SANCTUARIES } from './constants';

export type NightRoomId = 'cabana' | 'cottage' | 'villa';

export interface NightRoomConfig {
  id: NightRoomId;
  title: string;
  pricePerNight: number;
  guests: string;
  beds: string;
  baths: string;
  images: string[];
  overview: string[];
  addons: string[];
}

export const NIGHT_ROOMS: NightRoomConfig[] = [
  {
    id: 'cabana',
    title: 'The Cabana',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'cabana')?.nightPrice ?? 3999,
    guests: '2–3 guests (+ up to 2 additional guests)',
    beds: '1 king bed',
    baths: '1 ensuite bath',
    images: [
      SANCTUARIES.find((s) => s.id === 'cabana')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_9cfdfe97a95d406a980b25fcf9ddca00~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_46f4ec3eda5b4d35973d9ead62b4f73e~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_1574897fad1248f6b5e84bca45121306~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_7e6fba9c2b9142db80ee8b47f6a46512~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_1d1035ff74864ebd8262af391620de4b~mv2.jpg',
    ],
    overview: ['Check-in 2 PM', 'Check-out 11 AM', 'Pool access', 'Lounge sit-out', 'Private terrace', 'Nature views'],
    addons: ['Breakfast add-on', 'Dinner buffet', 'BBQ by the pool', 'Boating at Thatipudi (2 min away)', 'Bonfire (seasonal)'],
  },
  {
    id: 'villa',
    title: 'The Villa',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'villa')?.nightPrice ?? 3999,
    guests: '2–3 guests (+ up to 2 additional guests)',
    beds: '1 king bed',
    baths: '1 bath',
    images: [
      SANCTUARIES.find((s) => s.id === 'villa')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_ad2f8c945e884253b490248d61e49f66~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_a235c822be154761ab73332e930e2886~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_0a94edde421d407eaf2463784a811b4d~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_5505f08a1a5843fe976765ef740a7cb2~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_f724ced3c68749c286a739136e3c6649~mv2.jpg',
      'https://static.wixstatic.com/media/9356bd_24f8ebdc4f6d40ceac530525c6acdfd2~mv2.jpg',
    ],
    overview: ['Check-in 2 PM', 'Check-out 11 AM', 'Pool access', 'Large verandah', 'Garden-facing rooms', 'Ideal for relaxed stays'],
    addons: ['Breakfast add-on', 'Dinner buffet', 'BBQ by the pool', 'Boating at Thatipudi (2 min away)', 'Bonfire (seasonal)'],
  },
  {
    id: 'cottage',
    title: 'The Cottage',
    pricePerNight: SANCTUARIES.find((s) => s.id === 'cottage')?.nightPrice ?? 2999,
    guests: '2–3 guests (+ up to 2 additional guests)',
    beds: '1 queen bed',
    baths: '1 ensuite bath',
    images: [
      SANCTUARIES.find((s) => s.id === 'cottage')?.image ?? '',
      'https://static.wixstatic.com/media/9356bd_a65bf02ed38740ae8e1542cb292fe187~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_56535fd4214d4b39994c0719ddacf234~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_ce46802178d942ef92df0b8d77290cb2~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_222dc747f753492eb30bb753c85e7691~mv2.webp',
      'https://static.wixstatic.com/media/9356bd_66a79d614dc04d8995eba15e30bf8122~mv2.webp',
    ],
    overview: ['Check-in 2 PM', 'Check-out 11 AM', 'Pool access', 'Spacious living area', 'Garden sit-out', 'Ideal for families & groups'],
    addons: ['Dorm with 4 beds (additional)', 'Breakfast add-on', 'Dinner buffet', 'BBQ by the pool', 'Boating at Thatipudi (2 min away)', 'Bonfire (seasonal)'],
  },
];

export function getNightRoom(id: NightRoomId): NightRoomConfig {
  const room = NIGHT_ROOMS.find((r) => r.id === id);
  if (!room) return NIGHT_ROOMS[0];
  return room;
}
