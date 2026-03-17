import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import { CheckCircle2, Sparkles, Building2, User } from 'lucide-react';

export const metadata = {
  title: 'Pricing | Influx.AI',
  description: 'Simple, transparent pricing for brands and AI influencers on Influx.AI.',
};

const brandFeatures = [
  'Browse verified AI influencers',
  'Campaign management dashboard',
  'Direct collaboration with operators',
  'Performance tracking & analytics',
  'Secure escrow payments',
  'Content approval workflow',
];

const influencerFeatures = [
  'Profile listing & discovery',
  'Campaign offers from brands',
  'Secure payouts (80% of budget)',
  'Dashboard & analytics',
  'Verification badge eligibility',
  'Zero subscription fees',
];

const faqs = [
  {
    question: 'When do I pay as a brand?',
    answer:
      'You only pay when you launch a campaign. There are no monthly subscription fees, no listing fees, and no charges for browsing influencers. Campaign funds are deposited upfront and held in escrow until deliverables are approved.',
  },
  {
    question: 'Are there subscription fees for influencers?',
    answer:
      'No. Joining Influx.AI as an AI Influencer Operator is completely free. You create your profile, list your influencer persona, and only earn — we never charge you a subscription, listing fee, or upfront cost.',
  },
  {
    question: 'How does payment work end-to-end?',
    answer:
      'A brand deposits the full campaign budget through the Platform when launching a campaign. Influx.AI holds those funds in escrow. Once the influencer delivers content and the brand approves it, 80% of the budget is released to the influencer operator and 20% is retained by Influx.AI as a platform service fee. Payouts are processed within 5–7 business days.',
  },
  {
    question: 'What is the minimum campaign budget?',
    answer:
      'The minimum campaign budget is $250. This ensures campaigns are meaningful for both brands and influencer operators, and covers payment processing costs. There is no upper limit — large enterprise campaigns are welcome.',
  },
  {
    question: 'Does the 20% fee include payment processing?',
    answer:
      'Yes. Our 20% platform fee covers the full cost of running the marketplace, including payment processing, escrow management, fraud protection, and platform infrastructure. There are no additional transaction fees on top of the campaign budget.',
  },
  {
    question: 'Can I cancel a campaign after funding it?',
    answer:
      'Campaigns can be cancelled before the influencer has begun work for a full refund minus payment processing fees. Once a campaign is in progress, refunds are subject to our dispute resolution process. See our Terms of Service for full details.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-influx-blue/10 via-white to-deep-purple/10 border-b border-gray-100">
        <div className="container-custom py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-influx-blue/10 text-influx-blue text-sm font-semibold mb-6">
            <Sparkles size={16} />
            No hidden fees, ever
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Brands pay only when they launch campaigns. Influencers earn 80% of every deal.
            No subscriptions. No surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Brands Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-influx-blue to-deep-purple p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Building2 size={22} />
                  </div>
                  <span className="text-lg font-semibold">For Brands</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl font-bold">20%</span>
                  <span className="text-white/80 ml-2 text-lg">platform fee</span>
                </div>
                <p className="text-white/80 text-sm">
                  Charged on campaign budget. No subscription required.
                </p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Example</p>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Campaign budget</span>
                      <span className="font-semibold">$1,000</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Influx.AI fee (20%)</span>
                      <span>$200</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                      <span>Total you pay</span>
                      <span>$1,000</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Included</p>
                  <ul className="space-y-3">
                    {brandFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 size={18} className="text-influx-blue flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href="/brands/signup" variant="primary" className="w-full">
                  Start as a Brand
                </Button>
              </div>
            </div>

            {/* Influencers Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-deep-purple to-influx-blue p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <User size={22} />
                  </div>
                  <span className="text-lg font-semibold">For AI Influencers</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl font-bold">80%</span>
                  <span className="text-white/80 ml-2 text-lg">of every campaign</span>
                </div>
                <p className="text-white/80 text-sm">
                  Free to join. Keep the majority of everything you earn.
                </p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Example</p>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Campaign budget</span>
                      <span className="font-semibold">$1,000</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Influx.AI fee (20%)</span>
                      <span>−$200</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-influx-blue">
                      <span>You receive</span>
                      <span>$800</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Included</p>
                  <ul className="space-y-3">
                    {influencerFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 size={18} className="text-deep-purple flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href="/influencers/signup" variant="gradient" className="w-full">
                  Join as Influencer
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How the Fee Works */}
      <section className="section-padding bg-white border-y border-gray-100">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Platform Fee Works</h2>
          <p className="text-gray-600 text-lg mb-12">
            The 20% platform fee is calculated on the campaign budget agreed between the brand and
            the influencer operator. It covers the full cost of running the marketplace — there are
            no additional charges.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-influx-blue/10 flex items-center justify-center text-influx-blue font-bold text-lg">1</div>
              <h3 className="font-bold text-gray-900">Brand funds campaign</h3>
              <p className="text-gray-600 text-sm">
                Brand deposits the full agreed campaign budget through the Platform before work begins.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-influx-blue/10 flex items-center justify-center text-influx-blue font-bold text-lg">2</div>
              <h3 className="font-bold text-gray-900">Influencer delivers content</h3>
              <p className="text-gray-600 text-sm">
                The AI influencer operator creates and submits deliverables. Brand reviews and approves.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-influx-blue/10 flex items-center justify-center text-influx-blue font-bold text-lg">3</div>
              <h3 className="font-bold text-gray-900">Payout released</h3>
              <p className="text-gray-600 text-sm">
                80% is paid to the influencer operator. 20% is retained by Influx.AI. Processed in 5–7 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing FAQ</h2>
            <p className="text-gray-600 text-lg">Common questions about how pricing works on Influx.AI.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-influx-blue to-deep-purple">
        <div className="container-custom text-center text-white max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to get started?</h2>
          <p className="text-white/80 text-lg">
            Join brands already using Influx.AI to run campaigns, or list your AI influencer
            persona and start earning today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/brands/signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-influx-blue">
              Start as a Brand
            </Button>
            <Button href="/influencers/signup" size="lg" className="bg-white text-influx-blue hover:bg-white/90">
              Join as Influencer
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
