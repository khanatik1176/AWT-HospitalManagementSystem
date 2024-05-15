import React from 'react'

import Button from './Button'

import Image from 'next/image'

import HeroImage from '../../../public/Assets/hero.jpg'

const Hero = () => {
  return (
    <div className='Hero-area flex justify-between bg-black'>

        <div className="hero-text-area h-screen">
            <div className="hero-text-area">
            <h1 className="hero-text text-5xl pt-52 pl-16 text-white">
                <span className='text-indigo-400 font-bold '>DigiCraft:</span> Customized Solutions for Your Business
            </h1>
            
            <div className="hero-btn pt-20 pl-16">
            <Button
            type = "button"
            title = "Login"/>
            
            </div>
            
            </div>
            </div>

            <div className="hero-img-area">
                <Image src={HeroImage} alt='image' width={3400} height={1200}className=''></Image>
            </div>
       
      
    </div>
  )
}

export default Hero
