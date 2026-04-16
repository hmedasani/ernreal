'use client';
import { Property } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, MapPin, BedDouble, Star } from 'lucide-react';
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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="overflow-hidden group cursor-pointer h-full flex flex-col border-border/50 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-accent/10">
        <Link href={`/properties/${property.id}`} className="flex-1 flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Badges container */}
            <div className="absolute top-3 inset-x-3 flex justify-between items-start">
              <div className="flex flex-col gap-2">
                {property.isFeatured && (
                  <Badge variant="default" className="shadow-md font-semibold capitalize backdrop-blur-sm bg-accent text-accent-foreground flex items-center gap-1 w-fit">
                    <Star className="h-3 w-3" /> Trending
                  </Badge>
                )}
                <Badge variant="secondary" className="shadow-md capitalize max-w-fit font-semibold">
                  {property.type}
                </Badge>
              </div>
              
              {/* Wishlist button - floating */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleWishlist(property.id));
                }}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                  isSaved 
                    ? 'bg-destructive/90 text-destructive-foreground shadow-md' 
                    : 'bg-black/30 text-white hover:bg-black/50'
                }`}
                aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Limited Stock Indicator */}
            {property.leftInStock && (
              <div className="absolute bottom-2 left-2 right-2">
                <div className="inline-block bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded shadow-md">
                  Only {property.leftInStock} left!
                </div>
              </div>
            )}
          </div>
        </Link>

        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 uppercase font-semibold">
              <MapPin className="h-3 w-3" /> {property.location.name}
            </p>
            <Link href={`/properties/${property.id}`} className="group/link">
              <h3 className="font-bold text-base line-clamp-2 mt-1 group-hover/link:text-accent transition-colors">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
              <BedDouble className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{property.area.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="border-t border-border/50 pt-3 mt-3 flex justify-between items-end">
            <div>
              <span className="text-xs text-muted-foreground block uppercase font-semibold">Price</span>
              <span className="font-bold text-lg text-accent">{formatter.format(property.price)}</span>
            </div>
            <span className="text-xs text-muted-foreground uppercase font-semibold bg-secondary/50 px-2 py-1 rounded">
              {property.status}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
