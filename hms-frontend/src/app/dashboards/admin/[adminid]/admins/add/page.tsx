'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    adminFullName: '',
    adminEmail: '',
    adminDateOfBirth: '',
    adminAddress: '',
    adminPhoneNumber: '',
    adminNID: '',
    adminRole: '',
    adminSalary: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const token = Cookies.get('token');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/admin/admins', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Admin created successfully!');
      setError(null);
      setTimeout(() => {
        router.push('/dashboards/admin/adminId/admins');
      }, 2000);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  return (
    <div className="form-container bg-gray-600 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-5">Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="adminFullName"
                value={formData.adminFullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="adminDateOfBirth"
                value={formData.adminDateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="adminAddress"
                value={formData.adminAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="adminPhoneNumber"
                value={formData.adminPhoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NID</label>
              <input
                type="text"
                name="adminNID"
                value={formData.adminNID}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="adminRole"
                value={formData.adminRole}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Salary ($)</label>
              <input
                type="number"
                step="0.01"
                name="adminSalary"
                value={formData.adminSalary}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;
