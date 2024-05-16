'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AddNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipientDoctors, setRecipientDoctors] = useState(false);
  const [recipientPatients, setRecipientPatients] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = Cookies.get('token');

  const handleCheckboxChange = (setter) => {
    return (event) => {
      setter(event.target.checked);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let recipientType = '';
    if (recipientDoctors && recipientPatients) {
      recipientType = 'both';
    } else if (recipientDoctors) {
      recipientType = 'doctors';
    } else if (recipientPatients) {
      recipientType = 'patients';
    } else {
      setError('Please select at least one recipient type.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/notifications', {
        title,
        message,
        recipientType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/dashboards/admin/adminid/notifications');
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="dashboard-main bg-gray-600 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-4">Add Notification</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Recipient Type</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={recipientDoctors}
              onChange={handleCheckboxChange(setRecipientDoctors)}
              className="mr-2"
            />
            <label className="text-gray-700">Doctors</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={recipientPatients}
              onChange={handleCheckboxChange(setRecipientPatients)}
              className="mr-2"
            />
            <label className="text-gray-700">Patients</label>
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Notification
        </button>
      </form>
    </div>
  );
};

export default AddNotification;
