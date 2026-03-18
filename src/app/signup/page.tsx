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
  User,
  Phone,
  KeyRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const normalizePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10 ? digits : "";
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !phone || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (!agree) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("phone", normalizedPhone)
        .maybeSingle();

      if (existingUser) {
        setError("User already exists. Please login.");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            name: fullName.trim(),
            phone: normalizedPhone,
            password,
          },
        ])
        .select()
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Account created successfully. Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf7fb]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] lg:grid-cols-2">
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
                Start your beautiful journey today. Create your account and
                explore thousands of verified profiles for meaningful
                relationships.
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
                    Safe &amp; Secure Signup
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <Users size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium sm:text-[15px]">
                    Join 10,000+ Happy Members
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-[20px] border border-white/15 bg-white/10 p-4 backdrop-blur-[2px] sm:mt-10 sm:p-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/testimonials/anjali.jpg"
                    alt="Riya & Arjun"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50"
                  />

                  <div>
                    <h3 className="text-[15px] font-bold text-white sm:text-[16px]">
                      Riya &amp; Arjun
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
                  &quot;Joining Love Marriage was the best decision. The process
                  was simple, safe, and we found exactly what we were looking
                  for.&quot;
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#162033] sm:text-[40px]">
                Create Account
              </h2>

              <p className="mt-2 text-[15px] text-[#6b7280] sm:text-[16px]">
                Sign up to begin your journey to finding love
              </p>

              <form
                onSubmit={handleSignup}
                className="mt-8 space-y-5 sm:mt-10 sm:space-y-6"
              >
                {error && (
                  <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-[14px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                    {success}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Full Name
                  </label>
                  <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] bg-white px-4 text-[#9ca3af]">
                    <User size={18} />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Mobile Number
                  </label>
                  <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] bg-white px-4 text-[#9ca3af]">
                    <Phone size={18} />
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="Create your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Confirm Password
                  </label>
                  <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] bg-white px-4 text-[#9ca3af]">
                    <KeyRound size={18} />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 pt-1 text-sm text-[#4b5563]">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border border-gray-300 accent-pink-500"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="font-semibold text-[#ff4fa3] hover:text-[#ff2f92]"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="font-semibold text-[#ff4fa3] hover:text-[#ff2f92]"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[54px] w-full items-center justify-center rounded-[14px] bg-gradient-to-r from-[#f35aa5] to-[#b56ae8] text-base font-bold text-white shadow-[0_12px_30px_rgba(226,92,177,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Create Your Account"}
                </button>
              </form>

              <p className="mt-7 text-center text-[15px] text-[#4b5563] sm:mt-8 sm:text-[16px]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#ff4fa3] hover:text-[#ff2f92]"
                >
                  Login
                </Link>
              </p>

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-[13px] text-[#6b7280] sm:mt-8 sm:text-[14px]">
                <ShieldCheck size={16} className="text-[#22c55e]" />
                <span>Secure signup and privacy protected</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}