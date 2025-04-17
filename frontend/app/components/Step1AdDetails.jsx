'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';

export default function Step1AdDetails({ data, onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const event = {
          target: {
            name: 'image',
            files: [file],
          },
        };
        onChange(event);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e);
    }
  };

  const handleDeleteImage = () => {
    const event = {
      target: {
        name: 'image',
        files: null,
        value: null,
      },
    };
    onChange(event);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const previewUrl = data.image ? URL.createObjectURL(data.image) : null;

  const categories = [
    { display: 'Live Cam', slug: 'live-cam' },
    { display: 'Girls Personal', slug: 'girls-personal' },
    { display: 'Spa', slug: 'spa' },
    { display: 'Shemale', slug: 'shemale' },
  ];

  return (
    <div className="space-y-6 bg-[#1a1a1a] p-4 sm:p-6 rounded-lg border border-[#333]">
      <h2 className="text-xl font-semibold text-[#ff3399]">
        📝 Ad Details / දැන්වීම් විස්තර
      </h2>

      {/* Category Selection */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Select Category / කාණ්ඩය තෝරන්න <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <label
              key={category.slug}
              className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors min-h-[80px] ${
                data.category === category.slug
                  ? 'border-pink-500 bg-pink-500/10'
                  : 'border-[#333] hover:bg-[#2a2a2a]'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={data.category === category.slug}
                onChange={onChange}
                className="hidden"
                required
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{category.display}</h3>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  data.category === category.slug
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-500'
                } flex items-center justify-center`}
              >
                {data.category === category.slug && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Ad Type Selection */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Select Ad Type / දැන්වීම් වර්ගය තෝරන්න <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors min-h-[120px] ${
              data.promotion === 'normal'
                ? 'border-green-500 bg-green-500/10'
                : 'border-[#333] hover:bg-[#2a2a2a]'
            }`}
          >
            <input
              type="radio"
              name="promotion"
              value="normal"
              checked={data.promotion === 'normal'}
              onChange={onChange}
              className="hidden"
              required
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">Normal Ad</h3>
              <p className="text-sm text-gray-400">Standard visibility</p>
              <p className="text-green-400 font-semibold">LKR 700</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                data.promotion === 'normal'
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-500'
              } flex items-center justify-center`}
            >
              {data.promotion === 'normal' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </label>

          <label
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors min-h-[120px] ${
              data.promotion === 'super'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-[#333] hover:bg-[#2a2a2a]'
            }`}
          >
            <input
              type="radio"
              name="promotion"
              value="super"
              checked={data.promotion === 'super'}
              onChange={onChange}
              className="hidden"
              required
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">Super Ad</h3>
              <p className="text-sm text-gray-400">Enhanced Visibility on 1st Page Top</p>
              <p className="text-blue-400 font-semibold">LKR 1200</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                data.promotion === 'super'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-500'
              } flex items-center justify-center`}
            >
              {data.promotion === 'super' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </label>

          <label
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors min-h-[120px] ${
              data.promotion === 'vip'
                ? 'border-yellow-400 bg-yellow-400/10'
                : 'border-[#333] hover:bg-[#2a2a2a]'
            }`}
          >
            <input
              type="radio"
              name="promotion"
              value="vip"
              checked={data.promotion === 'vip'}
              onChange={onChange}
              className="hidden"
              required
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">VIP Ad</h3>
              <p className="text-sm text-gray-400">Premium visibility In page Top Bigger</p>
              <p className="text-yellow-400 font-semibold">LKR 4500</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                data.promotion === 'vip'
                  ? 'border-yellow-400 bg-yellow-400'
                  : 'border-gray-500'
              } flex items-center justify-center`}
            >
              {data.promotion === 'vip' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </label>

          <label
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors min-h-[120px] ${
              data.promotion === 'chatbox'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-[#333] hover:bg-[#2a2a2a]'
            }`}
          >
            <input
              type="radio"
              name="promotion"
              value="chatbox"
              checked={data.promotion === 'chatbox'}
              onChange={onChange}
              className="hidden"
              required
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">Chatbox Ad</h3>
              <p className="text-sm text-gray-400">Maximum exposure</p>
              <p className="text-purple-400 font-semibold">LKR 10000</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                data.promotion === 'chatbox'
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-500'
              } flex items-center justify-center`}
            >
              {data.promotion === 'chatbox' && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="cashbackGuarantee"
            checked={data.cashbackGuarantee}
            onChange={onChange}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              data.cashbackGuarantee
                ? 'border-[#ff3399] bg-[#ff3399]'
                : 'border-gray-500'
            }`}
          >
            {data.cashbackGuarantee && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-300">
            Add Cashback Guarantee (+LKR 500)
          </span>
        </label>
        {data.cashbackGuarantee && (
          <p className="text-sm text-yellow-300 mt-2">
            🔄 You must refund the payment if you are unable to provide the advertised service. <br />
            ඔබ දැන්වීමේ සේවාව සැපයීමට නොහැකි වුවහොත් ගෙවීම ආපසු ගෙවිය යුතුය.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Ad Title / දැන්වීම් මාතෘකාව <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={data.title}
          onChange={onChange}
          placeholder="Enter ad title"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Description / විස්තරය <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={onChange}
          rows={4}
          placeholder="Describe your ad"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[120px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Location / ස්ථානය (Optional)
        </label>
        <input
          name="location"
          value={data.location}
          onChange={onChange}
          placeholder="Enter location"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[48px]"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Upload Image / රූපය උඩුගත කරන්න <span className="text-red-500">*</span>
        </label>
        <div
          className={`relative flex items-center justify-center w-full h-64 rounded-lg transition-colors ${
            data.image
              ? 'border-2 border-[#333] bg-[#0d0d0d]'
              : dragActive
              ? 'border-4 border-dashed border-pink-400 bg-[#2a2a2a]'
              : 'border-4 border-dashed border-[#333] bg-[#1a1a1a]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={data.image ? null : () => fileInputRef.current.click()}
        >
          {data.image ? (
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-auto max-w-full object-contain rounded-lg"
              />
              <button
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 p-1.5 bg-[#1a1a1a] rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Delete image"
              >
                <FaRegTrashAlt className="text-sm" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaArrowUp className="text-[#ff3399] text-3xl mb-2" />
              <p className="text-[#ff3399] text-center text-sm font-medium">
                Drag your image here or click to upload it
              </p>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            required
          />
        </div>
      </div>
    </div>
  );
}