'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun, Menu, Search, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight text-primary">ERNReal</span>
        </Link>

        {/* Search Bar (desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="flex h-10 w-full rounded-full border border-input bg-card px-3 py-2 pl-10 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Search by location, property type..."
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:block">
            <Link href="/properties">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Button variant="ghost">Saved</Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted ? (
              theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="outline" size="icon" className="rounded-full sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>

          <Button className="hidden sm:flex rounded-full gap-2 px-4 shadow-sm">
            <UserIcon className="h-4 w-4" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
