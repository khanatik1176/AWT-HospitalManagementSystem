'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const PatientList_Admin = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/admin/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/admin/patients/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await axios.get(`http://localhost:4000/admin/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    } catch (err: any) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleEdit = (email) => {
    router.push(`/dashboards/admin/adminId/patients/edit?id=${encodeURIComponent(email)}`);
  };

  const handleAddPatient = () => {
    router.push(`/dashboards/admin/adminId/patients/add`);
  };

  const filteredData = data.filter((patient) =>
    patient.patient_fullname.toLowerCase().includes(searchTerm.toLowerCase())
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
          placeholder="Search by full name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddPatient}
          className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center"
        >
          <Icon icon="bi:plus-circle" className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>
      <div className="p-10 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Full Name</th>
              <th className="py-2 px-4 bg-gray-200">Email</th>
              <th className="py-2 px-4 bg-gray-200">Date of Birth</th>
              <th className="py-2 px-4 bg-gray-200">Address</th>
              <th className="py-2 px-4 bg-gray-200">Phone Number</th>
              <th className="py-2 px-4 bg-gray-200">NID</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2 px-4 border-b">{patient.patient_fullname}</td>
                <td className="py-2 px-4 border-b">{patient.patient_email}</td>
                <td className="py-2 px-4 border-b">{patient.patient_date_of_birth}</td>
                <td className="py-2 px-4 border-b">{patient.patient_address}</td>
                <td className="py-2 px-4 border-b">{patient.patient_phone_number}</td>
                <td className="py-2 px-4 border-b">{patient.patient_NID}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button onClick={() => handleEdit(patient.id)} className="text-black-500 hover:text-black-700 mr-2">
                    <Icon icon="bi:pencil" className="w-5 h-5" />
                  </button>
                  <div className="border-r border-gray-300 h-full mx-2"></div>
                  <button onClick={() => handleDelete(patient.id)} className="text-red-500 hover:text-red-700">
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

export default PatientList_Admin;
