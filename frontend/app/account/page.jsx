'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiEdit, FiTrash2, FiMapPin, FiEye, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import EditAdModal from '../components/EditAdModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function MyAccount() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized. Please log in.', { position: 'top-center' });
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAds(data);
        else toast.error(data.message || 'Failed to load ads.', { position: 'top-center' });
      })
      .catch(() => toast.error('Something went wrong.', { position: 'top-center' }))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updatedAd) => {
    setAds((prev) => prev.map((ad) => (ad._id === updatedAd._id ? updatedAd : ad)));
    setEditTarget(null);
  };

  const handleDelete = (id) => {
    setAds((prev) => prev.filter((ad) => ad._id !== id));
    setDeleteTarget(null);
  };

  // Construct image URL
  const getImageUrl = (image) => {
    if (!image) return '/no-image.jpg';
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
    return image.startsWith('http') ? image : `${baseUrl}/${image}`;
  };

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8 text-[#ff3399] flex items-center gap-2">
        <span>👤</span> My Dashboard
      </h1>

      <h2 className="text-lg font-bold mb-2 text-white">My Ads</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-center text-gray-400">No ads posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-[#1a1a1a] border-2 border-[#333] rounded-xl overflow-hidden shadow hover:shadow-pink-500/20 transition-all"
            >
              <div className="flex">
                <div className="w-40 h-44 relative">
                  <Image
                    src={getImageUrl(ad.image)}
                    alt={ad.title || 'Ad image'}
                    width={160}
                    height={130}
                    className="object-cover rounded-l-xl"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-300">{ad.title || 'Untitled'}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2">{ad.description || 'No description'}</p>
                    <div className="flex text-xs gap-4 mt-2 text-gray-400">
                      <span>
                        <FiMapPin size={12} className="inline" /> {ad.location || 'Unknown'}
                      </span>
                      <span className="font-semibold text-[#ff3399]">
                        <FiEye size={12} className="inline" /> {ad.views || 0} views
                      </span>
                    </div>
                    <div className="mt-1 text-xs">
                      Order ID: <span className="text-pink-400">{ad.orderId || 'N/A'}</span>
                      {ad.isPaid ? (
                        <span className="ml-3 text-green-400 flex items-center gap-1">
                          <FiCheckCircle size={12} /> Paid
                        </span>
                      ) : (
                        <span className="ml-3 text-yellow-400">Pending Payment</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setEditTarget(ad)}
                      className="p-2 border-2 border-pink-500 text-pink-400 rounded-full hover:bg-pink-500 hover:text-white transition"
                      title="Edit Ad"
                      aria-label="Edit ad"
                    >
                      <FiEdit className="text-pink-500" size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(ad)}
                      className="p-2 border-2 border-red-600 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition"
                      title="Delete Ad"
                      aria-label="Delete ad"
                    >
                      <FiTrash2 className="text-red-600" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editTarget && (
        <EditAdModal ad={editTarget} onClose={() => setEditTarget(null)} onUpdate={handleUpdate} />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          ad={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}