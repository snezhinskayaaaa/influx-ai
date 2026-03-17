'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Influencer {
  id: string;
  handle: string;
  instagram_followers: number | null;
  tiktok_followers: number | null;
  price_per_post: number | null;
  niche: string[] | null;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [brandId, setBrandId] = useState('');
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [toast, setToast] = useState<{ type: 'error'; message: string } | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliverables, setDeliverables] = useState('');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { data: brand } = await supabase
        .from('brands')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!brand) {
        router.push('/brands/signup');
        return;
      }
      setBrandId(brand.id);

      const { data: influencerData } = await supabase
        .from('influencers')
        .select('id, handle, instagram_followers, tiktok_followers, price_per_post, niche')
        .eq('status', 'approved');

      setInfluencers(influencerData || []);
      setLoading(false);
    }
    load();
  }, [router]);

  const budgetCents = budget ? Math.round(parseFloat(budget) * 100) : 0;
  const platformFee = Math.round(budgetCents * 0.2);
  const influencerPayout = budgetCents - platformFee;

  function formatFollowers(n: number | null) {
    if (!n) return null;
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return String(n);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setToast({ type: 'error', message: 'Title is required.' });
      return;
    }
    if (!selectedInfluencer) {
      setToast({ type: 'error', message: 'Please select an influencer.' });
      return;
    }
    if (!budget || parseFloat(budget) <= 0) {
      setToast({ type: 'error', message: 'Please enter a valid budget.' });
      return;
    }

    setSaving(true);
    setToast(null);

    const deliverablesList = deliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const supabase = createClient();
    const { error } = await supabase.from('campaigns').insert({
      brand_id: brandId,
      influencer_id: selectedInfluencer,
      title: title.trim(),
      description: description.trim(),
      deliverables: deliverablesList,
      budget: budgetCents,
      platform_fee: platformFee,
      influencer_payout: influencerPayout,
      start_date: startDate || null,
      end_date: endDate || null,
      status: 'draft',
    });

    setSaving(false);
    if (error) {
      setToast({ type: 'error', message: error.message || 'Failed to create campaign. Please try again.' });
    } else {
      router.push('/dashboard/brand/campaigns');
    }
  }

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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/brand/campaigns"
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
          >
            ← Back to Campaigns
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Campaign</h1>
          <p className="text-gray-600">Set up a new influencer marketing campaign</p>
        </div>

        {toast && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campaign Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Campaign Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="e.g. Summer Fashion Collection Launch"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Describe your campaign goals and expectations..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Influencer <span className="text-red-500">*</span>
                </label>
                {influencers.length === 0 ? (
                  <div className="border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-500 text-sm">
                    No approved influencers available yet.
                  </div>
                ) : (
                  <select
                    required
                    value={selectedInfluencer}
                    onChange={(e) => setSelectedInfluencer(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  >
                    <option value="">Choose an influencer...</option>
                    {influencers.map((inf) => {
                      const followers =
                        formatFollowers(inf.instagram_followers) ||
                        formatFollowers(inf.tiktok_followers) ||
                        null;
                      const price = inf.price_per_post
                        ? `$${(inf.price_per_post / 100).toLocaleString()}/post`
                        : null;
                      const parts = ['@' + inf.handle];
                      if (followers) parts.push(followers + ' followers');
                      if (price) parts.push(price);
                      return (
                        <option key={inf.id} value={inf.id}>
                          {parts.join(' · ')}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deliverables <span className="text-gray-400 text-xs">(one per line)</span>
                </label>
                <textarea
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder={`3 Instagram posts\n2 Instagram stories\n1 TikTok video`}
                />
              </div>
            </div>
          </div>

          {/* Budget & Dates */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Budget & Timeline</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Budget ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="0.00"
                />
              </div>

              {/* Fee Breakdown */}
              {budget && parseFloat(budget) > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Fee Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Budget</span>
                      <span className="font-medium text-gray-900">${parseFloat(budget).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Platform Fee (20%)</span>
                      <span className="font-medium text-warning-orange">
                        ${(platformFee / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Influencer Payout (80%)</span>
                      <span className="font-bold text-deep-purple">
                        ${(influencerPayout / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link
              href="/dashboard/brand/campaigns"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-deep-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
