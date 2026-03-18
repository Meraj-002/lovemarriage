"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

type LocalUser = {
  id: string;
  name: string;
  phone: string;
  password?: string;
  created_at?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<LocalUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
      router.replace("/login");
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcfcfd]">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-lg font-semibold text-[#4b5563]">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) return null;

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