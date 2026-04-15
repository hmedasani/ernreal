'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPropertyById } from '../../../lib/api';
import { Property } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import Image from 'next/image';
import { MapPin, BedDouble, Check, Calendar, ArrowLeft, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';
import { toggleWishlist } from '../../../features/wishlistSlice';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../../../components/property/MapView'), { ssr: false });

export default function PropertyDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const savedIds = useSelector((state: RootState) => state.wishlist.savedPropertyIds);
  const isSaved = property ? savedIds.includes(property.id) : false;

  useEffect(() => {
    fetchPropertyById(id).then(res => {
      setProperty(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <Skeleton className="h-[400px] w-full rounded-2xl mb-6" />
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="flex gap-8">
           <Skeleton className="h-[200px] flex-1 rounded-xl" />
           <Skeleton className="h-[300px] w-[350px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!property) {
    return <div className="text-center py-20 text-xl font-bold">Property not found.</div>;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 pb-32">
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-sm font-medium mb-4 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      {/* Title & Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
          <p className="flex items-center gap-1 text-muted-foreground">
             <MapPin className="h-4 w-4" /> {property.location.name}
          </p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => dispatch(toggleWishlist(property.id))}
             className="flex items-center gap-2 font-medium underline underline-offset-4 py-2 px-3 rounded hover:bg-muted transition"
           >
             <Heart className={`w-5 h-5 ${isSaved ? 'fill-destructive text-destructive' : ''}`} /> 
             {isSaved ? 'Saved' : 'Save'}
           </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] md:h-[550px] rounded-2xl overflow-hidden mb-12">
        <div className="col-span-4 md:col-span-2 row-span-2 relative h-full">
           <Image src={property.images[0]} alt="Main" fill className="object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        {property.images.slice(1, 5).map((img, idx) => (
           <div key={idx} className="hidden md:block col-span-1 row-span-1 relative h-full">
             <Image src={img} alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-12">
          
          <section className="flex flex-col gap-4 border-b pb-8">
            <h2 className="text-2xl font-bold">Minimalist {property.type} Details</h2>
            <div className="flex gap-4 items-center">
              <Badge variant="secondary" className="px-3 py-1 font-medium capitalize">{property.type}</Badge>
              <div className="flex items-center text-muted-foreground gap-1">
                 <BedDouble className="h-4 w-4" /> {property.area} sqft
              </div>
            </div>
            <p className="text-lg leading-relaxed mt-4">{property.description}</p>
          </section>

          <section className="border-b pb-8">
             <h2 className="text-2xl font-bold mb-6">Functional Amenities</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                {property.amenities.map(a => (
                  <div key={a} className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span className="font-medium text-foreground/90">{a}</span>
                  </div>
                ))}
             </div>
          </section>

          <section className="pb-8">
             <h2 className="text-2xl font-bold mb-6">Location Map</h2>
             <div className="h-[400px] w-full rounded-2xl overflow-hidden border">
                <MapView properties={[property]} />
             </div>
          </section>

        </div>

        {/* Right Column (Sticky Booking Widget) */}
        <div>
           <div className="sticky top-28 bg-card border rounded-2xl p-6 shadow-xl">
              <div className="flex items-baseline gap-2 mb-4">
                 <span className="text-3xl font-bold">{formatter.format(property.price)}</span>
                 <span className="text-muted-foreground font-medium">total</span>
              </div>

              {property.status === 'sold' ? (
                <div className="bg-destructive/10 text-destructive font-bold p-4 rounded-xl text-center mb-6">
                  This property is sold.
                </div>
              ) : (
                <>
                  <div className="border rounded-xl mb-6 divide-y overflow-hidden">
                     <div className="flex justify-between items-center p-4 bg-muted/30">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider mb-1">Site Visit</div>
                          <div className="text-muted-foreground">Select a date</div>
                        </div>
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                     </div>
                  </div>

                  <Button size="lg" className="w-full font-bold text-lg h-14 mb-4">
                     Schedule Visit
                  </Button>
                  <p className="text-center text-sm font-medium text-muted-foreground mb-6">
                    You won't be charged yet
                  </p>

                  {property.leftInStock && (
                     <div className="bg-secondary/20 text-yellow-700 dark:text-yellow-500 font-bold p-4 rounded-xl text-center mb-6 text-sm flex items-center justify-center gap-2">
                       <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                       </span>
                       Only {property.leftInStock} left! Fast moving.
                     </div>
                  )}

                  {property.viewersToday && property.viewersToday > 0 && (
                     <p className="text-center font-medium text-sm flex justify-center items-center gap-2">
                       <span className="inline-block w-2 w-2 rounded-full bg-primary" />
                       {property.viewersToday} people are looking right now.
                     </p>
                  )}
                </>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
