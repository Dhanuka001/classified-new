'use client';
import { toast } from 'react-toastify';

export default function DeleteConfirmModal({ ad, onClose, onDelete }) {
  const token = localStorage.getItem('token');

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/${ad._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message || 'Ad deleted');
      onDelete(ad._id);
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-red-500 w-full max-w-sm text-white text-center">
        <h2 className="text-lg font-bold text-red-400 mb-3">🗑️ Confirm Deletion</h2>
        <p className="text-sm text-gray-300 mb-4">
          Are you sure you want to delete <span className="text-pink-400 font-medium">"{ad?.title}"</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800">
            Cancel
          </button>
          <button onClick={confirmDelete} className="px-4 py-2 border border-red-500 text-red-400 rounded hover:bg-red-600 hover:text-white transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
