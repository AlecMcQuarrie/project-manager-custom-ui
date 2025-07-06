"use client";

import CTASection from "@/components/CTASection/CTASection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";


export default function Home() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <HeroSection setOpen={setOpen} />
      <FeaturesSection />
      <CTASection setOpen={setOpen} />
      <Footer />
    </>
  );
}
