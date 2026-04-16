'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { Moon, Sun, Menu, Search, User as UserIcon, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent text-accent-foreground font-bold text-sm group-hover:shadow-md transition-all">
            ER
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">ERNReal</span>
        </Link>

        {/* Search Bar (desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border-2 border-primary-foreground/20 bg-primary-foreground text-primary placeholder:text-muted-foreground px-3 py-2 pl-10 text-sm shadow-sm focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/50 transition-all duration-200 group-focus-within:border-accent"
              placeholder="Search location, property type..."
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 ml-auto">
          <div className="hidden sm:flex gap-1">
            <Link href="/properties">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                Browse
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              Saved
            </Button>
          </div>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>

          {/* Cart Icon */}
          <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full hidden xs:flex">
            <ShoppingCart className="h-4 w-4" />
          </Button>

          {/* Sign In Button */}
          <Button className="hidden sm:flex rounded-md gap-2 px-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
            <UserIcon className="h-4 w-4" />
            <span className="text-sm font-semibold">Sign In</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground text-primary placeholder:text-muted-foreground px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            placeholder="Search..."
          />
        </div>
      </div>
    </header>
  );
}
