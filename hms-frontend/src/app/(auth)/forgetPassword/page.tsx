import React from 'react'
import Image from 'next/image'
import Button from '@/app/components/Button'
import docLogo from '../../../../public/Assets/Logo.png'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <div className="service-area h-screen bg-gray flex justify-center items-center">
        <div className='login-form-area bg-indigo-400 w-96 flex justify-center  rounded-2xl' style={{ height: '30rem' , width:'30rem' }}>
         
          <form  className='flex flex-col items-center'>
            <div className='login-img flex justify-center'>
              <Link href="/">  
                <Image src={docLogo} alt='logo' width={100} height={80} className='mt-5'></Image>
              </Link>
            </div>
            <label htmlFor="" className='pb-3 pt-3 text-center text-black text-2xl'>Forgot Passowrd Form</label>
            <input type="text" placeholder="new password" name='newpass'  className='w-72 h-10 rounded text-black bg-white mt-2 mb-5 pl-3'/>
            <input type="password" placeholder="Password" name='password'className='w-72 h-10 rounded text-black bg-white mb-2 pl-3'/>
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

export default page
