'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition">
            INFLUX.AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-700 hover:text-influx-blue transition font-medium">
              How it Works
            </Link>
            <Link href="#for-influencers" className="text-gray-700 hover:text-influx-blue transition font-medium">
              For Influencers
            </Link>
            <Link href="#for-brands" className="text-gray-700 hover:text-influx-blue transition font-medium">
              For Brands
            </Link>
            <Link href="/browse" className="text-gray-700 hover:text-influx-blue transition font-medium">
              Browse Talent
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-influx-blue transition font-semibold">
              Sign In
            </Link>
            <Button href="/influencers/signup" variant="gradient" size="md">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-influx-blue transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="#for-influencers"
                className="text-gray-700 hover:text-influx-blue transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                For Influencers
              </Link>
              <Link
                href="#for-brands"
                className="text-gray-700 hover:text-influx-blue transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                For Brands
              </Link>
              <Link
                href="/browse"
                className="text-gray-700 hover:text-influx-blue transition font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Browse Talent
              </Link>
              <div className="pt-4 flex flex-col gap-3">
                <Button href="/auth/login" variant="outline" size="md" className="w-full">
                  Sign In
                </Button>
                <Button href="/influencers/signup" variant="gradient" size="md" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
