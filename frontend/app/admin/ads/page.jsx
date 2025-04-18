'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import Pagination from '../../components/Pagination';

export default function AdManagement() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'approved'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAdsByStatus(activeTab === 'pending' ? false : true, page);
  }, [activeTab, page]);

  const fetchAdsByStatus = async (isApproved, currentPage) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found.');

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/ads/pending`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { isApproved, page: currentPage },
      });

      if (!Array.isArray(res.data.ads)) {
        console.log('Expected ads array, got:', res.data);
        throw new Error('Invalid data format from server.');
      }

      setAds(res.data.ads);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error('Fetch ads error:', err);
      toast.error(err.message || 'Failed to load ads.', { position: 'top-center' });
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (adId, isApproved, promotion = 'normal') => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ads/${adId}/status`,
        { isApproved, promotion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message, { position: 'top-center' });
      setAds(ads.filter((ad) => ad._id !== adId));
    } catch (err) {
      toast.error('Failed to update status.', { position: 'top-center' });
    }
  };

  const handlePlacement = async (adId, page, position) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/ads/${adId}/placement`,
        { page, position },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message, { position: 'top-center' });
      setModal(null);
    } catch (err) {
      toast.error('Failed to update placement.', { position: 'top-center' });
    }
  };

  const handleDelete = async (adId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/ads/${adId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message, { position: 'top-center' });
      setAds(ads.filter((ad) => ad._id !== adId));
    } catch (err) {
      toast.error('Failed to delete ad.', { position: 'top-center' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ff3399] mb-4">Ads Management</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab('pending');
            setPage(1);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === 'pending' ? 'bg-[#ff3399] text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Pending Ads
        </button>
        <button
          onClick={() => {
            setActiveTab('approved');
            setPage(1);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === 'approved' ? 'bg-[#ff3399] text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Approved Ads
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="text-gray-400">No {activeTab} ads.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            {/* Table */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#333] text-gray-300">
                  <th className="p-3 text-sm">Image</th>
                  <th className="p-3 text-sm">Title</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">User</th>
                  <th className="p-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad._id} className="border-b border-[#333] hover:bg-[#2a2a2a]">
                    <td className="p-3">
                      <img
                        src={ad.image || '/no-image.jpg'}
                        alt={ad.title}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                    </td>
                    <td className="p-3 text-sm">{ad.title}</td>
                    <td className="p-3 text-sm">
                      {ad.category
                        .replace('live-cam', 'Live Cam')
                        .replace('girls-personal', 'Girls Personal')
                        .replace('spa', 'Spa')
                        .replace('shemale', 'Shemale')}
                    </td>
                    <td className="p-3 text-sm">{ad.createdBy?.username || 'Unknown'}</td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      {activeTab === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatus(ad._id, true)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors text-xs sm:text-sm"
                          >
                            <FiCheck className="inline mr-1" /> Approve
                          </button>
                          <button
                            onClick={() => handleStatus(ad._id, false)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors text-xs sm:text-sm"
                          >
                            <FiX className="inline mr-1" /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAd(ad);
                          setModal('placement');
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                      >
                        <FiEdit className="inline mr-1" /> Placement
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                      >
                        <FiTrash2 className="inline mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {/* Placement Modal */}
      {modal === 'placement' && selectedAd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold text-[#ff3399] mb-4">Set Ad Placement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Page</label>
                <select
                  id="page"
                  className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded p-2"
                  defaultValue={selectedAd.page}
                  onChange={(e) => (selectedAd.page = e.target.value)}
                >
                  <option value="home">Home</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Position</label>
                <select
                  id="position"
                  className="w-full bg-[#0d0d0d] border border-[#333] text-white rounded p-2"
                  defaultValue={selectedAd.position}
                  onChange={(e) => (selectedAd.position = e.target.value)}
                >
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setModal(null)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePlacement(selectedAd._id, selectedAd.page, selectedAd.position)}
                className="bg-[#ff3399] text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
