'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function statusBadge(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'COMPLETED':
      return 'bg-gray-200 text-gray-700';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    case 'DRAFT':
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BrandCampaignsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/campaigns');
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/auth/login');
            return;
          }
          throw new Error('Failed to fetch campaigns');
        }
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      } catch {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  const totalSpent = campaigns.reduce((sum, c) => {
    const completedCollabSpend = (c.collaborations || [])
      .filter((col: any) => col.status === 'COMPLETED')
      .reduce((s: number, col: any) => s + (col.agreedPrice || 0), 0);
    return sum + completedCollabSpend;
  }, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE').length;
  const completedCampaigns = campaigns.filter((c) => c.status === 'COMPLETED').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

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
              <Link href="/dashboard/brand" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                Browse Influencers
              </Link>
              <Link href="/dashboard/brand/campaigns" className="text-gray-900 font-medium">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
            <p className="text-gray-600">Manage your influencer marketing campaigns</p>
          </div>
          <Link
            href="/dashboard/brand/campaigns/new"
            className="bg-deep-purple text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
          >
            + New Campaign
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Spent</div>
            <div className="text-3xl font-bold text-deep-purple">
              ${(totalSpent / 100).toLocaleString()}
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

          {campaigns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Create your first campaign to start working with AI influencers.
              </p>
              <Link
                href="/dashboard/brand/campaigns/new"
                className="inline-block bg-deep-purple text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
              >
                Create Your First Campaign
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Campaign</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Budget Range</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Collaborations</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Status</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign: any) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{campaign.title}</div>
                        {campaign.description && (
                          <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                            {campaign.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          ${((campaign.budgetMin || 0) / 100).toLocaleString()} - ${((campaign.budgetMax || 0) / 100).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {campaign._count?.collaborations ?? (campaign.collaborations?.length ?? 0)} collaboration{(campaign._count?.collaborations ?? campaign.collaborations?.length ?? 0) !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${statusBadge(campaign.status)}`}
                        >
                          {campaign.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-600">
                          {formatDate(campaign.createdAt)}
                        </div>
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
