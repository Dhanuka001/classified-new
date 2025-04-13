'use client';
import { useEffect } from 'react';

export default function Step2ContactInfo({ data, onChange }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-4 bg-[#1a1a1a] p-4 sm:p-6 rounded-lg border border-[#333]">
      <h2 className="text-xl font-semibold text-[#ff3399]">
        📞 Contact Info / සම්බන්ධතා තොරතුරු
      </h2>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Phone Number / දුරකථන අංකය <span className="text-red-500">*</span>
        </label>
        <input
          name="phone"
          value={data.phone}
          onChange={onChange}
          placeholder="Enter phone number (e.g., +94712345678)"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          WhatsApp (Optional)
        </label>
        <input
          name="whatsapp"
          value={data.whatsapp}
          onChange={onChange}
          placeholder="Enter WhatsApp number"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Telegram (Optional)
        </label>
        <input
          name="telegram"
          value={data.telegram}
          onChange={onChange}
          placeholder="Enter Telegram handle"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
        />
      </div>
    </div>
  );
}