
export interface ExperienceTier {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  recommended?: boolean;
  features: string[];
  icon: string;
}

export interface Amenity {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  icon: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Sanctuary {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
}
