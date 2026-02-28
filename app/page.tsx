'use client';

import Link from 'next/link';
import { Search, CheckCircle, DollarSign, TrendingUp, Sparkles, Users, Zap, ArrowRight } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-influx-blue/5 via-white to-deep-purple/5 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-influx-blue/10 text-influx-blue text-sm font-semibold">
                <Sparkles size={16} />
                Launching March 2026
              </div>

              <h1 className="text-balance leading-tight">
                The First Marketplace for{' '}
                <span className="gradient-text">AI Influencers</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with verified virtual talent. Book campaigns in minutes. Track real results.
                The future of influencer marketing is here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button href="/brands/signup" variant="gradient" size="lg">
                  For Brands
                  <ArrowRight size={20} />
                </Button>
                <Button href="/influencers/signup" variant="outline" size="lg">
                  For Influencers
                  <ArrowRight size={20} />
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-influx-blue">30+</div>
                  <div className="text-sm text-gray-600">AI Influencers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-deep-purple">5M+</div>
                  <div className="text-sm text-gray-600">Combined Reach</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-electric-cyan">5.9%</div>
                  <div className="text-sm text-gray-600">Avg Engagement</div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative animate-scale-in">
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  {/* Sample Influencer Cards */}
                  <Card hover className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-influx-blue to-deep-purple rounded-lg mb-3"></div>
                    <div className="text-sm font-semibold">Aitana López</div>
                    <div className="text-xs text-gray-500">391K followers</div>
                  </Card>
                  <Card hover className="p-4 mt-8">
                    <div className="aspect-square bg-gradient-to-br from-deep-purple to-electric-cyan rounded-lg mb-3"></div>
                    <div className="text-sm font-semibold">Imma</div>
                    <div className="text-xs text-gray-500">387K followers</div>
                  </Card>
                  <Card hover className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-electric-cyan to-success-green rounded-lg mb-3"></div>
                    <div className="text-sm font-semibold">Noonoouri</div>
                    <div className="text-xs text-gray-500">482K followers</div>
                  </Card>
                  <Card hover className="p-4 mt-8">
                    <div className="aspect-square bg-gradient-to-br from-warning-orange to-influx-blue rounded-lg mb-3"></div>
                    <div className="text-sm font-semibold">Zlu</div>
                    <div className="text-xs text-gray-500">457K followers</div>
                  </Card>
                </div>
              </div>
              {/* Background Gradient Blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-influx-blue/20 to-deep-purple/20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="container-custom">
          <p className="text-center text-sm text-gray-500 mb-8">
            Trusted by leading brands worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30">
            <div className="text-2xl font-bold text-gray-400">NIKE</div>
            <div className="text-2xl font-bold text-gray-400">DIOR</div>
            <div className="text-2xl font-bold text-gray-400">VERSACE</div>
            <div className="text-2xl font-bold text-gray-400">BMW</div>
            <div className="text-2xl font-bold text-gray-400">SAMSUNG</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-balance">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The complete platform for AI influencer marketing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-influx-blue to-deep-purple flex items-center justify-center">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Discover AI Talent</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse verified AI influencers across all niches. Filter by followers,
                engagement, and budget to find the perfect match for your campaign.
              </p>
            </Card>

            <Card hover className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-deep-purple to-electric-cyan flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Verified Metrics</h3>
              <p className="text-gray-600 leading-relaxed">
                See real engagement rates, follower counts, and past campaign performance.
                All metrics verified by our team for transparency.
              </p>
            </Card>

            <Card hover className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-cyan to-success-green flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Book campaigns in minutes with clear pricing. Secure payments, fair rates.
                Influencers keep 80% of all earnings.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why AI Influencers Section */}
      <section className="section-padding bg-gradient-to-br from-influx-blue/5 to-deep-purple/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-balance">
                Why AI Influencers?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-influx-blue/10 flex items-center justify-center">
                    <TrendingUp className="text-influx-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">3x Higher Engagement</h4>
                    <p className="text-gray-600">
                      Virtual influencers average 5.9% engagement vs 1.9% for traditional influencers
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-deep-purple/10 flex items-center justify-center">
                    <Zap className="text-deep-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Always Available</h4>
                    <p className="text-gray-600">
                      No scheduling conflicts, travel costs, or time zone issues
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-electric-cyan/10 flex items-center justify-center">
                    <Users className="text-electric-cyan" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Brand Safe Content</h4>
                    <p className="text-gray-600">
                      Full control over messaging, appearance, and brand alignment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white">
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-influx-blue/10 to-deep-purple/10">
                  <div className="text-4xl font-bold gradient-text mb-2">$46B</div>
                  <div className="text-gray-600">AI Influencer Market by 2030</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-influx-blue mb-1">77%</div>
                    <div className="text-sm text-gray-600">Brands increasing AI budgets</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-deep-purple mb-1">58%</div>
                    <div className="text-sm text-gray-600">Consumers follow virtual influencers</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding" id="for-brands">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-balance">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Brands */}
            <div id="for-brands">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-influx-blue/10 text-influx-blue text-sm font-bold mb-6">
                For Brands
              </div>
              <div className="space-y-6">
                {[
                  {
                    number: '1',
                    title: 'Browse AI Influencers',
                    description: 'Filter by niche, followers, engagement rate, and budget'
                  },
                  {
                    number: '2',
                    title: 'Review Verified Metrics',
                    description: 'See real engagement data and past campaign performance'
                  },
                  {
                    number: '3',
                    title: 'Book Your Campaign',
                    description: 'Send offer, agree on terms, and launch in minutes'
                  },
                  {
                    number: '4',
                    title: 'Track Results',
                    description: 'Monitor performance and ROI in real-time'
                  },
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-influx-blue to-deep-purple text-white flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Influencers */}
            <div id="for-influencers">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-purple/10 text-deep-purple text-sm font-bold mb-6">
                For AI Influencers
              </div>
              <div className="space-y-6">
                {[
                  {
                    number: '1',
                    title: 'Create Your Profile',
                    description: 'Add your metrics, portfolio, and pricing in minutes'
                  },
                  {
                    number: '2',
                    title: 'Get Discovered',
                    description: 'Brands searching for AI talent will find you'
                  },
                  {
                    number: '3',
                    title: 'Accept Campaigns',
                    description: 'Review offers and choose the best fit for your audience'
                  },
                  {
                    number: '4',
                    title: 'Get Paid',
                    description: 'Receive 80% of campaign earnings via secure payment'
                  },
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-deep-purple to-electric-cyan text-white flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-influx-blue via-deep-purple to-influx-blue animate-gradient bg-300%">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-white text-balance">
              Ready to Start Your First Campaign?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join the first marketplace for AI influencers. Launch: March 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button href="/brands/signup" variant="dark" size="lg" className="bg-white text-influx-blue hover:bg-gray-100">
                Start as Brand
                <ArrowRight size={20} />
              </Button>
              <Button href="/influencers/signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-influx-blue">
                Join as Influencer
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
