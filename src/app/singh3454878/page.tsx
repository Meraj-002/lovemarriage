"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, WalletCards, ShieldCheck } from "lucide-react";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-[#f9dceb] px-5 py-2 text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
                Admin Dashboard
              </div>

              <h1 className="mt-5 text-[34px] font-extrabold tracking-[-0.03em] text-[#141b2d] sm:text-[42px]">
                Manage Your Website
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-7 text-[#6b7280]">
                Quickly manage profiles, payment settings, Telegram link, and prices from one place.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Link
                href="/singh3454878/add-profile9852"
                className="group rounded-[24px] border border-[#f1d6e4] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#f35aa5] to-[#b56ae8] text-white shadow-md">
                  <UserPlus size={26} />
                </div>

                <h2 className="mt-5 text-[24px] font-bold text-[#162033]">
                  Add Profile
                </h2>

                <p className="mt-2 text-[15px] leading-7 text-[#6b7280]">
                  Add a new profile with image, details, WhatsApp number, city,
                  profession, and membership type.
                </p>

                <div className="mt-5 inline-flex items-center text-sm font-bold text-[#ff2f92]">
                  Open Add Profile
                </div>
              </Link>

              <Link
                href="/singh3454878/payment-settings9852"
                className="group rounded-[24px] border border-[#f1d6e4] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-r from-[#f35aa5] to-[#b56ae8] text-white shadow-md">
                  <WalletCards size={26} />
                </div>

                <h2 className="mt-5 text-[24px] font-bold text-[#162033]">
                  Update Payment, Telegram & Prices
                </h2>

                <p className="mt-2 text-[15px] leading-7 text-[#6b7280]">
                  Change UPI ID, upload QR image, update Telegram link, and edit Silver, Gold, and Diamond plan prices.
                </p>

                <div className="mt-5 inline-flex items-center text-sm font-bold text-[#ff2f92]">
                  Open Settings
                </div>
              </Link>
            </div>

            <div className="mt-10 rounded-[20px] border border-[#d9f0df] bg-[#f3fcf6] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e] text-white">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h3 className="text-[18px] font-bold text-[#162033]">
                    Private Admin Area
                  </h3>
                  <p className="mt-1 text-[14px] leading-6 text-[#5b6474]">
                    Keep this admin link private. Later, you should protect this
                    page with admin login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}