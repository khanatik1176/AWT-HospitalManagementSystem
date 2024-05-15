'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AdminProfile = () => {
  const [adminData, setAdminData] = useState('');
  const [error, setError] = useState(null);

  const token = Cookies.get('token');
  const email = Cookies.get('email');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/admin/admins/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAdminData(result.data);
      } catch (err:any) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchAdminData();
  }, [token, email]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container bg-gray-600 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5">Admin Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <div className="text-black">{adminData.adminFullName}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <div className="text-black">{adminData.adminEmail}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <div className="text-black">{adminData.adminDateOfBirth}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <div className="text-black">{adminData.adminAddress}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <div className="text-black">{adminData.adminPhoneNumber}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">NID</label>
          <div className="text-black">{adminData.adminNID}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <div className="text-black">{adminData.adminRole}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salary</label>
          <div className="text-black">{adminData.adminSalary}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;