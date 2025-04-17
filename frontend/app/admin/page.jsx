'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingAds: 0,
    users: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [adsRes, usersRes, paymentsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/ads/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/payments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          pendingAds: adsRes.data.length,
          users: usersRes.data.length,
          payments: paymentsRes.data.length,
        });
      } catch (err) {
        toast.error('Failed to load stats.', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ff3399] mb-6">Dashboard Overview</h2>
      {loading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg shadow hover:shadow-pink-500/20 transition-shadow">
            <h3 className="text-lg font-semibold text-gray-300">Pending Ads</h3>
            <p className="text-3xl font-bold text-[#ff3399]">{stats.pendingAds}</p>
            <a href="/admin/ads" className="text-[#ff3399] hover:underline mt-2 inline-block">
              Manage Ads
            </a>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg shadow hover:shadow-pink-500/20 transition-shadow">
            <h3 className="text-lg font-semibold text-gray-300">Users</h3>
            <p className="text-3xl font-bold text-[#ff3399]">{stats.users}</p>
            <a href="/admin/users" className="text-[#ff3399] hover:underline mt-2 inline-block">
              Manage Users
            </a>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg shadow hover:shadow-pink-500/20 transition-shadow">
            <h3 className="text-lg font-semibold text-gray-300">Payments</h3>
            <p className="text-3xl font-bold text-[#ff3399]">{stats.payments}</p>
            <a href="/admin/payments" className="text-[#ff3399] hover:underline mt-2 inline-block">
              View Payments
            </a>
          </div>
        </div>
      )}
    </div>
  );
}