'use client';
import { useState, useRef, useEffect } from 'react';
import {
  FaArrowUp,
  FaRegTrashAlt,
  FaCheck,
  FaCopy,
  FaFilePdf,
  FaWhatsapp,
  FaCreditCard,
} from 'react-icons/fa';

export default function Step3Payment({ data, onChange, orderId, onSubmit, submitting }) {
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        onChange({ target: { name: 'bankSlip', files: [file] } });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) onChange(e);
  };

  const handleDeleteFile = () => {
    onChange({ target: { name: 'bankSlip', files: null, value: null } });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const previewUrl = data.bankSlip?.type?.startsWith('image/')
    ? URL.createObjectURL(data.bankSlip)
    : null;

  const adTypeLabel =
    data.promotion === 'chatbox'
      ? 'Chatbox Ad'
      : data.promotion === 'vip'
      ? 'VIP Ad'
      : data.promotion === 'super'
      ? 'Super Ad'
      : 'Normal Ad';

  return (
    <div className="space-y-6 bg-[#1a1a1a] p-4 sm:p-6 rounded-lg shadow-lg border border-[#333] relative">
      <h2 className="text-xl font-bold text-[#ff3399]">
        💳 Payment Details / ගෙවීම් විස්තර
      </h2>

      {/* Bank Info */}
      <div className="bg-[#0d0d0d] p-4 rounded-lg border border-pink-500">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaCreditCard className="text-[#ff3399]" />
          Bank Account Details / බැංකු ගිණුම් විස්තර
        </h3>
        <div className="mt-2 text-sm text-gray-300 space-y-2">
          <p>
            <span className="font-medium text-[#ff3399]">Bank Name:</span>{' '}
            Commercial Bank
          </p>
          <p>
            <span className="font-medium text-[#ff3399]">Account Name:</span>{' '}
            Classified Ads Ltd.
          </p>
          <p>
            <span className="font-medium text-[#ff3399]">Account Number:</span>{' '}
            1234-5678-9012-3456
          </p>
          <p>
            <span className="font-medium text-[#ff3399]">Branch:</span> Colombo Main
            Branch
          </p>
          <p className="text-yellow-300">
            Please use the Order ID as the reference for your bank transfer.
          </p>
        </div>
      </div>

      {/* Order ID */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-yellow-300">
          Order ID:{' '}
          <span className="font-semibold text-green-400">
            {orderId || 'Generating...'}
          </span>
        </p>
        {orderId && (
          <button
            onClick={handleCopy}
            className="text-sm bg-pink-600 hover:bg-pink-500 px-3 py-1 rounded-md text-white flex items-center gap-2 min-h-[36px]"
          >
            {copied ? <FaCheck /> : <FaCopy />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      {/* Payment Amount */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Payment Amount / ගෙවීම් මුදල <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={`LKR ${data.amount} (${adTypeLabel}${
            data.cashbackGuarantee ? ' + Cashback Guarantee' : ''
          })`}
          readOnly
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 min-h-[48px]"
        />
        <p className="text-sm text-gray-300 mt-2">
          You have to pay LKR {data.amount} to post your ad. <br />
          ඔබේ දැන්වීම පළ කිරීම සඳහා ඔබ LKR {data.amount} ගෙවිය යුතුය.
        </p>
      </div>

      {/* Reference Note */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Reference Note / යොමු සටහන
        </label>
        <input
          name="referenceNote"
          value={data.referenceNote}
          onChange={onChange}
          placeholder="Enter reference note"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
        />
      </div>

      {/* Upload Bank Slip */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Upload Bank Slip / බැංකු ලදුපත උඩුගත කරන්න{' '}
          <span className="text-red-500">*</span>
        </label>
        <div
          className={`relative flex items-center justify-center w-full h-64 rounded-lg transition-colors ${
            data.bankSlip
              ? 'border-2 border-[#333] bg-[#0d0d0d]'
              : dragActive
              ? 'border-4 border-dashed border-pink-400 bg-[#2a2a2a]'
              : 'border-4 border-dashed border-[#333] bg-[#1a1a1a]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={data.bankSlip ? null : () => fileInputRef.current.click()}
        >
          {data.bankSlip ? (
            <div className="relative flex items-center justify-center w-full h-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Bank Slip Preview"
                  className="h-full w-auto max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FaFilePdf className="text-[#ff3399] text-6xl mb-2" />
                  <p className="text-gray-300 text-sm">{data.bankSlip.name}</p>
                </div>
              )}
              <button
                onClick={handleDeleteFile}
                className="absolute top-2 right-2 p-1.5 bg-[#1a1a1a] rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Delete bank slip"
              >
                <FaRegTrashAlt className="text-sm" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaArrowUp className="text-[#ff3399] text-3xl mb-2" />
              <p className="text-[#ff3399] text-center text-sm font-medium">
                Drag your file here or click to upload it
              </p>
            </div>
          )}
          <input
            type="file"
            name="bankSlip"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            required
          />
        </div>
      </div>

      {/* Notice */}
      <div className="text-sm text-gray-300 mt-3 bg-black/50 p-3 rounded">
        🔔 <strong>Important Notice:</strong> <br />
        ඔබ බැංකු ගෙවීම කරන විට ඉහත Order ID එක අනිවාරයෙන්ම{' '}
        <span className="text-green-400 font-semibold">Reference</span> විදියට
        යොදන්න.<br />
        💥 Use the <span className="text-green-400 font-semibold">Order ID</span> as
        the <span className="text-pink-400">reference</span> in your online
        transfer.<br />
        ✅ Once paid, your ad will be reviewed and approved by the admin.
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          disabled={submitting || !orderId}
          className={`mt-4 px-4 py-2 rounded text-white min-h-[48px] ${
            submitting || !orderId
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {submitting ? 'Redirecting...' : 'Submit Payment →'}
        </button>
      </div>

      {/* WhatsApp Help - Bottom Centered */}
      <div className="mt-8 flex flex-col items-center text-center">
        <p className="text-sm text-gray-300 mb-2">
          If you couldn’t post the ad, contact us on WhatsApp. <br />
          ඔබට දැන්වීම පළ කිරීමට නොහැකි වුවහොත්, WhatsApp හරහා අප හා සම්බන්ධ වන්න.
        </p>
        <a
          href="https://wa.me/1234567890" // Replace with your real number
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition w-full sm:w-auto min-h-[48px] justify-center"
        >
          <FaWhatsapp className="text-lg" />
          Message Us on WhatsApp
        </a>
      </div>
    </div>
  );
}