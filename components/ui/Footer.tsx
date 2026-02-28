import Link from 'next/link';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold gradient-text mb-4">INFLUX.AI</div>
            <p className="text-gray-600 mb-6 max-w-sm">
              The first marketplace for AI influencers. Where influence flows.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/influxai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-influx-blue flex items-center justify-center text-gray-600 hover:text-white transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/influx.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-influx-blue flex items-center justify-center text-gray-600 hover:text-white transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/influx-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-influx-blue flex items-center justify-center text-gray-600 hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-influx-blue transition">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-600 hover:text-influx-blue transition">
                  Browse Influencers
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-600 hover:text-influx-blue transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-influx-blue transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-influx-blue transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-influx-blue transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-influx-blue transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-influx-blue transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Influx.AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Launching March 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
