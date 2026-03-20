export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function statusBadge(status: string) {
  switch (status) {
    case 'AGREED':
    case 'IN_PROGRESS':
      return 'bg-green-100 text-green-800';
    case 'COMPLETED':
      return 'bg-gray-200 text-gray-700';
    case 'APPLIED':
    case 'NEGOTIATING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function formatDate(date: Date | null) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function InfluencerCampaignsPage() {
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
              <Link href="/dashboard/influencer" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/dashboard/influencer/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/dashboard/influencer/campaigns" className="text-gray-900 font-medium">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Campaigns</h1>
          <p className="text-gray-600">Track all your brand collaborations and earnings</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-influx-blue">
              ${(totalEarnings / 100).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Active Collaborations</div>
            <div className="text-3xl font-bold text-success-green">{activeCollaborations}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-gray-900">{completedCollaborations}</div>
          </div>
        </div>

        {/* Collaborations List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">All Campaigns</h2>
          </div>

          {collaborations.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No campaigns yet. Brands will contact you after your profile is approved.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Campaign</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Brand</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Agreed Price</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Status</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Dates</th>
                    <th className="text-left text-sm font-medium text-gray-600 px-6 py-3">Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {collaborations.map((collaboration) => (
                    <tr key={collaboration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{collaboration.campaign.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {collaboration.campaign.brand.companyName}
                        </div>
                        {collaboration.campaign.brand.industry && (
                          <div className="text-xs text-gray-500">{collaboration.campaign.brand.industry}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-influx-blue">
                          ${((collaboration.agreedPrice || collaboration.proposedPrice) / 100).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${statusBadge(collaboration.status)}`}
                        >
                          {collaboration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-600">
                          {formatDate(collaboration.createdAt)}
                          {collaboration.completedAt && ` — ${formatDate(collaboration.completedAt)}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {collaboration.deliverables && collaboration.deliverables.length > 0 ? (
                          <ul className="text-xs text-gray-600 space-y-1">
                            {collaboration.deliverables.map((d, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-influx-blue mt-0.5">•</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
