import React from 'react'
import Logo from "../../../public/Assets/SassLogo.jpg";
import Image from "next/image";
import Link from 'next/link';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='footer-area bg-indigo-400 h-70 flex justify-between pr-72'>

      <div className="footer-logo px-10 py-10">
        <Link href="/"> <Image src={Logo} height={150} width={150}></Image>
        </Link>


        <Link href="/"><p className="footer-text max-w-44 pt-5 text-black text-xl">DigiCraft</p></Link>
        <p className="footer-text max-w-44 py-2 text-white">Address: House-10, Road-12, Sector-13, Uttara, Dhaka</p>
      </div>

      <div className="footer-links py-16">
        <table className='text-center'>
          <tbody>
          <tr className='row flex justify-between gap-20 text-center'>
            <td className='data'><Link href="/" className='text-white hover:text-black transition-all' >Home</Link></td>
            <td className='data'><Link href="/aboutUs" className='text-white hover:text-black transition-all ' >About Us</Link></td>
            <td className='data'><Link href="/Services" className='text-white hover:text-black transition-all ' >Services</Link></td>
          </tr>
          <tr className='row flex justify-between gap-20 pt-10 '>
            <td className='data'><Link href="/Clients" className='text-white hover:text-black transition-all' >Clients</Link></td>
            <td className='data'><Link href="/Career" className='text-white hover:text-black transition-all ' >Career</Link></td>
            <td className='data'><Link href="/DoctorLists" className='text-white hover:text-black transition-all ' >Doctor  Lists</Link></td>
          </tr>

          <tr className='row flex justify-between gap-20 pt-10 '>
            <td className='data'><Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='text-white hover:text-black transition-all' ><CiFacebook 
            size={32}/></Link></td>
            <td className='data'><Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='text-white hover:text-black transition-all ' ><CiInstagram 
            size={32}/></Link></td>
            <td className='data'><Link href="tel: 01718964651" className='text-white hover:text-black transition-all ' ><FaPhone size={28}/>
</Link></td>
          </tr>
          </tbody>
        </table>

      </div>
      
    </div>
  )
}

export default Footer
