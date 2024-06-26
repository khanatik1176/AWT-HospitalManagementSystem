'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const NotificationList_Admin = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4000/notifications/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await axios.get('http://localhost:4000/notifications/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleAddNotification = () => {
    router.push(`/dashboards/admin/adminid/notifications/add`);
  };

  const filteredData = data.filter((notification) =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
      <div className="bg-indigo-400 h-52 flex items-center justify-between px-10">
        <h1 className="text-black text-4xl font-bold">Welcome Admin</h1>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddNotification}
          className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center"
        >
          <Icon icon="bi:plus-circle" className="w-5 h-5 mr-2" />
          Add Notification
        </button>
      </div>
      <div className="p-10 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">ID</th>
              <th className="py-2 px-4 bg-gray-200">Title</th>
              <th className="py-2 px-4 bg-gray-200">Message</th>
              <th className="py-2 px-4 bg-gray-200">Recipient Type</th>
              <th className="py-2 px-4 bg-gray-200">Created At</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((notification) => (
              <tr key={notification.id}>
                <td className="py-2 px-4 border-b">{notification.id}</td>
                <td className="py-2 px-4 border-b">{notification.title}</td>
                <td className="py-2 px-4 border-b">{notification.message}</td>
                <td className="py-2 px-4 border-b">{notification.recipientType}</td>
                <td className="py-2 px-4 border-b">{notification.createdAt}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button onClick={() => handleDelete(notification.id)} className="text-red-500 hover:text-red-700">
                    <Icon icon="bi:trash" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationList_Admin;
