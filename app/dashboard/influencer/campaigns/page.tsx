import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

function statusBadge(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-200 text-gray-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'draft':
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function InfluencerCampaignsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: influencer } = await supabase
    .from('influencers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!influencer) {
    redirect('/influencers/signup');
  }

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*, brands(company_name, industry)')
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
              <Link href="/dashboard/influencer" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/dashboard/influencer/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/dashboard/influencer/campaigns" className="text-gray-900 font-medium">
                Campaigns
              </Link>
              <Link href="/dashboard/influencer/settings" className="text-gray-600 hover:text-gray-900">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Campaigns</h1>
          <p className="text-gray-600">Track all your brand collaborations and earnings</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-influx-blue">
              ${(totalEarnings / 100).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Active Campaigns</div>
            <div className="text-3xl font-bold text-success-green">{activeCampaigns}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-gray-900">{completedCampaigns}</div>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">All Campaigns</h2>
          </div>

          {!campaigns || campaigns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No campaigns yet. Brands will contact you after your profile is approved.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Campaign</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Brand</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Budget</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Your Payout</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Status</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Dates</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign: any) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{campaign.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {campaign.brands?.company_name || '—'}
                        </div>
                        {campaign.brands?.industry && (
                          <div className="text-xs text-gray-500">{campaign.brands.industry}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          ${((campaign.budget || 0) / 100).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-influx-blue">
                          ${((campaign.influencer_payout || 0) / 100).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${statusBadge(campaign.status)}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-600">
                          {formatDate(campaign.start_date)} — {formatDate(campaign.end_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {campaign.deliverables && campaign.deliverables.length > 0 ? (
                          <ul className="text-xs text-gray-600 space-y-1">
                            {(campaign.deliverables as string[]).map((d, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-influx-blue mt-0.5">•</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
