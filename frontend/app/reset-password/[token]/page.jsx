'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message || 'Password reset successfully!');
      router.push('/'); // or show login modal
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#ff3399] mb-4">🔐 Reset Your Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-[#0d0d0d] text-white border border-pink-500 outline-none mb-4"
          required
        />
        <button type="submit" className="w-full bg-[#ff3399] text-white py-2 rounded-md font-semibold hover:bg-pink-700 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
}
