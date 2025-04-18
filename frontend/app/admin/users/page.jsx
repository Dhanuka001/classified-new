"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUserCheck, FiUserX } from 'react-icons/fi';
import Pagination from '../../components/Pagination';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      toast.error('Failed to load users.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');

      let newStatus;
      if (currentStatus === 'active') newStatus = 'suspended';
      else if (currentStatus === 'suspended') newStatus = 'active';
      else return toast.warning('Only active/suspended users can be toggled.');

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message, { position: 'top-center' });

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      toast.error('Failed to update user status.', { position: 'top-center' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ff3399] mb-6">Users Management</h2>
      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#333] text-gray-300">
                  <th className="p-3 text-sm">Username</th>
                  <th className="p-3 text-sm">Email</th>
                  <th className="p-3 text-sm">Status</th>
                  <th className="p-3 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-[#333] hover:bg-[#2a2a2a]">
                    <td className="p-3 text-sm">{user.username}</td>
                    <td className="p-3 text-sm">{user.email}</td>
                    <td className="p-3 text-sm capitalize">
                      {user.status === 'active' && <span className="text-green-500">Active</span>}
                      {user.status === 'suspended' && <span className="text-yellow-400">Suspended</span>}
                      {user.status === 'pending' && <span className="text-blue-400">Pending</span>}
                      {user.status === 'banned' && <span className="text-red-500">Banned</span>}
                    </td>
                    <td className="p-3">
                      {['active', 'suspended'].includes(user.status) && (
                        <button
                          onClick={() => handleToggleStatus(user._id, user.status)}
                          className={`$ {
                            user.status === 'active'
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-green-500 hover:bg-green-600'
                          } text-white px-2 py-1 rounded transition-colors text-xs sm:text-sm`}
                        >
                          {user.status === 'active' ? (
                            <>
                              <FiUserX className="inline mr-1" /> Suspend
                            </>
                          ) : (
                            <>
                              <FiUserCheck className="inline mr-1" /> Activate
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
