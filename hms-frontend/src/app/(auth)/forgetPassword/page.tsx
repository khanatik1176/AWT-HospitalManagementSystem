'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/app/components/Button'
import docLogo from '../../../../public/Assets/Logo.png'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation' 
import Cookies from 'js-cookie'

const forgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/auth/findIdByEmail/${email}`);
      const id = response.data;

      const updateResponse = await axios.put(`http://localhost:4000/auth/forgetpassword/${id}`, { password: newPassword }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (updateResponse.status === 200) {
        alert('Password changed successfully');
        router.push('/login');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to change password');
    }
  }

  return (
    <>
      <div className="service-area h-screen bg-gray flex justify-center items-center">
        <div className='login-form-area bg-indigo-400 w-96 flex justify-center  rounded-2xl' style={{ height: '30rem' , width:'30rem' }}>
          <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className='login-img flex justify-center'>
              <Link href="/">  
                <Image src={docLogo} alt='logo' width={100} height={80} className='mt-5'></Image>
              </Link>
            </div>
            <label htmlFor="" className='pb-3 pt-3 text-center text-black text-2xl'>Forgot Password Form</label>
            <input 
              type="text" 
              placeholder="Email" 
              name='email'  
              className='w-72 h-10 rounded text-black bg-white mt-2 mb-5 pl-3'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="New Password" 
              name='newpassword'
              className='w-72 h-10 rounded text-black bg-white mb-2 pl-3'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              name='confirmpassword'
              className='w-72 h-10 rounded text-black bg-white mb-2 pl-3'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button
              type = "submit"
              title='Forget Password'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default forgetPassword;