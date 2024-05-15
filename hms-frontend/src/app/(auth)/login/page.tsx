'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/app/components/Button'
import docLogo from '../../../../public/Assets/Logo.png'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import Cookies from 'js-cookie'

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [isloaded, setIsloaded] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5500/tenency-auth/signin', formData.email);
      console.log("Organization Name Received from Super Admin Backend: ", response);
      const organizationName = response.data;
      Cookies.set('organizationName', organizationName);
      console.log('organizationName:', Cookies.get('organizationName'));

      fetch('http://localhost:4000/auth/set-database', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ databaseName: organizationName }),
      });

      console.log(formData);

      if (response.data !== null) {
        const responseOrg = await axios.post('http://localhost:4000/auth/signin', formData);

        console.log(responseOrg.data);

        const  {token,user_data}  = responseOrg.data;
        const {id,email,role,password} = user_data;
        console.log(token);
        Cookies.set('token', token);
        Cookies.set('email', formData.email);
        Cookies.set('id', id);

        console.log('Token cookie:', Cookies.get('token'));
        console.log('Email cookie:', Cookies.get('email'));
        console.log('ID cookie:', Cookies.get('id'));


        if (document.getElementById('remember').checked) {
          sessionStorage.setItem('email', formData.email);
          sessionStorage.setItem('password', formData.password )
        } else {
          sessionStorage.removeItem('email');
        }

        toast.success('Sign in successful');
        router.push(`/dashboards/${role}/${id}/dashboardpanel`);
      }
      else {
        toast.error('Sign in failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Sign in failed. Please check your credentials.');
    }
  };

  //   try {
  //     const response = await axios.post('http://localhost:4000/auth/signin', formData);
  //     console.log(response.data);

  //     const  {token,user_data}  = response.data;
  //     const {id,email,role,password} = user_data;
  //     console.log(token);
  //     Cookies.set('token', token);
  //     Cookies.set('email', formData.email);
  //     Cookies.set('id', id);

  //     console.log('Token cookie:', Cookies.get('token'));
  //     console.log('Email cookie:', Cookies.get('email'));


  //     if (document.getElementById('remember').checked) {
  //       sessionStorage.setItem('email', formData.email);
  //       sessionStorage.setItem('password', formData.password )
  //     } else {
  //       sessionStorage.removeItem('email');
  //     }

  //     toast.success('Sign in successful');
  //     router.push(`/dashboards/${role}/${id}/dashboardpanel`);
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     toast.error('Sign in failed. Please check your credentials.');
  //   }
  // };

  useEffect(() => {
    setIsloaded(true);

    // If there's an email in sessionStorage, set it in the form data
    const rememberedEmail = sessionStorage.getItem('email');
    const rememberedPassword = sessionStorage.getItem('password');
    if (rememberedEmail) {
      setFormData(prevState => ({
        ...prevState,
        email: rememberedEmail,
        password: rememberedPassword
      }));
    }
  }, []);

  if (!isloaded) return null;

  return (
    <>
      <div className="service-area h-screen bg-gray flex justify-center items-center">
        <div className='login-form-area bg-indigo-400 w-96 flex justify-center rounded-2xl' style={{ height: '30rem' }}>
          <Toaster />
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='login-img flex justify-center'>
              <Link href="/">  
                <Image src={docLogo} alt='logo' width={80} height={80} className='mt-5'></Image>
              </Link>
            </div>
            <label htmlFor="" className='pb-3 pt-3 text-center text-black text-3xl'>Login Form</label>
            <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleChange} className='w-72 h-10 rounded text-black bg-white mb-5 pl-3'/>
            <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} className='w-72 h-10 rounded text-black bg-white mb-2 pl-3'/>
            <Link href='/forgetPassword' className='text-center text-white hover:text-black mt-2'>Forgot Password??</Link>
            <label htmlFor="remember" className='ml-1 text-white hover:text-black'  >
              <input type="checkbox" name="remember" id="remember" className='mr-2 mt-4' />
              Remember Me
            </label>
            <Button
              type = "submit"
              title='Log in'
            />
          </form>
        </div>
      </div>
    </>
  )
}