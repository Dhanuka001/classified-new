'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isForgot
      ? '/forgot-password'
      : isRegistering
      ? '/register'
      : '/login';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      toast.success(data.message || (isRegistering ? 'Registered!' : 'Success!'));

      if (!isRegistering && !isForgot) {
        // ✅ Save and instantly update UI
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLogin && onLogin(data.user); // ✨ update navbar instantly
        onClose();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] rounded-lg max-w-md w-full p-6 relative border border-pink-500">
        <button
          className="absolute top-2 right-3 text-white text-lg hover:text-pink-400"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          {isForgot ? 'Forgot Password' : isRegistering ? 'Register' : 'Login'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#0d0d0d] text-white border border-pink-500 outline-none"
            required
          />
          {!isForgot && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#0d0d0d] text-white border border-pink-500 outline-none"
              required
            />
          )}
          {isRegistering && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#0d0d0d] text-white border border-pink-500 outline-none"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-[#ff3399] text-white py-2 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            {isForgot ? 'Send Reset Link' : isRegistering ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          {isForgot ? (
            <>
              Back to{' '}
              <button className="text-[#ff3399]" onClick={() => setIsForgot(false)}>
                Login
              </button>
            </>
          ) : isRegistering ? (
            <>
              Already have an account?{' '}
              <button className="text-[#ff3399]" onClick={() => setIsRegistering(false)}>
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button className="text-[#ff3399]" onClick={() => setIsRegistering(true)}>
                Register
              </button>
              <br />
              <button
                className="text-sm text-blue-400 mt-2 underline"
                onClick={() => setIsForgot(true)}
              >
                Forgot password?
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
