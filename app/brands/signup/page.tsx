'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, Search, TrendingUp, Shield, CheckCircle2, Building2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BrandSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    companyName: '',
    industry: '',
    website: '',
    description: '',
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
        role: 'brand',
      });

      if (profileError) throw profileError;

      const { error: brandError } = await supabase.from('brands').insert({
        user_id: authData.user.id,
        company_name: formData.companyName,
        industry: formData.industry,
        website: formData.website,
        description: formData.description,
        contact_name: formData.fullName,
        contact_email: formData.email,
      });

      if (brandError) throw brandError;

      router.push('/dashboard/brand');
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-purple/10 text-deep-purple text-sm font-semibold mb-6">
                <Building2 size={16} />
                Trusted by Leading Brands
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find <span className="gradient-text">AI Influencers</span> for Your Brand
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access verified virtual talent, launch campaigns in minutes, and track real results.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-influx-blue to-deep-purple flex items-center justify-center">
                  <Search className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discover Verified Talent</h3>
                  <p className="text-gray-600">Browse 30+ verified AI influencers with real metrics</p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-deep-purple to-electric-cyan flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">3x Higher Engagement</h3>
                  <p className="text-gray-600">AI influencers average 5.9% vs 1.9% for traditional</p>
                </div>
              </Card>

              <Card className="p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan to-success-green flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Brand Safe & Reliable</h3>
                  <p className="text-gray-600">Full control over messaging and brand alignment</p>
                </div>
              </Card>
            </div>

            {/* Stats */}
            <Card className="p-6 gradient-bg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-influx-blue">30+</div>
                  <div className="text-xs text-gray-600">AI Influencers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-deep-purple">5M+</div>
                  <div className="text-xs text-gray-600">Combined Reach</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-electric-cyan">5.9%</div>
                  <div className="text-xs text-gray-600">Avg Engagement</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Form */}
          <Card className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Brand Account</h2>
              <p className="text-gray-600">Start booking AI influencers today</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                  placeholder="you@company.com"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                  placeholder="••••••••"
                  minLength={6}
                />
                <p className="mt-2 text-xs text-gray-500">At least 6 characters</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => updateFormData('industry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                  >
                    <option value="">Select industry</option>
                    <option value="Fashion">Fashion & Luxury</option>
                    <option value="Beauty">Beauty & Cosmetics</option>
                    <option value="Tech">Technology</option>
                    <option value="Gaming">Gaming & Esports</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Travel">Travel & Hospitality</option>
                    <option value="Fitness">Fitness & Wellness</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Finance">Finance & Fintech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-deep-purple transition resize-none"
                  placeholder="Tell us about your brand, products, and what you're looking for in AI influencer partnerships..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? 'Creating Account...' : 'Create Brand Account'}
                <ArrowRight size={20} />
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-deep-purple hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
