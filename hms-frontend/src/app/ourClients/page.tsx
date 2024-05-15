import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

import PrimeBank from '../../../public/Assets/client-1.jpg'
import TenMin from '../../../public/Assets/client2.png'
import Gp from '../../../public/Assets/client3.png'
import Sq from '../../../public/Assets/client4.png'

const page = () => {
  return (
    <>
    <div className="service-area h-screen">
        <Navbar />
        <div className="client-area bg-black">
            <div className="client-text-area">
                <h1 className="client-text text-5xl pt-20 pl-10 pb-20 text-white">
                    <span className='text-indigo-400 font-bold '>Our Clients:</span> Trusted by the Best
                </h1>
                
            </div>

            <div className="client-images-area flex gap-10">
              <div className="client-1 flex flex-col items-center">
                <Image src={PrimeBank} height={150} width={150} className='pb-5 '></Image>
                <p className="client-1-text text-white text-justify pb-5 pl-5 pr-5">
                  
                    Prime Bank Limited is one of the leading private commercial banks in Bangladesh, committed to delivering innovative financial solutions and exceptional customer service. Established in 1995, Prime Bank has rapidly grown its presence and reputation, offering a wide range of banking products and services to individuals, businesses, and corporate clients. With a focus on technological innovation, Prime Bank continues to adapt and evolve to meet the changing needs of its customers, while upholding the highest standards of integrity, transparency, and professionalism in all its operations.
                </p>
                </div>
                <div className="client-2 flex flex-col items-center">
                <Image src={TenMin} height={200} width={220} className='pb-5'></Image>
                <p className="client-2-text text-white  text-justify pb-5 pl-5 pr-5">
                  
                    
                  Robi 10 Minute School is a pioneering educational platform in Bangladesh, revolutionizing traditional learning methods through digital innovation. Launched by Robi Axiata Limited, one of the leading telecommunications companies in the country, Robi 10 Minute School offers a diverse range of high-quality educational content accessible to students of all ages and backgrounds. Through its user-friendly website and mobile app, Robi 10 Minute School provides engaging video tutorials, interactive quizzes, and comprehensive study materials covering various subjects, including mathematics, science, English, and exam preparation. With a mission to democratize education and empower learners nationwide, Robi 10 Minute School is reshaping the educational landscape in Bangladesh, fostering a culture of lifelong learning and academic excellence.
                </p>
                </div>

                <div className="client-3 flex flex-col items-center">
                <Image src={Gp} height={150} width={270} className='pb-5'></Image>
                <p className="client-3-text text-white  text-justify pb-5 pl-5 pr-5">
                  
                    
Grameenphone, often abbreviated as GP, stands as the largest telecommunications service provider in Bangladesh. Established in 1997, Grameenphone has been at the forefront of revolutionizing communication in the country, connecting millions of people nationwide through its robust mobile network infrastructure. As a subsidiary of Telenor Group, one of the world's major mobile operators, Grameenphone has consistently focused on innovation and technological advancement to offer a wide range of services, including voice calls, messaging, internet connectivity, and mobile financial solutions. Beyond its core telecommunications services, Grameenphone has also been actively involved in various corporate social responsibility initiatives, aiming to empower communities and contribute to socio-economic development across Bangladesh. With a commitment to excellence and a dedication to serving its customers, Grameenphone continues to play a pivotal role in shaping the digital landscape and driving connectivity in Bangladesh.
                </p>
                </div>
                <div className="client-4 flex flex-col items-center">
                <Image src={Sq} height={150} width={150} className='pb-5'></Image>
                <p className="client-4-text text-white  text-justify pb-5 pl-5 pr-5">
                  
                    
Square Hospitals Limited is a renowned name in the healthcare industry of Bangladesh, known for its commitment to excellence in patient care and medical services. Established in 2006, Square Hospitals has quickly emerged as one of the leading multidisciplinary tertiary care hospitals in the country. Located in Dhaka, the capital city, Square Hospitals boasts state-of-the-art facilities, cutting-edge medical technology, and a team of highly skilled healthcare professionals dedicated to providing world-class treatment and compassionate care to patients. With a wide range of specialties and subspecialties, including cardiology, oncology, neurology, and orthopedics, Square Hospitals caters to the healthcare needs of individuals across all age groups, offering comprehensive medical solutions and personalized treatment plans. Committed to upholding the highest standards of quality, safety, and ethical practices, Square Hospitals continues to set benchmarks in healthcare delivery and patient satisfaction in Bangladesh.
                </p>
                </div>
            </div>


        </div>
    <Footer />
    </div>
    </>
  )
}

export default page
