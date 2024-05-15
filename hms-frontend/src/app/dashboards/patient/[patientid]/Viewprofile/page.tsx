'use client'
import React from 'react'

import Image from 'next/image'

import Avatar from '../.../../../../../../../public/Assets/profle-avatar.jpg'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useState } from 'react'


const Profilepage = () => {

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [DateofBirth, setDateofBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nid, setNID] = useState('');
  const [error, setError] = useState(null);

  const cookie_email = Cookies.get('email');
  const token = Cookies.get('token'); 

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/user/find/${cookie_email}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setFullname(result.data[0].patient_fullname);
      setEmail(result.data[0].patient_email);
      setDateofBirth(result.data[0].patient_date_of_birth);
      setAddress(result.data[0].patient_address);
      setPhoneNumber(result.data[0].patient_phone_number);
      setNID(result.data[0].patient_NID);
      console.log(result.data)

      console.log(result.data) // Use result.data.patient_fullname directly
      console.log(data); // Use result.data.patient_fullname directly
    } catch (err) {
      setError(err.response);
      console.error(err);
    }
  };

  fetchData();

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div className='profile-area bg-gray-600 h-screen'>
      <div className="profile-title bg-indigo-400"><p className='text-4xl text-black p-14 font-bold '>Profile</p></div>
      <div className="profile-header bg-indigo-400 h-2/6">
      <div className="flex justify-center h-32">
      <div className="w-52 h-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 overflow-hidden mb-5 ">
        <Image src={Avatar} className='w-full h-full object-cover' />
      </div>
      </div>
      </div>

  <div className='Information-area'>

  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='bg-black text-white text-center'>
        <th></th>
        <th >Patinet Name</th>
        <th>Patient Email</th>
        <th>Patient Date of Birth</th>
        <th>Patient Address</th>
        <th>Patient Phone Number</th>
        <th>Patient NID Number</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="hover:bg-blue-600 bg-indigo-400 text-black h-24 text-center">
        <th></th>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{DateofBirth}</td>
        <td>{address}</td>
        <td>{phoneNumber}</td>
        <td>{nid}</td>
      </tr>
    </tbody>
  </table>
</div>


      </div>
     
    </div>
  )
}

export default Profilepage
