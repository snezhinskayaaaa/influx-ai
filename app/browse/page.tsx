import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Influencer } from '@/types/database';

export default async function BrowsePage() {
  const supabase = await createClient();

  // Fetch approved influencers
  const { data: influencers } = await supabase
    .from('influencers')
    .select('*')
    .eq('status', 'approved')
    .order('is_featured', { ascending: false })
    .order('instagram_followers', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-influx-blue">
              INFLUX.AI
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-influx-blue">
                Sign In
              </Link>
              <Link
                href="/brands/signup"
                className="bg-influx-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Campaign
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse AI Influencers
          </h1>
          <p className="text-xl text-gray-600">
            Discover verified virtual talent for your next campaign
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niche
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-influx-blue focus:border-influx-blue">
                <option>All Niches</option>
                <option>Fashion</option>
                <option>Gaming</option>
                <option>Tech</option>
                <option>Lifestyle</option>
                <option>Beauty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Followers
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-influx-blue focus:border-influx-blue">
                <option>Any Size</option>
                <option>10K - 50K</option>
                <option>50K - 100K</option>
                <option>100K - 500K</option>
                <option>500K+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-influx-blue focus:border-influx-blue">
                <option>All Platforms</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-influx-blue focus:border-influx-blue">
                <option>Any Budget</option>
                <option>Under $500</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $5,000</option>
                <option>$5,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {influencers?.length || 0} influencers
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-influx-blue focus:border-influx-blue">
            <option>Most Followers</option>
            <option>Highest Engagement</option>
            <option>Lowest Price</option>
            <option>Most Recent</option>
          </select>
        </div>

        {/* Influencer Grid */}
        {!influencers || influencers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-500">
              No influencers found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {influencers.map((influencer: Influencer) => (
              <Link
                key={influencer.id}
                href={`/influencers/${influencer.handle}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-influx-blue to-deep-purple relative">
                  {influencer.is_verified && (
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                      <span className="text-success-green">✓</span>
                    </div>
                  )}
                  {influencer.portfolio_images && influencer.portfolio_images[0] && (
                    <img
                      src={influencer.portfolio_images[0]}
                      alt={influencer.handle}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">@{influencer.handle}</h3>
                    {influencer.is_featured && (
                      <span className="bg-warning-orange text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {influencer.bio || 'AI Influencer'}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    {influencer.instagram_followers > 0 && (
                      <div>
                        <span className="font-semibold">
                          {(influencer.instagram_followers / 1000).toFixed(0)}K
                        </span>{' '}
                        IG
                      </div>
                    )}
                    {influencer.tiktok_followers > 0 && (
                      <div>
                        <span className="font-semibold">
                          {(influencer.tiktok_followers / 1000).toFixed(0)}K
                        </span>{' '}
                        TT
                      </div>
                    )}
                    {influencer.instagram_engagement > 0 && (
                      <div>
                        <span className="font-semibold">
                          {influencer.instagram_engagement}%
                        </span>{' '}
                        Eng
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {influencer.niche?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {influencer.price_per_post && (
                    <div className="text-lg font-bold text-influx-blue">
                      ${(influencer.price_per_post / 100).toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">
                        {' '}
                        / post
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
