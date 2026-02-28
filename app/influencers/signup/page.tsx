'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, CheckCircle2, Instagram, Award, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function InfluencerSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    handle: '',
    bio: '',
    instagramHandle: '',
    instagramFollowers: '',
    tiktokHandle: '',
    tiktokFollowers: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User creation failed');

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: formData.email,
        full_name: formData.fullName,
        role: 'influencer',
      });

      if (profileError) throw profileError;

      const { error: influencerError } = await supabase.from('influencers').insert({
        user_id: authData.user.id,
        handle: formData.handle,
        bio: formData.bio,
        instagram_handle: formData.instagramHandle,
        instagram_followers: parseInt(formData.instagramFollowers) || 0,
        tiktok_handle: formData.tiktokHandle,
        tiktok_followers: parseInt(formData.tiktokFollowers) || 0,
        status: 'pending',
      });

      if (influencerError) throw influencerError;

      router.push('/dashboard/influencer');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-influx-blue/5 via-white to-deep-purple/5">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container-custom py-6">
          <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition">
            INFLUX.AI
          </Link>
        </div>
      </nav>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Benefits */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-influx-blue/10 text-influx-blue text-sm font-semibold mb-6">
                <Sparkles size={16} />
                Join 30+ AI Influencers
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Monetize Your <span className="gradient-text">Virtual Influence</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get discovered by top brands, manage campaigns, and keep 80% of your earnings.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-influx-blue to-deep-purple flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Get Discovered</h3>
                  <p className="text-gray-600">Brands actively searching for AI talent will find you</p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-deep-purple to-electric-cyan flex items-center justify-center">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Keep 80% of Earnings</h3>
                  <p className="text-gray-600">Industry-leading creator split with secure payments</p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan to-success-green flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">No Listing Fees</h3>
                  <p className="text-gray-600">Free to join, only pay when you get booked</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Your Profile</h2>
              <p className="text-gray-600">Join the first AI influencer marketplace</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step >= 1 ? 'bg-gradient-to-br from-influx-blue to-deep-purple text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`text-sm font-semibold ${step >= 1 ? 'text-influx-blue' : 'text-gray-400'}`}>
                  Account
                </div>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200 rounded">
                <div className={`h-full bg-gradient-to-r from-influx-blue to-deep-purple rounded transition-all duration-300 ${
                  step >= 2 ? 'w-full' : 'w-0'
                }`} />
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step >= 2 ? 'bg-gradient-to-br from-influx-blue to-deep-purple text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`text-sm font-semibold ${step >= 2 ? 'text-influx-blue' : 'text-gray-400'}`}>
                  Profile
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <p className="mt-2 text-xs text-gray-500">At least 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name or Character Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                      placeholder="Aitana López"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                  >
                    Continue to Profile
                    <ArrowRight size={20} />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Handle * (unique username)
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-lg border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-mono">
                        @
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.handle}
                        onChange={(e) => updateFormData('handle', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-lg focus:outline-none focus:border-influx-blue transition"
                        placeholder="yourhandle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio *
                    </label>
                    <textarea
                      required
                      value={formData.bio}
                      onChange={(e) => updateFormData('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition resize-none"
                      placeholder="Tell brands about yourself, your niche, and what makes you unique..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Instagram size={14} className="inline mr-1" />
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={formData.instagramHandle}
                        onChange={(e) => updateFormData('instagramHandle', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                        placeholder="@handle"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Followers
                      </label>
                      <input
                        type="number"
                        value={formData.instagramFollowers}
                        onChange={(e) => updateFormData('instagramFollowers', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                        placeholder="100000"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        TikTok Handle
                      </label>
                      <input
                        type="text"
                        value={formData.tiktokHandle}
                        onChange={(e) => updateFormData('tiktokHandle', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                        placeholder="@handle"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Followers
                      </label>
                      <input
                        type="number"
                        value={formData.tiktokFollowers}
                        onChange={(e) => updateFormData('tiktokFollowers', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-influx-blue transition"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ArrowLeft size={20} />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                    >
                      {loading ? 'Creating...' : 'Create Account'}
                      <CheckCircle2 size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-influx-blue hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
