'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import { FaTrash, FaSearch, FaEye } from 'react-icons/fa';

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const reportsPerPage = 6;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/admin/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setReports(data || []);
        setFiltered(data || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSearch = () => {
    if (!searchId.trim()) {
      setFiltered(reports);
    } else {
      const filteredReports = reports.filter(r =>
        r.adId?._id?.toLowerCase().includes(searchId.toLowerCase())
      );
      setFiltered(filteredReports);
    }
    setCurrentPage(1);
  };

  const handleDeleteClick = (adId) => {
    setAdToDelete(adId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads/${adToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Ad deleted successfully.');
      const updated = filtered.filter((r) => r.adId._id !== adToDelete);
      setReports(updated);
      setFiltered(updated);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setShowDeleteModal(false);
      setAdToDelete(null);
    }
  };

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / reportsPerPage);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl font-bold text-pink-500 mb-6">Reported Ads Management</h1>

      {/* Search */}
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search by Ad ID..."
          className="bg-black border border-gray-700 px-4 py-2 rounded w-full max-w-md text-sm"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500 flex items-center gap-2"
        >
          <FaSearch /> Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading reports...</p>
      ) : currentReports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {currentReports.map((report, i) => (
            <div key={i} className="border border-gray-700 p-4 rounded bg-[#1a1a1a] shadow">
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold text-yellow-400">Ad ID:</span> {report.adId?._id}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                <span className="font-semibold text-pink-400">Title:</span> {report.adId?.title}
              </p>
              <p className="text-sm text-gray-300 italic mb-3">“{report.message}”</p>

              <div className="flex gap-3 mt-2">
                <a
                  href={`/ads/${report.adId?.category || 'view'}/${report.adId?.slug || report.adId?._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center gap-2"
                >
                  <FaEye /> View Ad
                </a>

                <button
                  onClick={() => handleDeleteClick(report.adId._id)}
                  className="px-4 py-2 text-sm bg-red-700 hover:bg-red-600 text-white rounded flex items-center gap-2"
                >
                  <FaTrash /> Delete Ad
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-red-500 p-6 rounded-lg max-w-sm w-full text-center">
            <h3 className="text-white text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this ad?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > reportsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
