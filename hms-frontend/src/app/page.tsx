import Logo from "../../public/Assets/SassLogo.png";

import Image from "next/image";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";



export default function Home() {
  return (
  <>
    <div className="home-area h-screen">
    <Navbar />

    <Hero/>

    <Footer />
    </div>
  </>

  );
}
