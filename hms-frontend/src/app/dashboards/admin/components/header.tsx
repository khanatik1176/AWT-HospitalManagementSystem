'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const header = () => {

  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  const email = Cookies.get('email');
  const token = Cookies.get('token'); 

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/admin/admins/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setData(result.data.adminFullName);
      console.log(result.data) // Use result.data.patient_fullname directly
      console.log(data); // Use result.data.patient_fullname directly
    } catch (err:any) {
      setError(err.response.data.message);
      console.error(err);
    }
  };

  fetchData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="header-main bg-gray-600 h-screen">
      <div className='bg-indigo-400 h-50'>
        <h1 className='text-black text-4xl p-10 font-bold'> Welcome {data}</h1>
      </div>
    </div>
  )
}

export default header;