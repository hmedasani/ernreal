'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPropertyById } from '../../../lib/api';
import { Property } from '../../../types';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import Image from 'next/image';
import { MapPin, BedDouble, Check, Calendar, ArrowLeft, Heart, Share2, Zap } from 'lucide-react';
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
        <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="flex gap-8">
           <Skeleton className="h-[200px] flex-1 rounded-lg" />
           <Skeleton className="h-[300px] w-[350px] rounded-lg" />
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
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-sm font-semibold mb-6 text-accent hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to listings
      </button>

      {/* Title & Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{property.title}</h1>
          <p className="flex items-center gap-2 text-muted-foreground text-lg">
             <MapPin className="h-5 w-5 text-accent" /> {property.location.name}
          </p>
        </div>
        <div className="flex gap-2">
           <Button 
             variant="ghost" 
             size="icon"
             onClick={() => dispatch(toggleWishlist(property.id))}
             className={`${isSaved ? 'text-destructive' : 'text-muted-foreground'} hover:scale-110 transition-transform`}
           >
             <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <Share2 className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[450px] md:h-[550px] rounded-lg overflow-hidden mb-12 shadow-lg">
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
        <div className="lg:col-span-2 space-y-10">
          
          {/* Price & Key Details */}
          <section className="bg-secondary/30 rounded-lg border border-border/50 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">Total Price</span>
                <div className="text-4xl font-bold text-accent mt-2">{formatter.format(property.price)}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BedDouble className="h-5 w-5 text-accent" />
                  <span className="font-medium">{property.area.toLocaleString()} sqft</span>
                </div>
                <Badge variant="default" className="w-fit capitalize">{property.type}</Badge>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About This Home</h2>
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">{property.description}</p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
              <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
              <p className="text-sm font-medium text-foreground">This property meets our high standards for modern, functional living.</p>
            </div>
          </section>

          {/* Amenities */}
          <section className="border-b pb-8">
             <h2 className="text-2xl font-bold mb-6">Amenities & Features</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(a => (
                  <div key={a} className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border/50 hover:border-accent/50 transition-colors">
                     <Check className="h-5 w-5 text-accent flex-shrink-0" />
                     <span className="font-medium text-foreground">{a}</span>
                  </div>
                ))}
             </div>
          </section>

          {/* Location Map */}
          <section>
             <h2 className="text-2xl font-bold mb-6">Location</h2>
             <div className="h-[400px] w-full rounded-lg overflow-hidden border border-border/50 shadow-md">
                <MapView properties={[property]} />
             </div>
          </section>

        </div>

        {/* Right Column (Sticky Booking Widget) */}
        <div>
           <div className="sticky top-28 bg-card border border-border/50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              
              {/* Price Display */}
              <div className="mb-6">
                <span className="text-muted-foreground text-sm font-semibold">PRICE</span>
                <div className="flex items-baseline gap-2 mt-1">
                   <span className="text-4xl font-bold text-accent">{formatter.format(property.price)}</span>
                </div>
              </div>

              {property.status === 'sold' ? (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive font-bold p-4 rounded-lg text-center mb-6">
                  ✓ This property has been sold
                </div>
              ) : (
                <>
                  {/* Limited Stock Alert */}
                  {property.leftInStock && (
                    <div className="bg-accent/10 border border-accent/30 text-accent font-bold p-4 rounded-lg text-center mb-6 text-sm flex items-center justify-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                      </span>
                      Only {property.leftInStock} left! Moving fast.
                    </div>
                  )}

                  {/* Views Today */}
                  {property.viewersToday && property.viewersToday > 0 && (
                    <p className="text-center font-semibold text-sm text-accent mb-6 flex justify-center items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                      {property.viewersToday} people viewing now
                    </p>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                       <Calendar className="h-5 w-5" />
                       Schedule Visit
                    </Button>
                    <Button size="lg" variant="outline" className="w-full font-bold border-2 border-border hover:border-accent/50">
                       Contact Agent
                    </Button>
                  </div>

                  <p className="text-center text-xs font-medium text-muted-foreground">
                    You won't be charged until you visit
                  </p>
                </>
              )}

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-border/50 space-y-3 text-sm">
                <p className="text-muted-foreground">✓ Verified listing</p>
                <p className="text-muted-foreground">✓ Secure booking</p>
                <p className="text-muted-foreground">✓ 24/7 support</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
