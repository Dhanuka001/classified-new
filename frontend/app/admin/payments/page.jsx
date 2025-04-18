'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiExternalLink } from 'react-icons/fi';
import Pagination from '../../components/Pagination';

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPayments = async (currentPage = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/payments`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
      });
      setPayments(res.data.payments);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      toast.error('Failed to load payments.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(page);
  }, [page]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ff3399] mb-6">Payments Management</h2>
      {loading ? (
        <p className="text-gray-400">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-400">No payments found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#333] text-gray-300">
                  <th className="p-3 text-sm">Order ID</th>
                  <th className="p-3 text-sm">Ad Title</th>
                  <th className="p-3 text-sm">User</th>
                  <th className="p-3 text-sm">Amount</th>
                  <th className="p-3 text-sm">Bank Slip</th>
                  <th className="p-3 text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-[#333] hover:bg-[#2a2a2a]">
                    <td className="p-3 text-sm">{payment.orderId}</td>
                    <td className="p-3 text-sm">{payment.adId?.title || 'N/A'}</td>
                    <td className="p-3 text-sm">{payment.userId?.username || 'N/A'}</td>
                    <td className="p-3 text-sm">LKR {payment.amount}</td>
                    <td className="p-3 text-sm">
                      <a
                        href={payment.bankSlip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ff3399] hover:underline flex items-center gap-1"
                      >
                        <FiExternalLink /> View
                      </a>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}
