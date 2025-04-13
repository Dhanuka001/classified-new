'use client';
import { useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';

export default function Step3Payment({ data, onChange, orderId, onSubmit, submitting }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  };

  return (
    <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#333]">
      <h2 className="text-xl font-bold text-[#ff3399]">
        💳 Payment Details / ගෙවීම් විස්තර
      </h2>

      <div className="flex items-center gap-3">
        <p className="text-sm text-yellow-300">
          Order ID: <span className="font-semibold text-green-400">{orderId}</span>
        </p>
        <button
          onClick={handleCopy}
          className="text-sm bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded-md text-white flex items-center gap-2"
        >
          {copied ? <FaCheck /> : <FaCopy />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Payment Amount / ගෙවීම් මුදල <span className="text-red-500">*</span>
        </label>
        <input
          name="amount"
          type="number"
          value={data.amount}
          onChange={onChange}
          placeholder="Enter payment amount (e.g., 1000)"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Reference Note / යොමු සටහන
        </label>
        <input
          name="referenceNote"
          value={data.referenceNote}
          onChange={onChange}
          placeholder="Enter reference note"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Upload Bank Slip / බැංකු ලදුපත උඩුගත කරන්න{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="bankSlip"
          accept="image/*,application/pdf"
          onChange={onChange}
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none"
          required
        />
        {data.bankSlip && (
          <p className="text-sm text-green-400 mt-1">
            ✅ File selected: {data.bankSlip.name}
          </p>
        )}
      </div>

      <div className="text-sm text-gray-300 mt-3 bg-black/50 p-3 rounded">
        🔔 <strong>Important Notice:</strong> <br />
        ඔබ බැංකු ගෙවීම කරන විට ඉහත Order ID එක අනිවාරයෙන්ම{' '}
        <span className="text-green-400 font-semibold">Reference</span> විදියට ඔබේ
        Banking App එකේ යොදන්න.<br />
        💥 Use the <span className="text-green-400 font-semibold">Order ID</span>{' '}
        above as the <span className="text-pink-400">reference</span> in your online
        bank transfer.<br />
        ✅ Once paid, your ad will be reviewed and approved by the admin.
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className={`mt-4 px-4 py-2 rounded text-white ${
            submitting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {submitting ? 'Redirecting...' : 'Submit Payment →'}
        </button>
      </div>
    </div>
  );
}