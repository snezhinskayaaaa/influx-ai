'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Influencer, InfluencerStatus } from '@/types/database';

type InfluencerWithProfile = Influencer & {
  profiles: { email: string; full_name: string | null } | null;
};

type StatusFilter = 'all' | InfluencerStatus;

const STATUS_TABS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

function StatusBadge({ status }: { status: InfluencerStatus }) {
  const classes: Record<InfluencerStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded font-medium ${classes[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
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

export default function InfluencerManagementPage() {
  const [influencers, setInfluencers] = useState<InfluencerWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchInfluencers() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('influencers')
      .select('*, profiles(email, full_name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInfluencers(data as InfluencerWithProfile[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchInfluencers();
  }, []);

  async function updateStatus(id: string, status: InfluencerStatus) {
    setActionLoading(id + status);
    const supabase = createClient();
    const { error } = await supabase
      .from('influencers')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setInfluencers((prev) =>
        prev.map((inf) => (inf.id === id ? { ...inf, status } : inf))
      );
    }
    setActionLoading(null);
  }

  const filtered =
    activeFilter === 'all'
      ? influencers
      : influencers.filter((i) => i.status === activeFilter);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Influencer Management</h1>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {STATUS_TABS.map((tab) => {
            const count =
              tab.value === 'all'
                ? influencers.length
                : influencers.filter((i) => i.status === tab.value).length;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-influx-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
                {!loading && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                      isActive ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Handle</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Instagram</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">TikTok</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Registered</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      No influencers found
                      {activeFilter !== 'all' ? ` with status "${activeFilter}"` : ''}.
                    </td>
                  </tr>
                ) : (
                  filtered.map((influencer) => (
                    <tr
                      key={influencer.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        @{influencer.handle}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {influencer.profiles?.email ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {influencer.instagram_followers > 0
                          ? `${(influencer.instagram_followers / 1000).toFixed(1)}K`
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {influencer.tiktok_followers > 0
                          ? `${(influencer.tiktok_followers / 1000).toFixed(1)}K`
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={influencer.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(influencer.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {influencer.status !== 'approved' && (
                            <button
                              onClick={() => updateStatus(influencer.id, 'approved')}
                              disabled={actionLoading === influencer.id + 'approved'}
                              className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded hover:bg-green-200 disabled:opacity-50 transition-colors"
                            >
                              {actionLoading === influencer.id + 'approved'
                                ? 'Saving…'
                                : 'Approve'}
                            </button>
                          )}
                          {influencer.status !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(influencer.id, 'rejected')}
                              disabled={actionLoading === influencer.id + 'rejected'}
                              className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
                            >
                              {actionLoading === influencer.id + 'rejected'
                                ? 'Saving…'
                                : 'Reject'}
                            </button>
                          )}
                        </div>
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
