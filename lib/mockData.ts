import { Property, Location } from '../types';

const PROPERTY_TYPES = ['plot', 'apartment', 'villa'] as const;
const AMENITIES_LIST = [
  'Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Power Backup', 
  'Garden', 'Clubhouse', 'Wi-Fi', 'Balcony', 'Elevator'
];

const LOCATIONS: readonly Location[] = [
  { name: "Downtown Metropolis", lat: 40.7128, lng: -74.0060 },
  { name: "Sunnyvale Suburbs", lat: 37.3688, lng: -122.0363 },
  { name: "Pinecrest Hills", lat: 25.6617, lng: -80.3015 },
  { name: "Oceanview Estates", lat: 34.0522, lng: -118.2437 },
  { name: "Riverdale Greens", lat: 41.8781, lng: -87.6298 }
];

const getRandomSubset = <T>(arr: readonly T[], min: number, max: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (max - min + 1)) + min);
};

const IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
];

// Generate 50 mock properties
export const MOCK_PROPERTIES: Property[] = Array.from({ length: 50 }).map((_, i) => {
  const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const basePrice = Math.floor(Math.random() * 80 + 20) * 10000; // 200k to 1M
  
  // slightly randomize lat/lng for map scatter
  const latMod = (Math.random() - 0.5) * 0.05;
  const lngMod = (Math.random() - 0.5) * 0.05;

  return {
    id: `prop-${i + 1}`,
    title: `Beautiful ${type} in ${location.name}`,
    price: basePrice,
    location: {
      name: location.name,
      lat: location.lat + latMod,
      lng: location.lng + lngMod
    },
    images: getRandomSubset(IMAGES, 2, 5),
    amenities: getRandomSubset(AMENITIES_LIST, 3, 7),
    description: `This stunning ${type} located in the heart of ${location.name} offers exceptional living. Designed with IKEA-inspired functional minimalism, featuring spacious areas, natural light, and premium amenities. Perfect for modern living.`,
    type,
    area: Math.floor(Math.random() * 1500) + 500, // 500 to 2000 sqft
    isFeatured: Math.random() > 0.8,
    status: Math.random() > 0.9 ? 'sold' : 'available',
    viewersToday: Math.floor(Math.random() * 15),
    leftInStock: type === 'plot' ? Math.floor(Math.random() * 5) + 1 : undefined,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  };
});
