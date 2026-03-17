"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, UserCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

  const [user, setUser] = useState<any>(null);
  const [activePlan, setActivePlan] = useState<string>("");

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
    const getUserAndPlan = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await fetchActivePlan(currentUser.id);
      } else {
        setActivePlan("");
      }
    };

    getUserAndPlan();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchActivePlan(currentUser.id);
      } else {
        setActivePlan("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActivePlan("");
    router.push("/");
  };

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md">
            <Heart size={20} fill="white" />
          </div>

          <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
            Love Marriage
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
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

        <div className="flex items-center gap-6">
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
                className="rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-6 py-2.5 font-bold text-white shadow-md transition hover:scale-105"
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
      </div>
    </header>
  );
}