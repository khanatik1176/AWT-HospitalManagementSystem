import React from 'react'

import Logo from "../../../public/Assets/SassLogo.jpg";


import Image from "next/image";
import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
  return (

    <div className="nav-area container-fluid bg-indigo-400">
        <nav className="navbar px-6 py-5 flex justify-between">
            <div className="logo-area mx-10">
                <Link href="/"> <Image src={Logo} height={100} width={100} alt='logo'></Image>
                </Link>
                <Link href="/"><p className='company-name text-black h-18 pl-5 text-xl font-bold'>DigiCraft</p></Link>
            </div>

            <div className="nav-links py-10">
                <ul className="links flex gap-12 ">
                    <Link href="/" className='text-white hover:text-black transition-all ' >Home</Link>
                    <Link href="/aboutUs"className='text-white  hover:text-black transition-all '>About Us</Link>
                    <Link href="/ourServices" className='text-white  hover:text-black transition-all '>Services</Link>
                    <Link href="/ourClients" className='text-white  hover:text-black transition-all ' >Clients</Link>
                </ul>

            </div>

            <div className="nav-button mx-10 py-10 pr-10">
               <Button
               type = "button"
               title = "Login"
               />
            </div>
        </nav>
    </div>

  )
}

export default Navbar
