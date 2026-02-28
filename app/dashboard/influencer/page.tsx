import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function InfluencerDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get influencer profile
  const { data: influencer } = await supabase
    .from('influencers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!influencer) {
    redirect('/influencers/signup');
  }

  // Get campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*, brands(*)')
    .eq('influencer_id', influencer.id)
    .order('created_at', { ascending: false });

  const totalEarnings = campaigns?.reduce((sum, c) => sum + (c.influencer_payout || 0), 0) || 0;
  const activeCampaigns = campaigns?.filter((c) => c.status === 'active').length || 0;
  const completedCampaigns = campaigns?.filter((c) => c.status === 'completed').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard/influencer" className="text-2xl font-bold text-influx-blue">
              INFLUX.AI
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard/influencer"
                className="text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <Link href="/dashboard/influencer/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/dashboard/influencer/campaigns" className="text-gray-600 hover:text-gray-900">
                Campaigns
              </Link>
              <Link href="/dashboard/influencer/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
              <form action="/auth/logout" method="post">
                <button className="text-gray-600 hover:text-gray-900">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, @{influencer.handle}!
          </h1>
          <p className="text-gray-600">
            Manage your profile, campaigns, and earnings
          </p>
        </div>

        {/* Status Alert */}
        {influencer.status === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Profile Under Review
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your influencer profile is currently being reviewed by our team.
                    You'll be notified once it's approved and you can start receiving campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Earnings
            </div>
            <div className="text-3xl font-bold text-influx-blue">
              ${(totalEarnings / 100).toLocaleString()}
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
              Profile Status
            </div>
            <div className="text-xl font-bold">
              {influencer.status === 'approved' && (
                <span className="text-success-green">✓ Approved</span>
              )}
              {influencer.status === 'pending' && (
                <span className="text-warning-orange">⏳ Pending</span>
              )}
              {influencer.status === 'rejected' && (
                <span className="text-red-600">✗ Rejected</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Overview */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Profile Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Handle</div>
                  <div className="font-medium">@{influencer.handle}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Bio</div>
                  <div className="text-sm">{influencer.bio || 'No bio yet'}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {influencer.instagram_followers > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Instagram</div>
                      <div className="font-medium">
                        {(influencer.instagram_followers / 1000).toFixed(0)}K followers
                      </div>
                      <div className="text-sm text-gray-600">
                        {influencer.instagram_engagement}% engagement
                      </div>
                    </div>
                  )}

                  {influencer.tiktok_followers > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">TikTok</div>
                      <div className="font-medium">
                        {(influencer.tiktok_followers / 1000).toFixed(0)}K followers
                      </div>
                      <div className="text-sm text-gray-600">
                        {influencer.tiktok_engagement}% engagement
                      </div>
                    </div>
                  )}
                </div>

                {influencer.price_per_post && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rate per Post</div>
                    <div className="text-lg font-bold text-influx-blue">
                      ${(influencer.price_per_post / 100).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/dashboard/influencer/profile"
                className="mt-6 block w-full text-center bg-influx-blue text-white py-2 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Recent Campaigns</h2>
            </div>
            <div className="p-6">
              {!campaigns || campaigns.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No campaigns yet</p>
                  <p className="text-sm">
                    Brands will reach out to you once your profile is approved
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.slice(0, 5).map((campaign: any) => (
                    <Link
                      key={campaign.id}
                      href={`/dashboard/influencer/campaigns/${campaign.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-influx-blue transition"
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
                        {campaign.brands?.company_name || 'Brand'}
                      </div>
                      <div className="text-sm font-medium text-influx-blue">
                        ${(campaign.influencer_payout / 100).toLocaleString()} payout
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {campaigns && campaigns.length > 0 && (
                <Link
                  href="/dashboard/influencer/campaigns"
                  className="mt-4 block text-center text-influx-blue font-medium hover:underline"
                >
                  View all campaigns →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
