'use client';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav className="bg-[#1a1a1a] border-b border-[#333] p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#ff3399]">SriAdz Admin</h1>
    </nav>
  );
}