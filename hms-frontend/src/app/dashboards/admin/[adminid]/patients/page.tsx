'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation';


const DoctorList_Admin = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const email = Cookies.get('email');
  const token = Cookies.get('token'); 

  const router = useRouter();

  const url = window.location.pathname;
const parts = url.split('/');
const adminId = parts[3];

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/admin/patients`, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });
        setData(result.data);
        console.log(result.data); // Log the fetched data
      } catch (err:any) {
        setError(err.response.data.message);
        console.error(err);
      }
    };

    fetchData();
  }, [token]); // Add token as a dependency to useEffect

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (email:string) => {
    try {
      await axios.delete(`http://localhost:4000/admin/doctors/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Refresh data after deletion
      const result = await axios.get(`http://localhost:4000/admin/doctors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(result.data);
    } catch (err:any) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleEdit = (email:string) => {
    // Redirect to edit page with query parameter email
    router.push(`/dashboards/admin/${adminId}/doctors/edit?email=${encodeURIComponent(email)}`);
  };
  

  const filteredData = data.filter((doctor: any) =>
    doctor.doctorFullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
      <div className='bg-indigo-400 h-52'>
        <h1 className='text-black text-4xl p-10 font-bold'> Welcome Admin</h1>
        <input
          type="text"
          placeholder="Search by full name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
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
            {filteredData.map((doctor:any) => (
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
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEdit(doctor.doctorEmail)} className="mr-2">Edit</button>
                  <button onClick={() => handleDelete(doctor.doctorEmail)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorList_Admin;
