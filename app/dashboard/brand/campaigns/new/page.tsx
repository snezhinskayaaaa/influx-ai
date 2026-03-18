'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCampaignPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'error'; message: string } | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [desiredInfluencerCount, setDesiredInfluencerCount] = useState('1');
  const [deliverables, setDeliverables] = useState('');

  const budgetMinCents = budgetMin ? Math.round(parseFloat(budgetMin) * 100) : 0;
  const budgetMaxCents = budgetMax ? Math.round(parseFloat(budgetMax) * 100) : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setToast({ type: 'error', message: 'Title is required.' });
      return;
    }
    if (!budgetMin || parseFloat(budgetMin) <= 0) {
      setToast({ type: 'error', message: 'Please enter a valid minimum budget.' });
      return;
    }
    if (!budgetMax || parseFloat(budgetMax) <= 0) {
      setToast({ type: 'error', message: 'Please enter a valid maximum budget.' });
      return;
    }
    if (budgetMinCents > budgetMaxCents) {
      setToast({ type: 'error', message: 'Minimum budget cannot exceed maximum budget.' });
      return;
    }

    setSaving(true);
    setToast(null);

    const deliverablesList = deliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          budgetMin: budgetMinCents,
          budgetMax: budgetMaxCents,
          desiredInfluencerCount: parseInt(desiredInfluencerCount) || 1,
          deliverables: deliverablesList,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create campaign. Please try again.');
      }

      router.push('/dashboard/brand/campaigns');
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Failed to create campaign. Please try again.' });
    } finally {
      setSaving(false);
    }
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
                  Desired Influencer Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={desiredInfluencerCount}
                  onChange={(e) => setDesiredInfluencerCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="1"
                />
                <p className="text-xs text-gray-400 mt-1">How many influencers you want for this campaign</p>
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

          {/* Budget */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Budget Range</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Min ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Max ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Budget Summary */}
              {budgetMin && budgetMax && parseFloat(budgetMin) > 0 && parseFloat(budgetMax) > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget range</span>
                    <span className="font-bold text-deep-purple">
                      ${parseFloat(budgetMin).toFixed(2)} - ${parseFloat(budgetMax).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
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
