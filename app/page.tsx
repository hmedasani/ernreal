import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';
import FeaturedCarousel from '../components/home/FeaturedCarousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/40 z-10"
        />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80")' }}
        />
        
        <div className="relative z-20 text-center px-4 w-full max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Find your functionally perfect home.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Simple, sustainable, and strictly designed real estate built for modern living.
          </p>

          {/* Minimalist Search Bar */}
          <div className="bg-background rounded-full p-2 flex flex-col md:flex-row items-center shadow-xl mx-auto max-w-3xl gap-2 transition-all hover:shadow-2xl">
            <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r">
              <div className="w-full text-left">
                <label className="block text-xs font-bold px-1 text-card-foreground">Location</label>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full bg-transparent outline-none text-sm p-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r">
              <div className="w-full text-left">
                <label className="block text-xs font-bold px-1 text-card-foreground">Type</label>
                <select className="w-full bg-transparent outline-none text-sm p-1 text-foreground">
                  <option value="all">Any property</option>
                  <option value="plot">Plot</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto px-2">
               <Link href="/properties">
                 <Button size="lg" className="w-full md:w-auto rounded-full px-8 gap-2">
                   <Search className="w-4 h-4" /> Search
                 </Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Homes</h2>
            <p className="text-muted-foreground">Functional designs that inspire living.</p>
          </div>
          <Link href="/properties">
            <Button variant="outline">View all</Button>
          </Link>
        </div>
        <FeaturedCarousel />
      </section>

      {/* Value Proposition */}
      <section className="bg-muted py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold mb-4">Clean Architecture</h3>
            <p className="text-muted-foreground">Properties selected for their minimal footprint and maximum utility.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold mb-4">Transparent Pricing</h3>
            <p className="text-muted-foreground">No hidden fees. Just upfront costs modeled on Swedish efficiency.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold mb-4">Easy Booking</h3>
            <p className="text-muted-foreground">Schedule site visits seamlessly directly from the platform.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
