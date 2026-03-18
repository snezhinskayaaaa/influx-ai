'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NICHES = ['Fashion', 'Gaming', 'Tech', 'Lifestyle', 'Beauty', 'Music', 'Sports', 'Food', 'Travel'];

interface InfluencerForm {
  handle: string;
  bio: string;
  niche: string[];
  location: string;
  languages: string;
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement: string;
  tiktok_handle: string;
  tiktok_followers: string;
  tiktok_engagement: string;
  youtube_handle: string;
  youtube_subscribers: string;
  price_per_post: string;
  price_per_story: string;
  price_per_video: string;
  portfolio_url: string;
  past_collaborations: string;
}

export default function InfluencerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [form, setForm] = useState<InfluencerForm>({
    handle: '',
    bio: '',
    niche: [],
    location: '',
    languages: '',
    instagram_handle: '',
    instagram_followers: '',
    instagram_engagement: '',
    tiktok_handle: '',
    tiktok_followers: '',
    tiktok_engagement: '',
    youtube_handle: '',
    youtube_subscribers: '',
    price_per_post: '',
    price_per_story: '',
    price_per_video: '',
    portfolio_url: '',
    past_collaborations: '',
  });

  useEffect(() => {
    async function load() {
      const profileRes = await fetch('/api/profiles/me');
      if (!profileRes.ok) {
        router.push('/auth/login');
        return;
      }

      const influencerRes = await fetch('/api/influencers/me');
      const influencerData = await influencerRes.json();

      if (influencerRes.ok && influencerData.influencer) {
        const influencer = influencerData.influencer;
        setStatus(influencer.status || '');
        setForm({
          handle: influencer.handle || '',
          bio: influencer.bio || '',
          niche: influencer.niche || [],
          location: influencer.location || '',
          languages: (influencer.languages || []).join(', '),
          instagram_handle: influencer.instagramHandle || '',
          instagram_followers: influencer.instagramFollowers ? String(influencer.instagramFollowers) : '',
          instagram_engagement: influencer.instagramEngagement ? String(influencer.instagramEngagement) : '',
          tiktok_handle: influencer.tiktokHandle || '',
          tiktok_followers: influencer.tiktokFollowers ? String(influencer.tiktokFollowers) : '',
          tiktok_engagement: influencer.tiktokEngagement ? String(influencer.tiktokEngagement) : '',
          youtube_handle: influencer.youtubeHandle || '',
          youtube_subscribers: influencer.youtubeSubscribers ? String(influencer.youtubeSubscribers) : '',
          price_per_post: influencer.pricePerPost ? String(influencer.pricePerPost / 100) : '',
          price_per_story: influencer.pricePerStory ? String(influencer.pricePerStory / 100) : '',
          price_per_video: influencer.pricePerVideo ? String(influencer.pricePerVideo / 100) : '',
          portfolio_url: influencer.portfolioUrl || '',
          past_collaborations: (influencer.pastCollaborations || []).join(', '),
        });
      }
      setLoading(false);
    }
    load();
  }, [router]);

  function handleNicheToggle(niche: string) {
    setForm((prev) => ({
      ...prev,
      niche: prev.niche.includes(niche)
        ? prev.niche.filter((n) => n !== niche)
        : [...prev.niche, niche],
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const profileRes = await fetch('/api/profiles/me');
    if (!profileRes.ok) {
      router.push('/auth/login');
      return;
    }

    const languages = form.languages
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    const past_collaborations = form.past_collaborations
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    const updateData: Record<string, unknown> = {
      handle: form.handle,
      bio: form.bio,
      niche: form.niche,
      location: form.location,
      languages,
      instagramHandle: form.instagram_handle,
      instagramFollowers: form.instagram_followers ? parseInt(form.instagram_followers) : null,
      instagramEngagement: form.instagram_engagement ? parseFloat(form.instagram_engagement) : null,
      tiktokHandle: form.tiktok_handle,
      tiktokFollowers: form.tiktok_followers ? parseInt(form.tiktok_followers) : null,
      tiktokEngagement: form.tiktok_engagement ? parseFloat(form.tiktok_engagement) : null,
      youtubeHandle: form.youtube_handle,
      youtubeSubscribers: form.youtube_subscribers ? parseInt(form.youtube_subscribers) : null,
      pricePerPost: form.price_per_post ? Math.round(parseFloat(form.price_per_post) * 100) : null,
      pricePerStory: form.price_per_story ? Math.round(parseFloat(form.price_per_story) * 100) : null,
      pricePerVideo: form.price_per_video ? Math.round(parseFloat(form.price_per_video) * 100) : null,
      portfolioUrl: form.portfolio_url,
      pastCollaborations: past_collaborations,
    };

    const res = await fetch('/api/influencers/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    setSaving(false);
    if (!res.ok) {
      setToast({ type: 'error', message: 'Failed to save profile. Please try again.' });
    } else {
      setToast({ type: 'success', message: 'Profile saved successfully!' });
      setTimeout(() => setToast(null), 4000);
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
            <Link href="/dashboard/influencer" className="text-2xl font-bold text-influx-blue">
              INFLUX.AI
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard/influencer" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/dashboard/influencer/profile" className="text-gray-900 font-medium">
                Profile
              </Link>
              <Link href="/dashboard/influencer/campaigns" className="text-gray-600 hover:text-gray-900">
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Keep your profile up to date to attract more brand campaigns.</p>
        </div>

        {/* Status Banner */}
        {status === 'PENDING' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">⏳</span>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Profile Under Review</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Your profile is currently being reviewed by our team. You'll be notified once approved.
                </p>
              </div>
            </div>
          </div>
        )}
        {status === 'APPROVED' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <h3 className="text-sm font-medium text-green-800">Profile Approved</h3>
                <p className="mt-1 text-sm text-green-700">
                  Your profile is live and visible to brands.
                </p>
              </div>
            </div>
          </div>
        )}
        {status === 'REJECTED' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✗</span>
              <div>
                <h3 className="text-sm font-medium text-red-800">Profile Rejected</h3>
                <p className="mt-1 text-sm text-red-700">
                  Your profile was not approved. Please update your information and contact support.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className={`rounded-lg p-4 mb-6 ${
              toast.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Handle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.handle}
                  onChange={(e) => setForm({ ...form, handle: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="your_handle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="Tell brands about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((niche) => (
                    <button
                      key={niche}
                      type="button"
                      onClick={() => handleNicheToggle(niche)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        form.niche.includes(niche)
                          ? 'bg-influx-blue text-white border-influx-blue'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-influx-blue'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="e.g. New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Languages <span className="text-gray-400 text-xs">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={form.languages}
                  onChange={(e) => setForm({ ...form, languages: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="English, Spanish, French"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Social Media</h2>
            <div className="space-y-6">
              {/* Instagram */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Instagram</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
                    <input
                      type="text"
                      value={form.instagram_handle}
                      onChange={(e) => setForm({ ...form, instagram_handle: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                    <input
                      type="number"
                      min="0"
                      value={form.instagram_followers}
                      onChange={(e) => setForm({ ...form, instagram_followers: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Engagement %</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={form.instagram_engagement}
                      onChange={(e) => setForm({ ...form, instagram_engagement: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>

              {/* TikTok */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">TikTok</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
                    <input
                      type="text"
                      value={form.tiktok_handle}
                      onChange={(e) => setForm({ ...form, tiktok_handle: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
                    <input
                      type="number"
                      min="0"
                      value={form.tiktok_followers}
                      onChange={(e) => setForm({ ...form, tiktok_followers: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Engagement %</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={form.tiktok_engagement}
                      onChange={(e) => setForm({ ...form, tiktok_engagement: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="0.0"
                    />
                  </div>
                </div>
              </div>

              {/* YouTube */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">YouTube</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Handle</label>
                    <input
                      type="text"
                      value={form.youtube_handle}
                      onChange={(e) => setForm({ ...form, youtube_handle: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="@channel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscribers</label>
                    <input
                      type="number"
                      min="0"
                      value={form.youtube_subscribers}
                      onChange={(e) => setForm({ ...form, youtube_subscribers: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Post ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price_per_post}
                  onChange={(e) => setForm({ ...form, price_per_post: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Story ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price_per_story}
                  onChange={(e) => setForm({ ...form, price_per_story: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Video ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price_per_video}
                  onChange={(e) => setForm({ ...form, price_per_video: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Portfolio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link</label>
                <input
                  type="url"
                  value={form.portfolio_url}
                  onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="https://yourportfolio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Past Collaborations <span className="text-gray-400 text-xs">(comma-separated links)</span>
                </label>
                <textarea
                  value={form.past_collaborations}
                  onChange={(e) => setForm({ ...form, past_collaborations: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-influx-blue"
                  placeholder="https://collab1.com, https://collab2.com"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-influx-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
