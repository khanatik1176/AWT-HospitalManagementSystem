import React from 'react'

import Image from 'next/image'

import Avatar from '../.../../../../../../../public/Assets/profle-avatar.jpg'


const Profilepage = () => {
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
        <th>Name</th>
        <th>Email</th>
        <th>Date of Birth</th>
        <th>Address</th>
        <th>Phone Number</th>
        <th>NID</th>
        <th>BMDC Number</th>
        <th>Speciality</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Working Days</th>
        <th>Commission</th>
        <th>Doctor Fees</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="hover:bg-white bg-indigo-400 text-black h-24 text-center">
        <th></th>
        <td>Dr. Amin Haque</td>
        <td>amin@alook.com</td>
        <td>2024/05/20</td>
        <td>183, Gulshan, Dhaka</td>
        <td>01711324567</td>
        <td>0987654321</td>
        <td>123456</td>
        <td>Cardiology</td>
        <td>10:00 AM</td>
        <td>6:00 PM</td>
        <td>Fri, Sat, Mon</td>
        <td>15%</td>
        <td>500</td>
      </tr>
    </tbody>
  </table>
</div>


      </div>
     
    </div>
  )
}

export default Profilepage
