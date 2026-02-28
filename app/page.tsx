import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-influx-blue">
                INFLUX.AI
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-influx-blue">
                How it Works
              </Link>
              <Link href="#for-influencers" className="text-gray-700 hover:text-influx-blue">
                For Influencers
              </Link>
              <Link href="#for-brands" className="text-gray-700 hover:text-influx-blue">
                For Brands
              </Link>
              <Link
                href="#waitlist"
                className="bg-influx-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-gray mb-6">
            The First Marketplace for{' '}
            <span className="text-influx-blue">AI Influencers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Browse verified virtual talent. Book campaigns in minutes. Track real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/influencers/signup"
              className="bg-influx-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Join as Influencer
            </Link>
            <Link
              href="/browse"
              className="bg-white text-influx-blue border-2 border-influx-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Browse Talent
            </Link>
          </div>
          <p className="mt-6 text-gray-500">
            Join 20+ AI influencers already on the platform
          </p>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* For AI Influencers */}
            <div className="text-center" id="for-influencers">
              <div className="w-16 h-16 bg-influx-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">For AI Influencers</h3>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Keep 80% of all earnings
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  No listing fees, ever
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Access to verified brands
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Secure payment processing
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Full creative control
                </li>
              </ul>
              <Link
                href="/influencers/signup"
                className="inline-block mt-6 text-influx-blue font-semibold hover:underline"
              >
                Join as Influencer →
              </Link>
            </div>

            {/* For Brands */}
            <div className="text-center" id="for-brands">
              <div className="w-16 h-16 bg-deep-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">For Brands</h3>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Verified AI influencer profiles
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Transparent pricing & metrics
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Book campaigns in minutes
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Track performance in real-time
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Secure contracts & payments
                </li>
              </ul>
              <Link
                href="/browse"
                className="inline-block mt-6 text-influx-blue font-semibold hover:underline"
              >
                Browse Talent →
              </Link>
            </div>

            {/* Why Influx */}
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Why Influx</h3>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  First dedicated platform for AI influencers
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Quality-checked virtual talent
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Growing network of brands & influencers
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Expert campaign management
                </li>
                <li className="flex items-start">
                  <span className="text-success-green mr-2">•</span>
                  Premium support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-influx-blue mb-2">30+</div>
              <div className="text-gray-600">AI Influencers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-influx-blue mb-2">5M+</div>
              <div className="text-gray-600">Combined Reach</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-influx-blue mb-2">5.9%</div>
              <div className="text-gray-600">Avg Engagement</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-influx-blue mb-2">80%</div>
              <div className="text-gray-600">Creator Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20 bg-gray-50" id="waitlist">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Influx</h2>
          <p className="text-xl text-gray-600 mb-12">
            Be among the first AI influencers and brands on the platform. Launch: March 2026.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center gap-4 mb-8">
              <button className="px-6 py-2 bg-influx-blue text-white rounded-lg font-semibold">
                I'm an AI Influencer
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                I'm a Brand
              </button>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-influx-blue"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-influx-blue"
              />
              <input
                type="text"
                placeholder="Instagram Handle (@username)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-influx-blue"
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-influx-blue">
                <option>Follower Count</option>
                <option>10K-50K</option>
                <option>50K-100K</option>
                <option>100K-500K</option>
                <option>500K-1M</option>
                <option>1M+</option>
              </select>
              <button
                type="submit"
                className="w-full bg-influx-blue text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Join as Influencer
              </button>
              <p className="text-sm text-gray-500">
                We'll never share your information. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">INFLUX.AI</div>
              <p className="text-gray-400">Where influence flows.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#how-it-works" className="hover:text-white">How it Works</Link></li>
                <li><Link href="#for-influencers" className="hover:text-white">For Influencers</Link></li>
                <li><Link href="#for-brands" className="hover:text-white">For Brands</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Influx.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
