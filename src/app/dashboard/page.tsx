"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CommitmentSection from "@/sections/CommitmentSection";
import CTASection from "@/sections/CTASection";
import FeaturedProfilesSection from "@/sections/FeaturedProfilesSection";
import HeroSection from "@/sections/HeroSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import PricingSection from "@/sections/PricingSection";
import StatsSection from "@/sections/StatsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import WhyChooseUsSection from "@/sections/WhyChooseUsSection";

export default function Dashboard() {
    const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserEmail(user.email || "");
    };

    checkUser();
  }, [router]);
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedProfilesSection />
      <PricingSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <CommitmentSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}