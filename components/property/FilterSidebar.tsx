'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { setSearchQuery, resetFilters } from '../../features/filterSlice';
import { Button } from '../ui/button';
import { SearchQuery } from '../../types';

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filters.query);

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Power Backup',
    'Garden', 'Clubhouse', 'Wi-Fi', 'Balcony', 'Elevator'
  ];

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchQuery({ type: e.target.value as SearchQuery['type'] }));
  };

  const handleAmenityChange = (amenity: string) => {
    const current = query.amenities || [];
    if (current.includes(amenity)) {
      dispatch(setSearchQuery({ amenities: current.filter(a => a !== amenity) }));
    } else {
      dispatch(setSearchQuery({ amenities: [...current, amenity] }));
    }
  };

  return (
    <div className="w-full bg-card rounded-xl border p-5 flex flex-col gap-6 sticky top-24">
      <div>
         <h4 className="font-semibold mb-3">Property Type</h4>
         <select 
           value={query.type} 
           onChange={handleTypeChange}
           className="w-full bg-background border rounded-md p-2 text-sm"
         >
           <option value="all">All Types</option>
           <option value="plot">Plot</option>
           <option value="apartment">Apartment</option>
           <option value="villa">Villa</option>
         </select>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((amenity) => {
            const isSelected = query.amenities?.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => handleAmenityChange(amenity)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted text-muted-foreground'
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full font-bold"
        onClick={() => dispatch(resetFilters())}
      >
        Clear Filters
      </Button>
    </div>
  );
}
