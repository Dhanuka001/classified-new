'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function EditAdModal({ ad, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...ad });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/${ad._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Ad updated successfully');
      onUpdate(data);
    } catch (err) {
      toast.error(err.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-pink-500 w-full max-w-lg text-white">
        <h2 className="text-xl font-bold text-pink-400 mb-4">✏️ Edit Ad</h2>

        <div className="mb-3">
          <label className="text-sm text-gray-300 block mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="input w-full px-3 py-2 rounded bg-[#0d0d0d] border border-pink-500 outline-none" />
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-300 block mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input w-full px-3 py-2 rounded bg-[#0d0d0d] border border-pink-500 outline-none" />
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-300 block mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="input w-full px-3 py-2 rounded bg-[#0d0d0d] border border-pink-500 outline-none" />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 border border-pink-500 text-pink-400 rounded hover:bg-pink-500 hover:text-white transition">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
