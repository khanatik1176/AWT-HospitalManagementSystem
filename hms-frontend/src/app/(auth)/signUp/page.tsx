"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/app/components/Button';
import docLogo from '../../../../public/Assets/Logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  patient_fullname: string;
  patient_email: string;
  patient_date_of_birth: string;
  patient_address: string;
  patient_phone_number: string;
  patient_NID: string;
  patient_password: string;
  patient_cpassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    patient_fullname: '',
    patient_email: '',
    patient_date_of_birth: '',
    patient_address: '',
    patient_phone_number: '',
    patient_NID: '',
    patient_password: '',
    patient_cpassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validation(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:4000/auth/signUp', formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        toast.success('Signup successful!');
        router.push('/login');
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validation = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};
  
    if(!formData.patient_fullname) {
      errors.patient_fullname = 'Fullname should not be empty';
    } else if (formData.patient_fullname.length < 3 || formData.patient_fullname.length > 30) {
      errors.patient_fullname = 'Fullname must be between 3 to 30 characters';
    } else if (!/^[A-Za-z .]+$/.test(formData.patient_fullname)) {
      errors.patient_fullname = 'Fullname can only contain letters, spaces, and periods';
    }
  
    if(!formData.patient_email) {
      errors.patient_email = 'Email should not be empty';
    } else if (!/\S+@\S+\.\S+/.test(formData.patient_email)) {
      errors.patient_email = 'Invalid email address';
    }
  
    if(!formData.patient_date_of_birth) {
      errors.patient_date_of_birth = 'Date of Birth should not be empty';
    }
  
    if(!formData.patient_address) {
      errors.patient_address = 'Address should not be empty';
    }
  
    if(!formData.patient_phone_number) {
      errors.patient_phone_number = 'Phone Number should not be empty';
    } else if (formData.patient_phone_number.length !== 11) {
      errors.patient_phone_number = 'Phone number must be 11 characters';
    }
  
    if(!formData.patient_NID) {
      errors.patient_NID= 'NID Number should not be empty';
    } else if (formData.patient_NID.length !== 10) {
      errors.patient_NID = 'NID must be 10 characters';
    }
  
    if(!formData.patient_password) {
      errors.patient_password = 'Password should not be empty';
    } else if(formData.patient_password.length < 8 || formData.patient_password.length > 20) {
      errors.patient_password = 'Password must be between 8 to 20 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(formData.patient_password)) {
      errors.patient_password = 'Password must contain uppercase & numbers';
    }
    
    if(formData.patient_password !== formData.patient_cpassword) {
      errors.patient_cpassword = 'Password does not match';
    }
  
    return errors;
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <Toaster />
      <div className="service-area h-screen bg-gray flex justify-center items-center">
        <div className="login-form-area bg-indigo-400 flex justify-center rounded-2xl" style={{ height: '54rem', width: '36rem' }}>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="login-img flex justify-center">
              <Link href="/">
                  <Image src={docLogo} alt="logo" width={80} height={80} className="mt-5" />
              </Link>
            </div>
            <label htmlFor="" className="pb-3 pt-3 text-center text-black text-3xl">
              Sign Up Form
            </label>
            <input type="text" placeholder="Full Name" name="patient_fullname" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_fullname} />
            {errors.patient_fullname && <p className="text-red-500 text-xs italic">{errors.patient_fullname}</p>}
            <input type="text" placeholder="Email" name="patient_email" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_email} />
            {errors.patient_email && <p className="text-red-500 text-xs italic">{errors.patient_email}</p>}
            <input type="date" placeholder="DOB" name="patient_date_of_birth" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_date_of_birth} />
            {errors.patient_date_of_birth && <p className="text-red-500 text-xs italic">{errors.patient_date_of_birth}</p>}
            <input type="text" placeholder="Address" name="patient_address" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_address} />
            {errors.patient_address && <p className="text-red-500 text-xs italic">{errors.patient_address}</p>}
            <input type="text" placeholder="phone number" name="patient_phone_number" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_phone_number} />
            {errors.patient_phone_number && <p className="text-red-500 text-xs italic">{errors.patient_phone_number}</p>}
            <input type="text" placeholder="NID Number" name="patient_NID" className="w-72 h-10 rounded text-black bg-white mb-5 pl-3" onChange={handleInputChange} value={formData.patient_NID} />
            {errors.patient_NID && <p className="text-red-500 text-xs italic">{errors.patient_NID}</p>}
            <input type="password" placeholder="Password" name="patient_password" className="w-72 h-10 rounded text-black bg-white mb-2 pl-3" onChange={handleInputChange} value={formData.patient_password} />
            {errors.patient_password && <p className="text-red-500 text-xs italic">{errors.patient_password}</p>}
            <input type="password" placeholder="Confirm Password" name="patient_cpassword" className="w-72 h-10 rounded text-black bg-white mb-2 pl-3 mt-2 mb-1" onChange={handleInputChange} value={formData.patient_cpassword} />
            {errors.patient_cpassword && <p className="text-red-500 text-xs italic">{errors.patient_cpassword}</p>}
            <Link href="/login" className="text-center text-white hover:text-black mt-2">Already Have An Account??
            </Link>
            <Button type="submit" title="Sign Up" />
          </form>
        </div>
      </div>
    </>
  );
}