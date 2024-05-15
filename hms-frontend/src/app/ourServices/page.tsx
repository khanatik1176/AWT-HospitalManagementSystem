import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const page = () => {
  return (
    <>
    <div className="service-area h-screen">
        <Navbar />
    <div className='services-text-area  p-10  bg-black'>
      <section className='first'>
        <h1 className='text-4xl text-center pb-2 text-indigo-400 font-bold' >Our Services</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white'>At DigiCraft, we offer a comprehensive range of services designed to elevate your digital presence and drive success in the ever-evolving online landscape. From concept to execution, we're here to support you at every step of your journey.</article>
      </section>

      <section className='second'>
        <h1 className='text-4xl text-center pb-2 pt-5 text-indigo-400 font-bold'>Custom SaaS Development</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white'>Harness the power of custom Software as a Service (SaaS) solutions tailored to your specific requirements. Our expert developers will work closely with you to understand your business objectives and create a scalable, feature-rich SaaS platform that aligns perfectly with your needs.</article>
      </section>

      <section className='third'>
        <h1 className='text-4xl text-center pb-2 pt-5 text-indigo-400 font-bold'>Website Design and Development</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white'>Make a lasting impression with a stunning, user-friendly website crafted to captivate your audience and drive conversions. Our team of designers and developers specializes in creating visually compelling websites optimized for performance across all devices.</article>
      </section>

        <section className='forth'>
        <h1 className='text-4xl text-center pb-2 pt-5 text-indigo-400 font-bold'>UI/UX Design</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white pb-5'> Deliver an exceptional user experience with our expert UI/UX design services. Whether you're building a new SaaS platform or revamping an existing website, our designers will create intuitive, visually engaging interfaces that keep users coming back for more.</article>
        </section>

      <section className='fivth'>
        <h1 className='text-4xl text-center pb-2 pt-5 text-indigo-400 font-bold'>API Integration</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white'>Streamline workflows and enhance functionality with seamless API integration. Our developers have extensive experience integrating third-party APIs into SaaS applications, enabling you to leverage the full power of external services while maintaining smooth interoperability.</article>
      </section>
      <section className='fivth'>
        <h1 className='text-4xl text-center pb-2 pt-5 text-indigo-400 font-bold'>Maintenance and Support</h1>
        <article className='text-xl text-center pl-96 pr-96 text-white'>Stay ahead of the curve with our comprehensive maintenance and support services. From regular updates and security patches to troubleshooting and technical assistance, our dedicated support team is here to ensure your SaaS website remains operational and optimized at all times.</article>
      </section>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default page
