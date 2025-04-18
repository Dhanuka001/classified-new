'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiX, FiEdit2 } from 'react-icons/fi';

export default function EditAdModal({ ad, onClose, onUpdate }) {
  const [title, setTitle] = useState(ad.title || '');
  const [description, setDescription] = useState(ad.description || '');
  const [location, setLocation] = useState(ad.location || '');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(ad.image);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('category', ad.category);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/${ad._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }

      toast.success('Ad updated successfully!', { position: 'top-center' });
      onUpdate(data.updatedAd);
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-lg rounded-lg p-6 text-white relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>
        <h2 className="text-xl font-bold text-[#ff3399] mb-4">Edit Ad</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Title</label>
            <input
              className="w-full p-2 bg-[#0d0d0d] border border-[#333] rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Description</label>
            <textarea
              className="w-full p-2 bg-[#0d0d0d] border border-[#333] rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Location</label>
            <input
              className="w-full p-2 bg-[#0d0d0d] border border-[#333] rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
        <label className="block text-sm text-gray-300">Category</label>
        <input
          className="w-full p-2 bg-[#0d0d0d] border border-[#333] rounded text-gray-400"
          value={ad.category || ''}
          disabled
        />
      </div>

          {/* Image preview and custom edit button */}
          <div className="relative text-center">
          {preview && (
            <img
              src={preview}
              alt="Ad preview"
              className="max-w-full max-h-60 mx-auto rounded border border-[#444] object-contain"
            />
          )}
          <button
            className="absolute top-2 right-4 bg-[#0d0d0d] p-2 border border-[#444] rounded-full hover:bg-pink-600 hover:text-white transition"
            onClick={() => fileInputRef.current.click()}
            title="Edit Image"
          >
            <FiEdit2 />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#ff3399] hover:bg-pink-600 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
