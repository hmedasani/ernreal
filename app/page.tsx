import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Search, Check } from 'lucide-react';
import FeaturedCarousel from '../components/home/FeaturedCarousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-black/50 z-10 backdrop-blur-sm"
        />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80")' }}
        />
        
        <div className="relative z-20 text-center px-4 w-full max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Find your functionally perfect home.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Simple, sustainable, and strictly designed real estate built for modern living.
          </p>

          {/* Enhanced Search Bar */}
          <div className="bg-card rounded-lg p-3 flex flex-col md:flex-row items-center shadow-xl mx-auto max-w-3xl gap-0 md:gap-1 transition-all hover:shadow-2xl border border-border/50">
            <div className="flex-1 w-full flex items-center px-4 py-3 border-b md:border-b-0 md:border-r md:border-border/50">
              <div className="w-full text-left">
                <label className="block text-xs font-bold px-1 text-foreground/70 uppercase tracking-wide">Location</label>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full bg-transparent outline-none text-sm p-1 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex-1 w-full flex items-center px-4 py-3 border-b md:border-b-0 md:border-r md:border-border/50">
              <div className="w-full text-left">
                <label className="block text-xs font-bold px-1 text-foreground/70 uppercase tracking-wide">Type</label>
                <select className="w-full bg-transparent outline-none text-sm p-1 text-foreground">
                  <option value="all">Any property</option>
                  <option value="plot">Plot</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto px-2 py-1">
              <Link href="/properties">
                <Button size="lg" className="w-full md:w-auto rounded-md px-8 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  <Search className="w-4 h-4" /> Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Homes</h2>
            <p className="text-muted-foreground text-lg">Functional designs that inspire living.</p>
          </div>
          <Link href="/properties">
            <Button variant="outline" size="lg">View all →</Button>
          </Link>
        </div>
        <FeaturedCarousel />
      </section>

      {/* Value Proposition */}
      <section className="bg-secondary py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ERNReal?</h2>
            <p className="text-muted-foreground text-lg">Thoughtfully curated properties with transparent pricing and exceptional service.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border/50 hover:border-accent/50 transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Clean Architecture</h3>
              <p className="text-muted-foreground text-center">Properties selected for their minimal footprint and maximum utility.</p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border/50 hover:border-accent/50 transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Transparent Pricing</h3>
              <p className="text-muted-foreground text-center">No hidden fees. Just upfront costs modeled on Swedish efficiency.</p>
            </div>
            
            <div className="bg-card rounded-lg p-8 border border-border/50 hover:border-accent/50 transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Easy Booking</h3>
              <p className="text-muted-foreground text-center">Schedule site visits seamlessly directly from the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your perfect home?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">Join thousands of satisfied customers discovering their ideal property.</p>
          <Link href="/properties">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8">
              Browse Properties Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
