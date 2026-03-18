'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const INDUSTRIES = [
  'Fashion & Apparel',
  'Beauty & Cosmetics',
  'Technology',
  'Gaming',
  'Food & Beverage',
  'Health & Fitness',
  'Travel & Hospitality',
  'Entertainment',
  'Finance',
  'Education',
  'Retail & E-commerce',
  'Automotive',
  'Other',
];

const BUDGET_RANGES = [
  { value: 'under_1k', label: 'Under $1K' },
  { value: '1k_5k', label: '$1K–$5K' },
  { value: '5k_20k', label: '$5K–$20K' },
  { value: '20k_plus', label: '$20K+' },
];

export default function BrandSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  // Account fields
  const [fullName, setFullName] = useState('');
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountToast, setAccountToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Company fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [monthlyBudgetRange, setMonthlyBudgetRange] = useState('');
  const [savingCompany, setSavingCompany] = useState(false);
  const [companyToast, setCompanyToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordToast, setPasswordToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, brandRes] = await Promise.all([
          fetch('/api/profiles/me'),
          fetch('/api/brands/me'),
        ]);

        if (!profileRes.ok) {
          router.push('/auth/login');
          return;
        }

        const profileData = await profileRes.json();
        const brandData = brandRes.ok ? await brandRes.json() : null;

        if (profileData.profile) {
          setEmail(profileData.profile.email || '');
          setFullName(profileData.profile.fullName || '');
        }

        if (brandData?.brand) {
          const brand = brandData.brand;
          setCompanyName(brand.companyName || '');
          setIndustry(brand.industry || '');
          setWebsite(brand.website || '');
          setBrandDescription(brand.description || '');
          setContactName(brand.contactName || '');
          setContactEmail(brand.contactEmail || '');
          setMonthlyBudgetRange(brand.monthlyBudgetRange || '');
        }
      } catch {
        router.push('/auth/login');
        return;
      }

      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSaveCompany(e: React.FormEvent) {
    e.preventDefault();
    setSavingCompany(true);
    setCompanyToast(null);

    try {
      const res = await fetch('/api/brands/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          industry,
          website,
          description: brandDescription,
          contactName,
          contactEmail,
          monthlyBudgetRange,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save company info.');
      }

      setCompanyToast({ type: 'success', message: 'Company information saved!' });
      setTimeout(() => setCompanyToast(null), 4000);
    } catch {
      setCompanyToast({ type: 'error', message: 'Failed to save company info. Please try again.' });
    } finally {
      setSavingCompany(false);
    }
  }

  async function handleSaveAccount(e: React.FormEvent) {
    e.preventDefault();
    setSavingAccount(true);
    setAccountToast(null);

    try {
      const res = await fetch('/api/profiles/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName }),
      });

      if (!res.ok) {
        throw new Error('Failed to update account.');
      }

      setAccountToast({ type: 'success', message: 'Account updated successfully!' });
      setTimeout(() => setAccountToast(null), 4000);
    } catch {
      setAccountToast({ type: 'error', message: 'Failed to update account. Please try again.' });
    } finally {
      setSavingAccount(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordToast({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordToast({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }
    setSavingPassword(true);
    setPasswordToast(null);

    try {
      const res = await fetch('/api/auth/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update password.');
      }

      setPasswordToast({ type: 'success', message: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordToast(null), 4000);
    } catch (err: any) {
      setPasswordToast({ type: 'error', message: err.message || 'Failed to update password.' });
    } finally {
      setSavingPassword(false);
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
              <Link href="/dashboard/brand/campaigns" className="text-gray-600 hover:text-gray-900">
                Campaigns
              </Link>
              <Link href="/dashboard/brand/settings" className="text-gray-900 font-medium">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your company profile and account preferences</p>
        </div>

        <div className="space-y-8">
          {/* Company Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Company Information</h2>

            {companyToast && (
              <div
                className={`rounded-lg p-4 mb-4 ${
                  companyToast.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {companyToast.message}
              </div>
            )}

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Acme Corporation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Tell influencers about your brand..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget Range</label>
                <select
                  value={monthlyBudgetRange}
                  onChange={(e) => setMonthlyBudgetRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                >
                  <option value="">Select budget range...</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingCompany}
                  className="bg-deep-purple text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingCompany ? 'Saving...' : 'Save Company Info'}
                </button>
              </div>
            </form>
          </div>

          {/* Account Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Account</h2>

            {accountToast && (
              <div
                className={`rounded-lg p-4 mb-4 ${
                  accountToast.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {accountToast.message}
              </div>
            )}

            <form onSubmit={handleSaveAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed here.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Your full name"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingAccount}
                  className="bg-deep-purple text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingAccount ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>

            {passwordToast && (
              <div
                className={`rounded-lg p-4 mb-4 ${
                  passwordToast.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {passwordToast.message}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Enter new password"
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-purple"
                  placeholder="Confirm new password"
                  minLength={6}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="bg-deep-purple text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingPassword ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow p-6 border border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-500">Permanently delete your account and all associated data.</p>
              </div>
              <button
                disabled
                title="Contact support to delete account"
                className="bg-gray-100 text-gray-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed border border-gray-200"
              >
                Delete Account
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Contact support to delete your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
