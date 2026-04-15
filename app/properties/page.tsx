'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../lib/store';
import { getProperties } from '../../features/propertySlice';
import PropertyCard from '../../components/property/PropertyCard';
import FilterSidebar from '../../components/property/FilterSidebar';
import { Skeleton } from '../../components/ui/skeleton';
// react-leaflet needs to be dynamite loaded carefully on nextjs
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../../components/property/MapView'), { 
  ssr: false, 
  loading: () => <Skeleton className="w-full h-full rounded-xl" /> 
});

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, status } = useSelector((state: RootState) => state.properties);
  const query = useSelector((state: RootState) => state.filters.query);

  useEffect(() => {
    dispatch(getProperties(query));
  }, [dispatch, query]);

  return (
    <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 py-6 pb-20">
      <h1 className="text-3xl font-bold mb-6">Explore Properties</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)]">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Center - Property List */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <p className="text-muted-foreground mb-4 font-medium">
            {status === 'loading' ? 'Loading properties...' : `${properties.length} homes found`}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {status === 'loading' 
              ? [1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))
              : properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
            }
          </div>
          {status !== 'loading' && properties.length === 0 && (
             <div className="flex flex-col items-center justify-center h-64 text-center">
               <h3 className="text-xl font-bold mb-2">No properties found</h3>
               <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
             </div>
          )}
        </div>

        {/* Right - Map View */}
        <div className="hidden lg:block w-[400px] xl:w-[500px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm h-full max-h-[85vh] sticky top-24">
          {status !== 'loading' && <MapView properties={properties} />}
        </div>
      </div>
    </div>
  );
}
