import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Get all influencers
  const { data: influencers } = await supabase
    .from('influencers')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false });

  // Get all brands
  const { data: brands } = await supabase
    .from('brands')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false });

  // Get all campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  const pendingInfluencers = influencers?.filter((i) => i.status === 'pending').length || 0;
  const approvedInfluencers = influencers?.filter((i) => i.status === 'approved').length || 0;
  const totalRevenue = campaigns?.reduce((sum, c) => sum + (c.platform_fee || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-neutral-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="text-2xl font-bold">
              INFLUX.AI ADMIN
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="hover:text-electric-cyan">
                Dashboard
              </Link>
              <Link href="/admin/influencers" className="hover:text-electric-cyan">
                Influencers
              </Link>
              <Link href="/admin/brands" className="hover:text-electric-cyan">
                Brands
              </Link>
              <Link href="/admin/campaigns" className="hover:text-electric-cyan">
                Campaigns
              </Link>
              <form action="/auth/logout" method="post">
                <button className="hover:text-electric-cyan">Logout</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Revenue
            </div>
            <div className="text-3xl font-bold text-success-green">
              ${(totalRevenue / 100).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Platform fees (20%)</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Influencers
            </div>
            <div className="text-3xl font-bold text-influx-blue">
              {influencers?.length || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {approvedInfluencers} approved
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Brands
            </div>
            <div className="text-3xl font-bold text-deep-purple">
              {brands?.length || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Campaigns
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {campaigns?.length || 0}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingInfluencers > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              Pending Influencer Approvals ({pendingInfluencers})
            </h2>
            <Link
              href="/admin/influencers?status=pending"
              className="bg-warning-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Review Pending Influencers
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Influencers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Influencers</h2>
              <Link
                href="/admin/influencers"
                className="text-sm text-influx-blue hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="p-6">
              {!influencers || influencers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No influencers yet</p>
              ) : (
                <div className="space-y-4">
                  {influencers.slice(0, 5).map((influencer: any) => (
                    <div
                      key={influencer.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">@{influencer.handle}</h3>
                          <p className="text-sm text-gray-600">
                            {influencer.profiles?.email}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            influencer.status === 'approved'
                              ? 'bg-success-green text-white'
                              : influencer.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {influencer.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {influencer.instagram_followers > 0 && (
                          <span>
                            {(influencer.instagram_followers / 1000).toFixed(0)}K IG
                          </span>
                        )}
                        {influencer.tiktok_followers > 0 && (
                          <span className="ml-2">
                            {(influencer.tiktok_followers / 1000).toFixed(0)}K TT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Brands */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Brands</h2>
              <Link
                href="/admin/brands"
                className="text-sm text-deep-purple hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="p-6">
              {!brands || brands.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No brands yet</p>
              ) : (
                <div className="space-y-4">
                  {brands.slice(0, 5).map((brand: any) => (
                    <div
                      key={brand.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium mb-1">{brand.company_name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {brand.profiles?.email}
                      </p>
                      {brand.industry && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {brand.industry}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Campaigns</h2>
            <Link
              href="/admin/campaigns"
              className="text-sm text-influx-blue hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="p-6">
            {!campaigns || campaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No campaigns yet</p>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign: any) => (
                  <div
                    key={campaign.id}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium mb-1">{campaign.title}</h3>
                      <div className="text-sm text-gray-600">
                        Budget: ${(campaign.budget / 100).toLocaleString()} • Fee:{' '}
                        ${(campaign.platform_fee / 100).toLocaleString()}
                      </div>
                    </div>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
