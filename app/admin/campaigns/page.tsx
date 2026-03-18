'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

type CampaignWithRelations = {
  id: string;
  title: string;
  description: string | null;
  budgetMin: number;
  budgetMax: number;
  status: CampaignStatus;
  createdAt: string;
  brand?: { companyName: string } | null;
  _count?: { collaborations: number };
};

const STATUS_COLORS: Record<CampaignStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  ACTIVE: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const ALL_STATUSES: CampaignStatus[] = ['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED'];

function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${STATUS_COLORS[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function formatMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString()}`;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: 7 }).map((_, i) => (
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

  async function fetchCampaigns() {
    try {
      const res = await fetch('/api/admin/campaigns');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch {
      // silently fail
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Campaigns</div>
            <div className="text-3xl font-bold text-gray-900">{totalCampaigns}</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-influx-blue">
              {campaigns.filter((c) => c.status === 'ACTIVE').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Running now</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-success-green">
              {campaigns.filter((c) => c.status === 'COMPLETED').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Finished</div>
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
                  <th className="px-4 py-3 font-semibold text-gray-600">Budget Range</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Collaborations</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
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
                        {campaign.brand?.companyName ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {formatMoney(campaign.budgetMin)} - {formatMoney(campaign.budgetMax)}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {campaign._count?.collaborations ?? 0}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        {new Date(campaign.createdAt).toLocaleDateString()}
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
