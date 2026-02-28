import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function BrandDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get brand profile
  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!brand) {
    redirect('/brands/signup');
  }

  // Get campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*, influencers(*)')
    .eq('brand_id', brand.id)
    .order('created_at', { ascending: false });

  const totalSpent = campaigns?.reduce((sum, c) => sum + (c.budget || 0), 0) || 0;
  const activeCampaigns = campaigns?.filter((c) => c.status === 'active').length || 0;
  const completedCampaigns = campaigns?.filter((c) => c.status === 'completed').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard/brand" className="text-2xl font-bold text-deep-purple">
              INFLUX.AI
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard/brand" className="text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                Browse Influencers
              </Link>
              <Link href="/dashboard/brand/campaigns" className="text-gray-600 hover:text-gray-900">
                Campaigns
              </Link>
              <Link href="/dashboard/brand/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
              <form action="/auth/logout" method="post">
                <button className="text-gray-600 hover:text-gray-900">Logout</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {brand.company_name}!
            </h1>
            <p className="text-gray-600">
              Manage your campaigns and find AI influencers
            </p>
          </div>
          <Link
            href="/browse"
            className="bg-deep-purple text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
          >
            + New Campaign
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Spend
            </div>
            <div className="text-3xl font-bold text-deep-purple">
              ${(totalSpent / 100).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Active Campaigns
            </div>
            <div className="text-3xl font-bold text-success-green">
              {activeCampaigns}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Completed
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {completedCampaigns}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Campaigns
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {campaigns?.length || 0}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Recent Campaigns</h2>
            </div>
            <div className="p-6">
              {!campaigns || campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No campaigns yet</p>
                  <Link
                    href="/browse"
                    className="inline-block bg-deep-purple text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Browse AI Influencers
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.slice(0, 5).map((campaign: any) => (
                    <Link
                      key={campaign.id}
                      href={`/dashboard/brand/campaigns/${campaign.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-deep-purple transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{campaign.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            campaign.status === 'active'
                              ? 'bg-success-green text-white'
                              : campaign.status === 'completed'
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        @{campaign.influencers?.handle || 'Influencer'}
                      </div>
                      <div className="text-sm font-medium text-deep-purple">
                        ${(campaign.budget / 100).toLocaleString()} budget
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {campaigns && campaigns.length > 0 && (
                <Link
                  href="/dashboard/brand/campaigns"
                  className="mt-4 block text-center text-deep-purple font-medium hover:underline"
                >
                  View all campaigns →
                </Link>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <Link
                href="/browse"
                className="block border-2 border-deep-purple rounded-lg p-4 hover:bg-purple-50 transition"
              >
                <h3 className="font-medium text-deep-purple mb-1">
                  Browse AI Influencers
                </h3>
                <p className="text-sm text-gray-600">
                  Find the perfect virtual talent for your campaign
                </p>
              </Link>

              <Link
                href="/dashboard/brand/campaigns"
                className="block border border-gray-200 rounded-lg p-4 hover:border-deep-purple transition"
              >
                <h3 className="font-medium mb-1">Manage Campaigns</h3>
                <p className="text-sm text-gray-600">
                  Track active campaigns and review performance
                </p>
              </Link>

              <Link
                href="/dashboard/brand/settings"
                className="block border border-gray-200 rounded-lg p-4 hover:border-deep-purple transition"
              >
                <h3 className="font-medium mb-1">Company Settings</h3>
                <p className="text-sm text-gray-600">
                  Update your company profile and payment methods
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-deep-purple to-influx-blue rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Getting Started with Influx.AI</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <h4 className="font-semibold mb-2">Browse Influencers</h4>
              <p className="text-sm opacity-90">
                Explore verified AI influencers and filter by niche, followers, and budget
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <h4 className="font-semibold mb-2">Create Campaign</h4>
              <p className="text-sm opacity-90">
                Define your campaign goals, deliverables, and budget
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <h4 className="font-semibold mb-2">Track Results</h4>
              <p className="text-sm opacity-90">
                Monitor campaign performance and ROI in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
