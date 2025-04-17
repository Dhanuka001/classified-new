'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiHome, FiUsers, FiDollarSign, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-[#ff3399] text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#1a1a1a] border-r border-[#333] transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 z-40`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#ff3399] mb-8">Admin Dashboard</h2>
          <nav className="space-y-4">
            <Link href="/admin" className="flex items-center gap-2 text-gray-300 hover:text-[#ff3399] transition-colors">
              <FiHome /> Dashboard
            </Link>
            <Link href="/admin/ads" className="flex items-center gap-2 text-gray-300 hover:text-[#ff3399] transition-colors">
              <FiHome /> Ads Management
            </Link>
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-300 hover:text-[#ff3399] transition-colors">
              <FiUsers /> Users Management
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-2 text-gray-300 hover:text-[#ff3399] transition-colors">
              <FiDollarSign /> Payments
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-300 hover:text-[#ff3399] transition-colors w-full text-left"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}