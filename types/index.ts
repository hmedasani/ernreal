export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export type PropertyType = 'plot' | 'apartment' | 'villa';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: Location;
  images: string[];
  amenities: string[];
  description: string;
  type: PropertyType;
  area: number; // in sqft or sqm
  isFeatured?: boolean;
  status: 'available' | 'sold' | 'reserved';
  viewersToday?: number; // fake scarcity
  leftInStock?: number; // fake scarcity for plots
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
}

export interface SearchQuery {
  location?: string;
  type?: PropertyType | 'all';
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}
