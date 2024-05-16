'use client';
import React from 'react'
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    title: string;
}

const Button = ({type, title}: ButtonProps) => {
  if (title === "Login") {
    return (
      <Link href="/login">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-black flex">
        <FaUser className="mr-4 mt-1" />
          {title}
        </button>
      </Link>
    );
  }
  else if (title === "Log in") {
    return (
        <button type={type} className="px-8 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 hover:text-black mt-6">
          {title}
        </button>
    );
   } 
   else if (title === "Sign Up") {
    return (
      
        <button  type={type} className="px-8 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 hover:text-black mt-6 ">
          {title}
        </button>
    );
   }
   else if (title === "Forget Password") {
    return (
      
      
        <button  type={type} className="px-8 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 hover:text-black mt-6 ">
          {title}
        </button>
   )}
   else if (title === "Chat With AI") {
    return (
      <Link href= "./llm">
        <button  type={type} className="px-8 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 hover:text-black mt-6 ">
          {title}
        </button>
        </Link>
    );
   }
   else {
    return (
      <Link href="/">
        <button type={type} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-black">
          {title}
        </button>
      </Link>
    );
  }
}

export default Button;