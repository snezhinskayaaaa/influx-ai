import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user is admin
  if (user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Get all influencers
  const influencers = await prisma.influencer.findMany({
    include: { profile: true },
    orderBy: { createdAt: 'desc' },
  });

  // Get all brands
  const brands = await prisma.brand.findMany({
    include: { profile: true },
    orderBy: { createdAt: 'desc' },
  });

  // Get all campaigns
  const campaigns = await prisma.campaign.findMany({
    include: {
      _count: {
        select: { collaborations: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Total revenue: sum of fees from all transactions
  const feeAggregate = await prisma.transaction.aggregate({
    _sum: { fee: true },
  });
  const totalRevenue = feeAggregate._sum.fee || 0;

  const pendingInfluencers = influencers.filter((i) => i.status === 'PENDING').length;
  const approvedInfluencers = influencers.filter((i) => i.status === 'APPROVED').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-neutral-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="text-2xl font-bold">
              INFLUX.AI ADMIN
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="hover:text-electric-cyan">
                Dashboard
              </Link>
              <Link href="/admin/influencers" className="hover:text-electric-cyan">
                Influencers
              </Link>
              <Link href="/admin/brands" className="hover:text-electric-cyan">
                Brands
              </Link>
              <Link href="/admin/campaigns" className="hover:text-electric-cyan">
                Campaigns
              </Link>
              <form action="/auth/logout" method="post">
                <button className="hover:text-electric-cyan">Logout</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Revenue
            </div>
            <div className="text-3xl font-bold text-success-green">
              ${(totalRevenue / 100).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Platform fees</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Influencers
            </div>
            <div className="text-3xl font-bold text-influx-blue">
              {influencers.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {approvedInfluencers} approved
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Brands
            </div>
            <div className="text-3xl font-bold text-deep-purple">
              {brands.length}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Campaigns
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {campaigns.length}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        {pendingInfluencers > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              Pending Influencer Approvals ({pendingInfluencers})
            </h2>
            <Link
              href="/admin/influencers?status=pending"
              className="bg-warning-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Review Pending Influencers
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Influencers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Influencers</h2>
              <Link
                href="/admin/influencers"
                className="text-sm text-influx-blue hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="p-6">
              {influencers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No influencers yet</p>
              ) : (
                <div className="space-y-4">
                  {influencers.slice(0, 5).map((influencer) => (
                    <div
                      key={influencer.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">@{influencer.handle}</h3>
                          <p className="text-sm text-gray-600">
                            {influencer.profile?.email}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            influencer.status === 'APPROVED'
                              ? 'bg-success-green text-white'
                              : influencer.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {influencer.status.toLowerCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {influencer.instagramFollowers > 0 && (
                          <span>
                            {(influencer.instagramFollowers / 1000).toFixed(0)}K IG
                          </span>
                        )}
                        {influencer.tiktokFollowers > 0 && (
                          <span className="ml-2">
                            {(influencer.tiktokFollowers / 1000).toFixed(0)}K TT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Brands */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Brands</h2>
              <Link
                href="/admin/brands"
                className="text-sm text-deep-purple hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="p-6">
              {brands.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No brands yet</p>
              ) : (
                <div className="space-y-4">
                  {brands.slice(0, 5).map((brand) => (
                    <div
                      key={brand.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium mb-1">{brand.companyName}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {brand.profile?.email}
                      </p>
                      {brand.industry && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {brand.industry}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Campaigns</h2>
            <Link
              href="/admin/campaigns"
              className="text-sm text-influx-blue hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="p-6">
            {campaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No campaigns yet</p>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium mb-1">{campaign.title}</h3>
                      <div className="text-sm text-gray-600">
                        Budget: ${(campaign.budgetMin / 100).toLocaleString()} - ${(campaign.budgetMax / 100).toLocaleString()} | {campaign._count.collaborations} collaboration{campaign._count.collaborations !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        campaign.status === 'ACTIVE'
                          ? 'bg-success-green text-white'
                          : campaign.status === 'COMPLETED'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {campaign.status.toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
