'use client';
import { Property } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, MapPin, BedDouble } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { toggleWishlist } from '../../features/wishlistSlice';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const dispatch = useDispatch();
  const savedIds = useSelector((state: RootState) => state.wishlist.savedPropertyIds);
  const isSaved = savedIds.includes(property.id);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden group cursor-pointer border-transparent hover:border-border transition-colors duration-200 shadow-sm hover:shadow-md">
        <Link href={`/properties/${property.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Badges container */}
            <div className="absolute top-3 pl-3 w-full pr-3 flex justify-between items-start">
              <div className="flex flex-col gap-1">
                {property.isFeatured && (
                  <Badge variant="secondary" className="shadow-sm font-semibold capitalize backdrop-blur-md bg-secondary/90">
                    Trending
                  </Badge>
                )}
                <Badge variant="default" className="shadow-sm capitalize max-w-fit">
                  {property.type}
                </Badge>
              </div>
            </div>
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {property.location.name}
              </p>
              <Link href={`/properties/${property.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg line-clamp-1 mt-1">{property.title}</h3>
              </Link>
            </div>
            {/* Wishlist button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleWishlist(property.id));
              }}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2 mb-3">
             <div className="flex items-center gap-1">
               <BedDouble className="h-4 w-4" />
               <span>{property.area} sqft</span>
             </div>
             {property.leftInStock && (
               <span className="text-destructive font-medium text-xs">Only {property.leftInStock} left!</span>
             )}
          </div>
          <div className="flex justify-between items-center border-t pt-3 mt-1">
            <span className="font-bold text-lg">{formatter.format(property.price)}</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold">
               {property.status}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
