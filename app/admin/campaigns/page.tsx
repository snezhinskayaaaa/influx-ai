'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Campaign, CampaignStatus } from '@/types/database';

type CampaignWithRelations = Campaign & {
  brands: { company_name: string } | null;
  influencers: { handle: string } | null;
};

const STATUS_COLORS: Record<CampaignStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

const ALL_STATUSES: CampaignStatus[] = ['draft', 'pending', 'active', 'completed', 'cancelled'];

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${STATUS_COLORS[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function formatMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString()}`;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function CampaignManagementPage() {
  const [campaigns, setCampaigns] = useState<CampaignWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchCampaigns() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('campaigns')
      .select('*, brands(company_name), influencers(handle)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCampaigns(data as CampaignWithRelations[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function updateStatus(id: string, status: CampaignStatus) {
    setActionLoading(id);
    const supabase = createClient();
    const { error } = await supabase
      .from('campaigns')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
    setActionLoading(null);
  }

  const totalRevenue = campaigns.reduce((sum, c) => sum + (c.platform_fee || 0), 0);
  const totalCampaigns = campaigns.length;

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Campaign Management</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Campaigns</div>
            <div className="text-3xl font-bold text-gray-900">{totalCampaigns}</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-success-green">
              {formatMoney(totalRevenue)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Platform fees (20%)</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-influx-blue">
              {campaigns.filter((c) => c.status === 'active').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Running now</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-warning-orange">
              {campaigns.filter((c) => c.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Awaiting action</div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="flex flex-wrap gap-3 mb-6">
          {ALL_STATUSES.map((status) => {
            const count = campaigns.filter((c) => c.status === status).length;
            return (
              <div
                key={status}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100"
              >
                <StatusBadge status={status} />
                <span className="text-sm text-gray-600 font-medium">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Brand</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Influencer</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Budget</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Platform Fee</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Dates</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                      No campaigns found.
                    </td>
                  </tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 max-w-[180px]">
                        <div className="truncate">{campaign.title}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {campaign.brands?.company_name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {campaign.influencers?.handle
                          ? `@${campaign.influencers.handle}`
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {formatMoney(campaign.budget)}
                      </td>
                      <td className="px-4 py-3 text-success-green font-medium">
                        {formatMoney(campaign.platform_fee)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {campaign.start_date ? (
                          <div>
                            <div>{new Date(campaign.start_date).toLocaleDateString()}</div>
                            {campaign.end_date && (
                              <div className="text-gray-400">
                                → {new Date(campaign.end_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={campaign.status}
                          disabled={actionLoading === campaign.id}
                          onChange={(e) =>
                            updateStatus(campaign.id, e.target.value as CampaignStatus)
                          }
                          className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 cursor-pointer hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
