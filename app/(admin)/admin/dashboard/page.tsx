'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import BookingTable from '@/components/admin/BookingTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';

interface BookingData {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  status: string;
}

interface ServiceData {
  _id: string;
  title: string;
  isActive: boolean;
  price: string;
}

interface PostData {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface Stats {
  bookings: {
    total: number;
    pending: number;
  };
  services: {
    total: number;
    active: number;
  };
  posts: {
    total: number;
    published: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    bookings: { total: 0, pending: 0 },
    services: { total: 0, active: 0 },
    posts: { total: 0, published: 0 },
  });
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [recentServices, setRecentServices] = useState<ServiceData[]>([]);
  const [recentPosts, setRecentPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, servicesRes, postsRes] = await Promise.all([
        fetch('/api/admin/bookings?limit=10'),
        fetch('/api/admin/services'),
        fetch('/api/admin/posts')
      ]);

      const [bookingsData, servicesData, postsData] = await Promise.all([
        bookingsRes.json(),
        servicesRes.json(),
        postsRes.json()
      ]);

      const bookings: BookingData[] = bookingsData?.data?.bookings || [];
      const services: ServiceData[] = servicesData?.data?.services || [];
      const posts: PostData[] = postsData?.data?.posts || [];

      setStats({
        bookings: {
          total: bookingsData?.data?.total || bookings.length,
          pending: bookings.filter((b) => b.status === 'pending').length,
        },
        services: {
          total: services.length,
          active: services.filter((s) => s.isActive).length,
        },
        posts: {
          total: posts.length,
          published: posts.filter((p) => p.status === 'published').length,
        },
      });

      setRecentBookings(bookings.slice(0, 5));
      setRecentServices(services.slice(0, 5));
      setRecentPosts(posts.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <main className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Bookings"
            value={stats.bookings.total}
            description={`${stats.bookings.pending} pending appointments`}
            color="red"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <StatsCard
            title="Services"
            value={stats.services.total}
            description={`${stats.services.active} active offerings`}
            color="blue"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            }
          />
          <StatsCard
            title="Blog Posts"
            value={stats.posts.total}
            description={`${stats.posts.published} published articles`}
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm text-red-600 hover:text-red-700 font-medium">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Customer</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Service</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b._id} className="border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{b.customerName}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{b.serviceType}</td>
                      <td className="py-3 px-4"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Posts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Latest Posts</h2>
              <Link href="/admin/posts" className="text-sm text-red-600 hover:text-red-700 font-medium">Manage</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Title</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((p) => (
                    <tr key={p._id} className="border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 truncate max-w-[200px]">{p.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* All Services Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Services Overview</h2>
              <Link href="/admin/services" className="text-sm text-red-600 hover:text-red-700 font-medium">Edit All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Service Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Rate</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentServices.map((s) => (
                    <tr key={s._id} className="border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.title}</td>
                      <td className="py-3 px-4 text-slate-600 font-bold">${s.price?.toString() || '0.00'}</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${
                          s.isActive ? 'text-green-600' : 'text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.isActive ? 'bg-green-600' : 'bg-slate-400'}`} />
                          {s.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
