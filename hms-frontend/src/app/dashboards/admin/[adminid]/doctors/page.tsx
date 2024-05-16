'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const DoctorList_Admin = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/admin/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(result.data);
      } catch (err:any) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:4000/admin/doctors/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await axios.get(`http://localhost:4000/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(result.data);
    } catch (err:any) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleEdit = (email) => {
    router.push(`/dashboards/admin/adminId/doctors/edit?email=${encodeURIComponent(email)}`);
  };

  const handleAddDoctor = () => {
    router.push(`/dashboards/admin/adminId/doctors/add`);
  };

  const filteredData = data.filter((doctor) =>
    doctor.doctorFullName.toLowerCase().includes(searchTerm.toLowerCase())
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
          onClick={handleAddDoctor}
          className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center"
        >
          <Icon icon="bi:plus-circle" className="w-5 h-5 mr-2" />
          Add Doctor
        </button>
      </div>
      <div className="p-10 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">ID</th>
              <th className="py-2 px-4 bg-gray-200">Full Name</th>
              <th className="py-2 px-4 bg-gray-200">Email</th>
              <th className="py-2 px-4 bg-gray-200">Date of Birth</th>
              <th className="py-2 px-4 bg-gray-200">Address</th>
              <th className="py-2 px-4 bg-gray-200">Phone Number</th>
              <th className="py-2 px-4 bg-gray-200">NID</th>
              <th className="py-2 px-4 bg-gray-200">BMDC No</th>
              <th className="py-2 px-4 bg-gray-200">Speciality</th>
              <th className="py-2 px-4 bg-gray-200">Available Day</th>
              <th className="py-2 px-4 bg-gray-200">Starting Time</th>
              <th className="py-2 px-4 bg-gray-200">Ending Time</th>
              <th className="py-2 px-4 bg-gray-200">Commission</th>
              <th className="py-2 px-4 bg-gray-200">Fee</th>
              <th className="py-2 px-4 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((doctor) => (
              <tr key={doctor.id}>
                <td className="py-2 px-4 border-b">{doctor.id}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorFullName}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorEmail}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorDateOfBirth}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorAddress}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorPhoneNumber}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorNID}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorBMDCNo}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorSpeciality}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorAvailableDay}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorStartingTime}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorEndingTime}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorCommission}</td>
                <td className="py-2 px-4 border-b">{doctor.doctorFee}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button onClick={() => handleEdit(doctor.doctorEmail)} className="text-black-500 hover:text-black-700 mr-2">
                    <Icon icon="bi:pencil" className="w-5 h-5" />
                  </button>
                  <div className="border-r border-gray-300 h-full mx-2"></div>
                  <button onClick={() => handleDelete(doctor.doctorEmail)} className="text-red-500 hover:text-red-700">
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

export default DoctorList_Admin;
