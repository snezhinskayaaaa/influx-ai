export const dynamic = 'force-dynamic'

import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function BrandManagementPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/auth/login');
  }

  const brandList = await prisma.brand.findMany({
    include: {
      profile: {
        select: { email: true },
      },
      _count: {
        select: { campaigns: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Brand Management</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Brands</div>
            <div className="text-3xl font-bold text-deep-purple">{brandList.length}</div>
            <div className="text-xs text-gray-500 mt-1">Registered companies</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Industries</div>
            <div className="text-3xl font-bold text-influx-blue">
              {new Set(brandList.map((b) => b.industry).filter(Boolean)).size}
            </div>
            <div className="text-xs text-gray-500 mt-1">Unique sectors</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">This Month</div>
            <div className="text-3xl font-bold text-success-green">
              {
                brandList.filter((b) => {
                  const d = new Date(b.createdAt);
                  const now = new Date();
                  return (
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
            <div className="text-xs text-gray-500 mt-1">New registrations</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Brands</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Company Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Industry</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Website</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Budget Range</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Campaigns</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Contact</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Registered</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brandList.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                      No brands registered yet.
                    </td>
                  </tr>
                ) : (
                  brandList.map((brand) => (
                    <tr
                      key={brand.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {brand.companyName}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {brand.profile?.email ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {brand.industry ? (
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                            {brand.industry}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {brand.website ? (
                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-influx-blue hover:underline truncate max-w-[160px] block"
                          >
                            {brand.website.replace(/^https?:\/\//, '')}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {brand.monthlyBudgetRange ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {brand._count.campaigns}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div>{brand.contactName ?? '—'}</div>
                        {brand.contactEmail && (
                          <div className="text-xs text-gray-400">{brand.contactEmail}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(brand.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/brands/${brand.id}`}
                          className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
