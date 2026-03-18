"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, UserCircle, Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

type LocalUser = {
  id: string;
  name: string;
  phone: string;
  password?: string;
  created_at?: string;
};

type PlanRelation = {
  id: number;
  name: string;
  rank: number;
};

type SubscriptionRow = {
  id: number;
  status: string;
  plan_id: number;
  plans: PlanRelation | PlanRelation[] | null;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<LocalUser | null>(null);
  const [activePlan, setActivePlan] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Profiles", href: "/profiles" },
    { name: "Plans", href: "/plans" },
    { name: "How it Works", href: "/howitworks" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const getPlanBadgeClass = (plan: string) => {
    const normalized = plan.toLowerCase();

    if (normalized === "diamond") {
      return "bg-gradient-to-r from-[#6d3df5] via-[#8b5cf6] to-[#b44cff] text-white";
    }

    if (normalized === "gold") {
      return "bg-gradient-to-r from-[#d79a00] via-[#f0b90b] to-[#ffd44d] text-white";
    }

    return "bg-gradient-to-r from-[#7d8597] via-[#98a2b3] to-[#c0c7d1] text-white";
  };

  const fetchActivePlan = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_subscriptions")
      .select(
        `
        id,
        status,
        plan_id,
        plans (
          id,
          name,
          rank
        )
      `
      )
      .eq("user_id", userId)
      .eq("status", "active")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      setActivePlan("");
      return;
    }

    const typedData = data as SubscriptionRow;
    const plan = Array.isArray(typedData.plans)
      ? typedData.plans[0]
      : typedData.plans;

    setActivePlan(plan?.name || "");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setUser(null);
      setActivePlan("");
      return;
    }

    try {
      const parsedUser: LocalUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.id) {
        fetchActivePlan(parsedUser.id);
      } else {
        setActivePlan("");
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
      setActivePlan("");
    }
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setActivePlan("");
    setMobileMenuOpen(false);
    router.push("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md sm:h-11 sm:w-11">
              <Heart size={18} fill="white" className="sm:h-5 sm:w-5" />
            </div>

            <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              Love Marriage
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-semibold transition ${
                    isActive
                      ? "text-pink-500"
                      : "text-gray-800 hover:text-pink-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex lg:gap-6">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={`font-semibold transition ${
                    pathname === "/login"
                      ? "text-pink-500"
                      : "text-gray-800 hover:text-pink-500"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-5 py-2.5 font-bold text-white shadow-md transition hover:scale-105 lg:px-6"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <UserCircle className="h-9 w-9 text-pink-500" />

                  {activePlan && (
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase shadow-md ${getPlanBadgeClass(
                        activePlan
                      )}`}
                    >
                      {activePlan}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-pink-400 px-4 py-1.5 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-pink-500 transition hover:bg-pink-50 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/45"
            onClick={closeMobileMenu}
          />

          <div className="absolute right-0 top-0 h-full w-[84%] max-w-[340px] overflow-y-auto bg-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md">
                  <Heart size={18} fill="white" />
                </div>

                <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
                  Love Marriage
                </span>
              </div>

              <button
                onClick={closeMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-5">
              {user && (
                <div className="mb-6 rounded-2xl border border-pink-100 bg-[#fff8fc] p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <UserCircle className="h-10 w-10 text-pink-500" />
                      {activePlan && (
                        <span
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold uppercase shadow-md ${getPlanBadgeClass(
                            activePlan
                          )}`}
                        >
                          {activePlan}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1f2937]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#6b7280]">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                        isActive
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-800 hover:bg-pink-50 hover:text-pink-500"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-gray-100 pt-6">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className={`flex h-12 items-center justify-center rounded-full border font-semibold transition ${
                        pathname === "/login"
                          ? "border-pink-400 bg-pink-50 text-pink-500"
                          : "border-gray-200 text-gray-800 hover:border-pink-300 hover:text-pink-500"
                      }`}
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 font-bold text-white shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-pink-400 font-semibold text-pink-500 transition hover:bg-pink-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}