'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingAds: 0,
    approvedAds: 0,
    users: 0,
    revenue: 0,
  });
  const [filter, setFilter] = useState('thisMonth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [filter]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/summary`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { filter },
      });

      setStats(res.data);
    } catch (err) {
      toast.error('Failed to load stats.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ff3399] mb-4">Dashboard Overview</h2>

      <div className="mb-6">
        <label className="text-sm text-gray-300 mr-2">Filter by:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0d0d0d] border border-[#333] text-white rounded px-3 py-1"
        >
          <option value="thisMonth">This Month</option>
          <option value="last3Months">Last 3 Months</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="thisYear">This Year</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <DashboardCard title="Pending Ads" value={stats.pendingAds} color="#facc15" />
          <DashboardCard title="Approved Ads" value={stats.approvedAds} color="#22c55e" />
          <DashboardCard title="Total Users" value={stats.users} color="#3b82f6" />
          <DashboardCard title="Revenue" value={`Rs. ${stats.revenue.toLocaleString()}`} color="#f50591" />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg shadow hover:shadow-pink-500/20 transition-shadow">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
