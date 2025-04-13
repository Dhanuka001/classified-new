'use client';
import { useState } from 'react';
import { FaRocket, FaTimes } from 'react-icons/fa';

export default function FloatingChatBox() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const phone = '94771123456';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message || 'Hi baby 😘')}`;
    window.open(url, '_blank');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 w-[300px] sm:w-[320px] bg-[#1a1a1a] border border-[#ff3399] rounded-xl shadow-lg p-4 z-50 animate-slide-in">
      {/* ❌ Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-[#ff3399] hover:text-pink-400"
      >
        <FaTimes />
      </button>

      <div className="flex items-center gap-3 mb-3 pr-6">
        <img
          src="/girl.png"
          alt="Girl"
          className="w-12 h-12 rounded-full object-cover border-2 border-[#ff3399]"
        />
        <div className="text-sm text-white">
          <p>මම දැන් Free 😘</p>
          <p>Message එකක් දාන්න 💋</p>
        </div>
      </div>

      <div className="flex items-center bg-[#111] rounded-md overflow-hidden">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 text-sm bg-transparent text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-[#ff3399] hover:bg-pink-600 px-3 py-2 text-white text-sm"
        >
          <FaRocket />
        </button>
      </div>
    </div>
  );
}
