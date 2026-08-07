import { MOCK_PROPERTIES } from './mockData';
import { Property, SearchQuery } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProperties = async (query?: SearchQuery): Promise<Property[]> => {
  await delay(800); // 800ms mock network delay
  
  let result = [...MOCK_PROPERTIES];
  
  if (query) {
    if (query.type && query.type !== 'all') {
      result = result.filter(p => p.type === query.type);
    }
    if (query.minPrice !== undefined) {
      result = result.filter(p => p.price >= query.minPrice!);
    }
    if (query.maxPrice !== undefined) {
      result = result.filter(p => p.price <= query.maxPrice!);
    }
    if (query.location && query.location.trim() !== '') {
      const lowerLoc = query.location.toLowerCase();
      result = result.filter(p => p.location.name.toLowerCase().includes(lowerLoc));
    }
    if (query.amenities && query.amenities.length > 0) {
      result = result.filter(p => 
        query.amenities!.every(a => p.amenities.includes(a))
      );
    }
  }
  
  return result;
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  await delay(600);
  return MOCK_PROPERTIES.filter(p => p.isFeatured).slice(0, 6);
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  await delay(500);
  return MOCK_PROPERTIES.find(p => p.id === id) || null;
};
