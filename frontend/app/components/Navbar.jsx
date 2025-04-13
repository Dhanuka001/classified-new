'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from './AuthModal';
import {
  FiUser,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiMenu,
  FiX,
} from 'react-icons/fi';

export default function Navbar() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-b from-[#ff3399] to-[#0d0d0d] text-white px-6 py-3 shadow-lg flex justify-between items-center z-[1000] relative">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/classified-02.png"
            alt="SriAdz Logo"
            width={130}
            height={40}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/account">
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-[#ff3399] rounded-md shadow-md hover:bg-pink-100 transition">
                  <FiUser /> My Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-700 text-white rounded-md shadow-md hover:bg-red-800 transition"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-[#ff3399] rounded-md shadow-md hover:bg-pink-100 transition"
            >
              <FiLogIn /> Login / Register
            </button>
          )}

          <Link href="/post-ad">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-black text-white rounded-md shadow-md hover:bg-gray-900 transition">
              <FiPlusCircle /> Ad එකක් දාන්න
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <FiMenu />
        </button>
      </nav>

      {/* Mobile Slide-down Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-black/90 backdrop-blur-md rounded-b-xl shadow-xl px-6 py-6 pt-20 sm:hidden animate-slide-in">
          {/* Close button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>

          <div className="flex flex-col items-center gap-5 text-base font-medium">
            {user ? (
              <>
                <Link href="/account">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 bg-white text-[#ff3399] px-5 py-2 rounded-md shadow"
                  >
                    <FiUser /> My Account
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-700 text-white px-5 py-2 rounded-md shadow"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setAuthOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-white text-[#ff3399] px-5 py-2 rounded-md shadow"
              >
                <FiLogIn /> Login / Register
              </button>
            )}

            <Link href="/post-ad">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md shadow"
              >
                <FiPlusCircle /> Ad එකක් දාන්න
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={(userData) => {
          setUser(userData);
          setMenuOpen(false);
        }}
      />
    </>
  );
}
