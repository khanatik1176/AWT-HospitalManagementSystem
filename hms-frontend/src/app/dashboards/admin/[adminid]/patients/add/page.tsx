'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const CreatePatientForm = () => {
  const [formData, setFormData] = useState({
    patient_fullname: '',
    patient_email: '',
    patient_date_of_birth: '',
    patient_address: '',
    patient_phone_number: '',
    patient_NID: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const token = Cookies.get('token');
  const router = useRouter(); // Get the router instance

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/admin/patients', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Patient created successfully!');
      setError(null);
      setTimeout(() => {
        router.push(`/dashboards/admin/adminId/patients`);
      }, 2000);
    } catch (err: any) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  return (
    <div className="form-container bg-gray-600 h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-5">Create Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="patient_fullname"
                value={formData.patient_fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="patient_email"
                value={formData.patient_email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="patient_date_of_birth"
                value={formData.patient_date_of_birth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="patient_address"
                value={formData.patient_address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="patient_phone_number"
                value={formData.patient_phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NID</label>
              <input
                type="text"
                name="patient_NID"
                value={formData.patient_NID}
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
              Create Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePatientForm;
