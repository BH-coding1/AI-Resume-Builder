import Image from "next/image";
import { Hero } from "@/components/Hero";
import Features from "@/components/featuresSection";
import HowItWorks from "@/components/howItWorksSection";
import Pricing from "@/components/pricingsection";
import FAQ from "@/components/faqSection";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      
      <Hero />
      <HowItWorks/>
      <Features/>
      <Pricing />
      <FAQ/>
      <Footer/>
    </div>
  );
}
