export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function InfluencerDashboard() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/login')

  const influencer = await prisma.influencer.findUnique({
    where: { userId: user.userId },
  })
  if (!influencer) redirect('/influencers/signup')

  const collaborations = await prisma.collaboration.findMany({
    where: { influencerId: influencer.id },
    include: { campaign: { include: { brand: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const totalEarnings = collaborations
    .filter(c => c.status === 'COMPLETED')
    .reduce((sum, c) => sum + (c.agreedPrice || 0), 0)
  const activeCollaborations = collaborations.filter(c => ['AGREED', 'IN_PROGRESS'].includes(c.status)).length
  const completedCollaborations = collaborations.filter(c => c.status === 'COMPLETED').length

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
              <Link
                href="/dashboard/influencer"
                className="text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <Link href="/dashboard/influencer/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/dashboard/influencer/campaigns" className="text-gray-600 hover:text-gray-900">
                Campaigns
              </Link>
              <Link href="/dashboard/influencer/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
              <form action="/auth/logout" method="post">
                <button className="text-gray-600 hover:text-gray-900">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, @{influencer.handle}!
          </h1>
          <p className="text-gray-600">
            Manage your profile, campaigns, and earnings
          </p>
        </div>

        {/* Status Alert */}
        {influencer.status === 'PENDING' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Profile Under Review
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your influencer profile is currently being reviewed by our team.
                    You'll be notified once it's approved and you can start receiving campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Earnings
            </div>
            <div className="text-3xl font-bold text-influx-blue">
              ${(totalEarnings / 100).toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Active Collaborations
            </div>
            <div className="text-3xl font-bold text-success-green">
              {activeCollaborations}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Completed
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {completedCollaborations}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Profile Status
            </div>
            <div className="text-xl font-bold">
              {influencer.status === 'APPROVED' && (
                <span className="text-success-green">✓ Approved</span>
              )}
              {influencer.status === 'PENDING' && (
                <span className="text-warning-orange">⏳ Pending</span>
              )}
              {influencer.status === 'REJECTED' && (
                <span className="text-red-600">✗ Rejected</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Overview */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Profile Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Handle</div>
                  <div className="font-medium">@{influencer.handle}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Bio</div>
                  <div className="text-sm">{influencer.bio || 'No bio yet'}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {influencer.instagramFollowers > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Instagram</div>
                      <div className="font-medium">
                        {(influencer.instagramFollowers / 1000).toFixed(0)}K followers
                      </div>
                      <div className="text-sm text-gray-600">
                        {String(influencer.instagramEngagement)}% engagement
                      </div>
                    </div>
                  )}

                  {influencer.tiktokFollowers > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">TikTok</div>
                      <div className="font-medium">
                        {(influencer.tiktokFollowers / 1000).toFixed(0)}K followers
                      </div>
                      <div className="text-sm text-gray-600">
                        {String(influencer.tiktokEngagement)}% engagement
                      </div>
                    </div>
                  )}
                </div>

                {influencer.pricePerPost && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rate per Post</div>
                    <div className="text-lg font-bold text-influx-blue">
                      ${(influencer.pricePerPost / 100).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/dashboard/influencer/profile"
                className="mt-6 block w-full text-center bg-influx-blue text-white py-2 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Recent Collaborations */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Recent Campaigns</h2>
            </div>
            <div className="p-6">
              {collaborations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-4">No campaigns yet</p>
                  <p className="text-sm">
                    Brands will reach out to you once your profile is approved
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {collaborations.slice(0, 5).map((collaboration) => (
                    <Link
                      key={collaboration.id}
                      href={`/dashboard/influencer/campaigns/${collaboration.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-influx-blue transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{collaboration.campaign.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            ['AGREED', 'IN_PROGRESS'].includes(collaboration.status)
                              ? 'bg-success-green text-white'
                              : collaboration.status === 'COMPLETED'
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {collaboration.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {collaboration.campaign.brand.companyName}
                      </div>
                      <div className="text-sm font-medium text-influx-blue">
                        ${((collaboration.agreedPrice || collaboration.proposedPrice) / 100).toLocaleString()} payout
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {collaborations.length > 0 && (
                <Link
                  href="/dashboard/influencer/campaigns"
                  className="mt-4 block text-center text-influx-blue font-medium hover:underline"
                >
                  View all campaigns →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
