'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { setSearchQuery, resetFilters } from '../../features/filterSlice';
import { Button } from '../ui/button';
import { SearchQuery } from '../../types';
import { Filter, X } from 'lucide-react';

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

  const activeFiltersCount = (query.amenities?.length || 0) + (query.type !== 'all' ? 1 : 0);

  return (
    <div className="w-full bg-card rounded-lg border border-border/50 p-6 flex flex-col gap-6 sticky top-24 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        {activeFiltersCount > 0 && (
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </div>

      {/* Property Type */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase tracking-wide text-foreground">Property Type</h4>
        <select 
          value={query.type} 
          onChange={handleTypeChange}
          className="w-full bg-background border border-border rounded-md p-2.5 text-sm font-medium hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
        >
          <option value="all">All Types</option>
          <option value="plot">Plot</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase tracking-wide text-foreground">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((amenity) => {
            const isSelected = query.amenities?.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => handleAmenityChange(amenity)}
                className={`text-xs px-3 py-2 rounded-md border-2 font-semibold transition-all duration-200 ${
                  isSelected 
                    ? 'bg-accent text-accent-foreground border-accent shadow-sm' 
                    : 'bg-background hover:bg-secondary border-border/50 hover:border-accent/50 text-foreground'
                }`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline"
          className="w-full font-bold border-2 border-border/50 hover:border-destructive hover:bg-destructive/10 group"
          onClick={() => dispatch(resetFilters())}
        >
          <X className="w-4 h-4 mr-2 group-hover:text-destructive" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
