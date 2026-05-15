import Link from 'next/link';
import { Users, Building2 } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-4xl font-bold text-influx-blue">INFLUX.AI</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose how you want to join Influx.AI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          <Link
            href="/influencers/signup"
            className="flex items-center gap-4 w-full p-4 border-2 border-gray-200 rounded-lg hover:border-influx-blue hover:bg-blue-50 transition group"
          >
            <div className="w-12 h-12 rounded-full bg-influx-blue/10 flex items-center justify-center flex-shrink-0">
              <Users className="text-influx-blue" size={24} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-influx-blue transition">
                Join as Influencer
              </div>
              <div className="text-sm text-gray-600">
                Showcase your AI persona and connect with brands
              </div>
            </div>
          </Link>

          <Link
            href="/brands/signup"
            className="flex items-center gap-4 w-full p-4 border-2 border-gray-200 rounded-lg hover:border-deep-purple hover:bg-purple-50 transition group"
          >
            <div className="w-12 h-12 rounded-full bg-deep-purple/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="text-deep-purple" size={24} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 group-hover:text-deep-purple transition">
                Join as Brand
              </div>
              <div className="text-sm text-gray-600">
                Find and book AI influencers for your campaigns
              </div>
            </div>
          </Link>

          <div className="pt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-influx-blue hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
