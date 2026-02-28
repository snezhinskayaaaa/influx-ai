'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, TrendingUp, Instagram, Youtube, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Influencer {
  id: string;
  handle: string;
  bio?: string;
  niche?: string[];
  instagram_followers: number;
  tiktok_followers?: number;
  instagram_engagement?: number;
  price_per_post?: number;
  portfolio_images?: string[];
  is_verified: boolean;
  is_featured: boolean;
}

export default function BrowsePage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedFollowers, setSelectedFollowers] = useState('all');
  const [sortBy, setSortBy] = useState('followers');

  useEffect(() => {
    // Fetch influencers (placeholder for now)
    setLoading(false);
    // TODO: Replace with actual Supabase fetch
    setInfluencers([]);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-influx-blue/10 via-white to-deep-purple/10 border-b border-gray-100">
        <div className="container-custom py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-influx-blue/10 text-influx-blue text-sm font-semibold mb-6">
              <Sparkles size={16} />
              30+ Verified AI Influencers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Discover <span className="gradient-text">AI Talent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse verified virtual influencers, compare metrics, and book campaigns in minutes
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, niche, or platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-influx-blue focus:outline-none text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-24 space-y-6">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Filter size={20} className="text-influx-blue" />
                Filters
              </div>

              {/* Niche Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Niche
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-influx-blue focus:outline-none"
                >
                  <option value="all">All Niches</option>
                  <option value="fashion">Fashion & Luxury</option>
                  <option value="gaming">Gaming</option>
                  <option value="tech">Tech & AI</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="beauty">Beauty & Care</option>
                  <option value="music">Music</option>
                </select>
              </div>

              {/* Followers Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Followers
                </label>
                <select
                  value={selectedFollowers}
                  onChange={(e) => setSelectedFollowers(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-influx-blue focus:outline-none"
                >
                  <option value="all">Any Size</option>
                  <option value="micro">10K - 50K (Micro)</option>
                  <option value="mid">50K - 100K (Mid-tier)</option>
                  <option value="macro">100K - 500K (Macro)</option>
                  <option value="mega">500K+ (Mega)</option>
                </select>
              </div>

              {/* Platform Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Platform
                </label>
                <div className="space-y-2">
                  {['Instagram', 'TikTok', 'YouTube'].map((platform) => (
                    <label key={platform} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-influx-blue border-gray-300 rounded focus:ring-influx-blue"
                      />
                      <span className="text-sm text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Budget Per Post
                </label>
                <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-influx-blue focus:outline-none">
                  <option value="all">Any Budget</option>
                  <option value="low">Under $500</option>
                  <option value="mid">$500 - $2,000</option>
                  <option value="high">$2,000 - $5,000</option>
                  <option value="premium">$5,000+</option>
                </select>
              </div>

              <Button variant="primary" className="w-full">
                Apply Filters
              </Button>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {influencers.length === 0 ? 'No' : influencers.length} Influencers
                </h2>
                <p className="text-gray-600">Showing all verified AI talent</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-influx-blue focus:outline-none font-medium"
              >
                <option value="followers">Most Followers</option>
                <option value="engagement">Highest Engagement</option>
                <option value="price-low">Lowest Price</option>
                <option value="price-high">Highest Price</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>

            {/* Empty State */}
            {influencers.length === 0 && !loading && (
              <Card className="text-center py-16 space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-influx-blue/20 to-deep-purple/20 flex items-center justify-center mx-auto">
                  <Users className="text-influx-blue" size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We're onboarding AI influencers right now. Check back soon to discover amazing virtual talent.
                  </p>
                </div>
                <Button href="/influencers/signup" variant="gradient" size="lg">
                  Join as Influencer
                </Button>
              </Card>
            )}

            {/* Influencer Grid */}
            {influencers.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {influencers.map((influencer) => (
                  <Link
                    key={influencer.id}
                    href={`/influencers/${influencer.handle}`}
                    className="group"
                  >
                    <Card hover className="h-full overflow-hidden p-0">
                      {/* Image */}
                      <div className="aspect-square bg-gradient-to-br from-influx-blue to-deep-purple relative overflow-hidden">
                        {influencer.portfolio_images?.[0] && (
                          <img
                            src={influencer.portfolio_images[0]}
                            alt={influencer.handle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}

                        {/* Badges */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          {influencer.is_verified && (
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                              <CheckCircle2 className="text-success-green" size={20} />
                            </div>
                          )}
                          {influencer.is_featured && (
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-warning-orange to-influx-blue text-white text-xs font-bold shadow-lg">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Engagement Badge */}
                        {influencer.instagram_engagement && (
                          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-2 shadow-lg">
                            <TrendingUp className="text-success-green" size={14} />
                            <span className="text-sm font-bold">{influencer.instagram_engagement}%</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Name */}
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-influx-blue transition">
                            @{influencer.handle}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {influencer.bio || 'AI Influencer'}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">
                          {influencer.instagram_followers > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Instagram size={16} className="text-gray-400" />
                              <span className="font-semibold">{formatNumber(influencer.instagram_followers)}</span>
                            </div>
                          )}
                          {influencer.tiktok_followers && influencer.tiktok_followers > 0 && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                              </svg>
                              <span className="font-semibold">{formatNumber(influencer.tiktok_followers)}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {influencer.niche?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-influx-blue/10 text-influx-blue text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price */}
                        {influencer.price_per_post && (
                          <div className="pt-4 border-t border-gray-100">
                            <div className="text-2xl font-bold gradient-text">
                              ${(influencer.price_per_post / 100).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">per post</div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
