"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  Lock,
  Users,
  Mail,
  KeyRound,
  Facebook,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7fb]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] lg:grid-cols-2">
          {/* Left Panel */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#f0449f] via-[#ea66b0] to-[#b56ae8] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10 sm:h-36 sm:w-36" />
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 sm:h-36 sm:w-36" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:h-16 sm:w-16">
                <Heart
                  size={24}
                  className="fill-[#f0449f] text-[#f0449f] sm:h-7 sm:w-7"
                />
              </div>

              <h1 className="mt-6 text-[34px] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[42px]">
                Love Marriage
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-7 text-white/95 sm:text-[16px]">
                Where hearts connect and love stories begin. Join thousands of
                happy couples who found their perfect match.
              </p>

              <div className="mt-8 space-y-4 sm:mt-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <ShieldCheck size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium sm:text-[15px]">
                    100% Verified Profiles
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Lock size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium sm:text-[15px]">
                    Secure &amp; Private
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Users size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium sm:text-[15px]">
                    10,000+ Success Stories
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-[20px] border border-white/15 bg-white/10 p-4 backdrop-blur-[2px] sm:mt-10 sm:p-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/testimonials/anjali.jpg"
                    alt="Sarah & Michael"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50"
                  />

                  <div>
                    <h3 className="text-[15px] font-bold text-white sm:text-[16px]">
                      Sarah &amp; Michael
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[13px] text-yellow-300">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm italic leading-6 text-white/95 sm:text-[15px]">
                  &quot;We found our perfect match here. Thank you Love Marriage
                  for making our dreams come true!&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Right Panel */}
          <section className="bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#162033] sm:text-[40px]">
                Welcome Back
              </h2>

              <p className="mt-2 text-[15px] text-[#6b7280] sm:text-[16px]">
                Login to continue your journey to finding love
              </p>

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
              >
                {error && (
                  <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Email Address
                  </label>
                  <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] bg-white px-4 text-[#9ca3af]">
                    <Mail size={18} />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Password
                  </label>
                  <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] bg-white px-4 text-[#9ca3af]">
                    <KeyRound size={18} />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-sm text-[#4b5563]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border border-gray-300 accent-pink-500"
                    />
                    <span>Remember me</span>
                  </label>

                  <Link
                    href="#"
                    className="text-sm font-semibold text-[#ff4fa3] hover:text-[#ff2f92]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[54px] w-full items-center justify-center rounded-[14px] bg-gradient-to-r from-[#f35aa5] to-[#b56ae8] text-base font-bold text-white shadow-[0_12px_30px_rgba(226,92,177,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Logging in..." : "Login to Your Account"}
                </button>
              </form>

              <div className="mt-7 flex items-center gap-4 sm:mt-8">
                <div className="h-px flex-1 bg-[#eceef3]" />
                <span className="text-sm text-[#6b7280]">Or continue with</span>
                <div className="h-px flex-1 bg-[#eceef3]" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] border border-[#eceef3] bg-white text-sm font-semibold text-[#374151] transition hover:bg-gray-50"
                >
                  <span className="text-xl font-bold text-[#ea4335]">G</span>
                  Google
                </button>

                <button
                  type="button"
                  className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] border border-[#eceef3] bg-white text-sm font-semibold text-[#374151] transition hover:bg-gray-50"
                >
                  <Facebook size={18} className="fill-[#1877f2] text-[#1877f2]" />
                  Facebook
                </button>
              </div>

              <p className="mt-7 text-center text-[15px] text-[#4b5563] sm:mt-8 sm:text-[16px]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#ff4fa3] hover:text-[#ff2f92]"
                >
                  Sign Up
                </Link>
              </p>

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-[13px] text-[#6b7280] sm:mt-8 sm:text-[14px]">
                <ShieldCheck size={16} className="text-[#22c55e]" />
                <span>Secure login and privacy protected</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}