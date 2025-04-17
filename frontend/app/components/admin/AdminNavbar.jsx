'use client';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-[#1a1a1a] border-b border-[#333] p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#ff3399]">SriAdz Admin</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm hidden sm:block">Admin User</span>
        <button
          onClick={handleLogout}
          className="text-[#ff3399] hover:text-pink-600 transition-colors"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </nav>
  );
}