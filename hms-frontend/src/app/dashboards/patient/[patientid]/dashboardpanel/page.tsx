'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const DashboardPanel = () => {

  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  const email = Cookies.get('email');
  const token = Cookies.get('token'); 

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/user/find/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setData(result.data[0].patient_fullname);
      console.log(result.data) // Use result.data.patient_fullname directly
      console.log(data); // Use result.data.patient_fullname directly
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
    }
  };

  fetchData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-main bg-gray-600 h-screen">
      <div className='bg-indigo-400 h-52'>
        <h1 className='text-black text-4xl p-10 font-bold'> Welcome {data}</h1> {/* Use data state variable */}
      </div>
    </div>
  )
}

export default DashboardPanel;