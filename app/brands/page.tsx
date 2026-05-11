"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import { Sparkles, ArrowRight } from "lucide-react";

const influencerProfiles = [
  {
    id: 1,
    name: "Luna AI",
    niche: "Fashion & Lifestyle",
    followers: "250K",
    image: "/influencer-1.png",
  },
  {
    id: 2,
    name: "Ava Digital",
    niche: "Beauty & Wellness",
    followers: "180K",
    image: "/influencer-2.png",
  },
  {
    id: 3,
    name: "Nova Tech",
    niche: "Tech & Gaming",
    followers: "320K",
    image: "/influencer-3.png",
  },
  {
    id: 4,
    name: "Stella Fit",
    niche: "Fitness & Health",
    followers: "195K",
    image: "/influencer-4.png",
  },
  {
    id: 5,
    name: "Maya Vibe",
    niche: "Music & Arts",
    followers: "275K",
    image: "/influencer-5.png",
  },
  {
    id: 6,
    name: "Iris Creative",
    niche: "Design & Creative",
    followers: "210K",
    image: "/influencer-6.png",
  },
];

function getCardStyle(index: number, activeIndex: number) {
  const total = influencerProfiles.length;
  let position = (index - activeIndex + total) % total;

  if (position > total / 2) {
    position = position - total;
  }

  if (position === 0) {
    return {
      zIndex: 50,
      transform: "translateX(0%) scale(1)",
      opacity: 1,
    };
  } else if (position === 1) {
    return {
      zIndex: 40,
      transform: "translateX(70%) scale(0.85)",
      opacity: 0.6,
    };
  } else if (position === -1) {
    return {
      zIndex: 40,
      transform: "translateX(-70%) scale(0.85)",
      opacity: 0.6,
    };
  } else {
    return {
      zIndex: 10,
      transform: `translateX(${position > 0 ? "150%" : "-150%"}) scale(0.7)`,
      opacity: 0,
    };
  }
}

export default function BrandsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % influencerProfiles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-600">
                  For Brands & Advertisers
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
                AI Influencer Hub for Brands
              </h1>

              <p className="mt-6 text-lg text-gray-500 sm:text-xl leading-relaxed">
                Discover. Connect. Collaborate.
              </p>

              <p className="text-lg text-gray-500 sm:text-xl leading-relaxed">
                Grow your brand with AI Influencers
              </p>

              <div className="mt-10">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center w-full sm:w-64 h-14 text-base font-medium rounded-lg bg-blue-50 border-2 border-blue-200 text-blue-600 hover:bg-blue-100 transition-all"
                >
                  Explore Marketplace
                </Link>
              </div>
            </div>

            {/* Right - Carousel */}
            <div className="relative h-[400px] lg:h-[650px] flex items-center justify-center overflow-hidden py-8">
              <div className="relative w-full h-full flex items-center justify-center">
                {influencerProfiles.map((profile, index) => {
                  const style = mounted
                    ? getCardStyle(index, activeIndex)
                    : getCardStyle(index, 0);

                  return (
                    <div
                      key={profile.id}
                      className="absolute w-48 lg:w-72 p-3 lg:p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-xl"
                      style={{
                        ...style,
                        transition:
                          "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
                        pointerEvents: style.opacity === 1 ? "auto" : "none",
                      }}
                    >
                      <div className="w-full h-56 lg:h-96 rounded-xl overflow-hidden mb-3 lg:mb-4 bg-gray-100">
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 lg:space-y-2">
                        <h3 className="text-base lg:text-xl font-bold text-gray-900">
                          {profile.name}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-500">
                          {profile.niche}
                        </p>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full">
                          {profile.followers} followers
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
