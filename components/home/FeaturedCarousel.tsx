'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { getFeaturedProperties } from '../../features/propertySlice';
import PropertyCard from '../property/PropertyCard';
import { Skeleton } from '../ui/skeleton';

export default function FeaturedCarousel() {
  const dispatch = useDispatch<AppDispatch>();
  const { featuredProperties, status } = useSelector((state: RootState) => state.properties);

  useEffect(() => {
    if (featuredProperties.length === 0 && status !== 'loading') {
      dispatch(getFeaturedProperties());
    }
  }, [dispatch, featuredProperties.length, status]);

  if (status === 'loading' && featuredProperties.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-col space-y-3">
             <Skeleton className="h-[250px] w-full rounded-xl" />
             <Skeleton className="h-4 w-[250px]" />
             <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
