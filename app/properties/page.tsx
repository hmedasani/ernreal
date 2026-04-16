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
  loading: () => <Skeleton className="w-full h-full rounded-lg" /> 
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Properties</h1>
        <p className="text-muted-foreground text-lg">Discover your perfect home from our carefully curated collection.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Center - Property List */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <p className="text-muted-foreground mb-6 font-semibold flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-accent"></span>
            {status === 'loading' ? 'Loading properties...' : `${properties.length} homes found`}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {status === 'loading' 
              ? [1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="flex flex-col space-y-4">
                    <Skeleton className="h-[240px] w-full rounded-lg" />
                    <div className="space-y-2 px-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))
              : properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
            }
          </div>
          {status !== 'loading' && properties.length === 0 && (
             <div className="flex flex-col items-center justify-center h-96 text-center">
               <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                 <span className="text-3xl">🏠</span>
               </div>
               <h3 className="text-2xl font-bold mb-2">No properties found</h3>
               <p className="text-muted-foreground max-w-md">Try adjusting your filters or search criteria to discover more amazing homes.</p>
             </div>
          )}
        </div>

        {/* Right - Map View */}
        <div className="hidden lg:block w-[400px] xl:w-[500px] flex-shrink-0 rounded-lg overflow-hidden shadow-md h-full max-h-[calc(100vh-200px)] sticky top-24 border border-border/50">
          {status !== 'loading' && <MapView properties={properties} />}
        </div>
      </div>
    </div>
  );
}
