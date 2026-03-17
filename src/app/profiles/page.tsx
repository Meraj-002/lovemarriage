"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  CalendarDays,
  Crown,
  ChevronDown,
  Heart,
  BriefcaseBusiness,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  PhoneCall,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

type Profile = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  description: string | null;
  image_url: string | null;
  plan_type: string;
  whatsapp_number: string | null;
  is_active: boolean;
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

const INITIAL_PAGE_SIZE = 60;
const LOAD_MORE_SIZE = 60;

const ageRanges = [
  { label: "Age Range", value: "all" },
  { label: "21 - 25", value: "21-25" },
  { label: "26 - 30", value: "26-30" },
  { label: "31 - 35", value: "31-35" },
  { label: "36+", value: "36-100" },
];

const membershipOptions = [
  { label: "Membership", value: "all" },
  { label: "Silver", value: "silver" },
  { label: "Gold", value: "gold" },
  { label: "Diamond", value: "diamond" },
];

const sortOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Name A-Z", value: "name_asc" },
  { label: "Age Low to High", value: "age_asc" },
  { label: "Age High to Low", value: "age_desc" },
];

function getPlanBadgeClass(plan: string) {
  const normalized = plan?.toLowerCase();

  if (normalized === "diamond") {
    return "bg-gradient-to-r from-[#6d3df5] via-[#8b5cf6] to-[#b44cff] text-white shadow-md";
  }

  if (normalized === "gold") {
    return "bg-gradient-to-r from-[#d79a00] via-[#f0b90b] to-[#ffd44d] text-white shadow-md";
  }

  return "bg-gradient-to-r from-[#7d8597] via-[#98a2b3] to-[#c0c7d1] text-white shadow-md";
}

function getPlanLabel(plan: string) {
  const normalized = plan?.toLowerCase();
  if (normalized === "diamond") return "Diamond";
  if (normalized === "gold") return "Gold";
  return "Silver";
}

function getPlanRank(plan: string) {
  const normalized = plan?.toLowerCase();
  if (normalized === "diamond") return 3;
  if (normalized === "gold") return 2;
  return 1;
}

function capitalizePlan(plan: string) {
  const normalized = plan?.toLowerCase();
  if (normalized === "diamond") return "Diamond";
  if (normalized === "gold") return "Gold";
  return "Silver";
}

function getRating(id: number) {
  const values = [4.6, 4.7, 4.8, 4.9, 5.0];
  return values[id % values.length].toFixed(1);
}

function getHeight(id: number) {
  const heights = [`5'3"`, `5'4"`, `5'5"`, `5'6"`, `5'7"`];
  return heights[id % heights.length];
}

function getProfileCode(id: number) {
  return `LM-${String(100000 + id).slice(-6)}`;
}

function getImageSrc(profile: Profile) {
  if (profile.image_url && profile.image_url.trim() !== "") {
    return profile.image_url;
  }

  return "/images/featured/aisha.jpg";
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [selectedMembership, setSelectedMembership] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const [loadedCount, setLoadedCount] = useState(INITIAL_PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [endMessage, setEndMessage] = useState("");

  const [actionMessage, setActionMessage] = useState("");
  const [checkingProfileId, setCheckingProfileId] = useState<number | null>(
    null
  );

  const parsedAgeRange = useMemo(() => {
    if (selectedAgeRange === "all") return null;
    const [min, max] = selectedAgeRange.split("-").map(Number);
    return { min, max };
  }, [selectedAgeRange]);

  const fetchCityOptions = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("city")
      .eq("is_active", true)
      .limit(1000);

    if (!data) return;

    const uniqueCities = Array.from(
      new Set(
        data
          .map((item) => item.city)
          .filter((city): city is string => Boolean(city))
      )
    ).sort((a, b) => a.localeCompare(b));

    setCityOptions(uniqueCities);
  }, []);

  const fetchProfiles = useCallback(
  async (targetCount: number, showSkeleton = false) => {
    try {
      if (showSkeleton) {
        setLoading(true);
        setError("");
        setEndMessage("");
      } else {
        setLoadingMore(true);
      }

      const from = 0;
      const to = targetCount - 1;

      let query = supabase
        .from("profiles")
        .select(
          "id, name, age, city, profession, description, image_url, plan_type, whatsapp_number, is_active",
          { count: "exact" }
        )
        .eq("is_active", true);

      if (searchTerm.trim()) {
        query = query.ilike("name", `%${searchTerm.trim()}%`);
      }

      if (selectedCity !== "all") {
        query = query.eq("city", selectedCity);
      }

      if (selectedMembership !== "all") {
        query = query.eq("plan_type", selectedMembership);
      }

      if (parsedAgeRange) {
        query = query
          .gte("age", parsedAgeRange.min)
          .lte("age", parsedAgeRange.max);
      }

      if (sortBy === "recent") {
        query = query.order("id", { ascending: false });
      } else if (sortBy === "name_asc") {
        query = query.order("name", { ascending: true });
      } else if (sortBy === "age_asc") {
        query = query.order("age", { ascending: true });
      } else if (sortBy === "age_desc") {
        query = query.order("age", { ascending: false });
      }

      const { data, error, count } = await query.range(from, to);

      if (error) {
        setError(error.message);
        return;
      }

      const finalData = (data as Profile[]) || [];
      const total = count || 0;

      setProfiles(finalData);
      setTotalCount(total);
      setLoadedCount(finalData.length);

      const noMore = finalData.length >= total;
      setHasMore(!noMore);

      if (!showSkeleton && noMore) {
        setEndMessage("You’ve reached the end.");
        setTimeout(() => setEndMessage(""), 2500);
      }
    } catch {
      setError("Failed to load profiles.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  },
  [parsedAgeRange, searchTerm, selectedCity, selectedMembership, sortBy]
);

  useEffect(() => {
    fetchCityOptions();
  }, [fetchCityOptions]);

  useEffect(() => {
  fetchProfiles(INITIAL_PAGE_SIZE, false);
}, [searchTerm, selectedCity, selectedMembership, selectedAgeRange, sortBy, fetchProfiles]);

  const handleFindMatches = () => {
  setSearchTerm(searchInput);
};

  const handleLoadMore = () => {
  if (loadingMore) return;

  if (!hasMore) {
    setEndMessage("You’ve reached the end.");
    setTimeout(() => setEndMessage(""), 2500);
    return;
  }

  fetchProfiles(loadedCount + LOAD_MORE_SIZE, false);
};

  const handleWhatsAppClick = async (profile: Profile) => {
    try {
      setActionMessage("");
      setCheckingProfileId(profile.id);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setActionMessage("Please login first to continue.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
        return;
      }

      const { data: subscription, error: subscriptionError } = await supabase
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
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (subscriptionError) {
        setActionMessage("Could not verify your plan. Please try again.");
        return;
      }

      const requiredPlanRank = getPlanRank(profile.plan_type);
      const requiredPlanName = capitalizePlan(profile.plan_type);

      const typedSubscription = subscription as SubscriptionRow | null;

      if (!typedSubscription || !typedSubscription.plans) {
        setActionMessage(
          `This profile requires the ${requiredPlanName} plan. Redirecting to plans...`
        );
        setTimeout(() => {
          window.location.href = `/plans?required=${profile.plan_type}&profile=${profile.id}`;
        }, 1500);
        return;
      }

      const userPlan = Array.isArray(typedSubscription.plans)
        ? typedSubscription.plans[0]
        : typedSubscription.plans;

      const userPlanRank = userPlan?.rank || 0;

      if (userPlanRank < requiredPlanRank) {
        setActionMessage(
          `This profile requires the ${requiredPlanName} plan. Redirecting to plans...`
        );
        setTimeout(() => {
          window.location.href = `/plans?required=${profile.plan_type}&profile=${profile.id}`;
        }, 1500);
        return;
      }

      if (!profile.whatsapp_number) {
        setActionMessage("WhatsApp number is not available for this profile.");
        return;
      }

      const cleanPhone = profile.whatsapp_number.replace(/\D/g, "");

      if (!cleanPhone) {
        setActionMessage("Invalid WhatsApp number.");
        return;
      }

      window.open(`https://wa.me/${cleanPhone}`, "_blank");
    } catch {
      setActionMessage("Something went wrong. Please try again.");
    } finally {
      setCheckingProfileId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f3e7fb] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#ff4fa3] shadow-sm">
            <Sparkles size={14} className="fill-[#ff4fa3] text-[#ff4fa3]" />
            Verified Profiles
          </div>

          <h1 className="mt-5 text-[38px] font-extrabold leading-tight tracking-[-0.03em] text-[#141b2d] sm:text-[48px] lg:text-[60px]">
            Browse{" "}
            <span className="bg-gradient-to-r from-[#ff4fa3] to-[#b56ae8] bg-clip-text text-transparent">
              Premium
            </span>{" "}
            Profiles
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-8 text-[#6b7280] sm:text-[18px]">
            Discover exceptional matches tailored to your preferences. Our
            curated selection of professional profiles ensures a high-quality
            search experience.
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-4xl rounded-[24px] border border-white/70 bg-white p-4 shadow-[0_18px_40px_rgba(17,24,39,0.08)] sm:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            <div className="flex h-[52px] items-center gap-3 rounded-[14px] border border-[#eceef3] px-4 text-[#7b8190]">
              <Search size={18} className="text-[#6b7280]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or ID..."
                className="h-full w-full border-none bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
              />
            </div>

            <div className="relative">
              <MapPin
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-[52px] w-full appearance-none rounded-[14px] border border-[#eceef3] bg-white pl-11 pr-10 text-sm text-[#374151] outline-none"
              >
                <option value="all">Any City</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
            </div>

            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
              <select
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
                className="h-[52px] w-full appearance-none rounded-[14px] border border-[#eceef3] bg-white pl-11 pr-10 text-sm text-[#374151] outline-none"
              >
                {ageRanges.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
            </div>

            <div className="relative">
              <Crown
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
              <select
                value={selectedMembership}
                onChange={(e) => setSelectedMembership(e.target.value)}
                className="h-[52px] w-full appearance-none rounded-[14px] border border-[#eceef3] bg-white pl-11 pr-10 text-sm text-[#374151] outline-none"
              >
                {membershipOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
            </div>

            <button
              onClick={handleFindMatches}
              className="h-[52px] rounded-[14px] bg-gradient-to-r from-[#f35aa5] to-[#a855f7] px-7 text-sm font-bold text-white shadow-[0_10px_24px_rgba(226,92,177,0.25)] transition hover:scale-[1.01]"
            >
              Find Matches
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] font-semibold text-[#4b5563]">
              Showing <span className="font-bold">{profiles.length}</span> of{" "}
              <span className="font-bold">{totalCount}</span> premium profiles
            </p>

            <div className="flex items-center gap-3">
              <span className="text-[15px] text-[#6b7280]">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-7 text-[15px] font-semibold text-[#1f2937] outline-none"
                >
                  {sortOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6b7280]"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {actionMessage && (
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[#141b2d] px-4 py-2 text-sm font-medium text-white shadow-lg">
                {actionMessage}
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[22px] border border-[#eceef3] bg-white shadow-sm"
                >
                  <div className="h-[240px] animate-pulse bg-[#f4f4f5]" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-[#f4f4f5]" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-[#f4f4f5]" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#f4f4f5]" />
                    <div className="h-16 animate-pulse rounded bg-[#f4f4f5]" />
                    <div className="h-11 animate-pulse rounded-[14px] bg-[#f4f4f5]" />
                  </div>
                </div>
              ))}
            </div>
          ) : profiles.length === 0 ? (
            <div className="rounded-[22px] border border-[#eceef3] bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-[#1f2937]">
                No profiles found
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="overflow-hidden rounded-[22px] border border-[#eceef3] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative h-[240px] overflow-hidden">
                      <img
                        src={getImageSrc(profile)}
                        alt={profile.name}
                        
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute left-4 top-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getPlanBadgeClass(
                            profile.plan_type
                          )}`}
                        >
                          <Sparkles size={10} />
                          {getPlanLabel(profile.plan_type)}
                        </span>
                      </div>

                      <button className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#8a94a6] shadow-sm">
                        <Heart size={16} />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-[18px] font-bold text-white">
                            {profile.name}
                          </h3>
                          <p className="text-sm text-white/90">
                            {getProfileCode(profile.id)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-[8px] bg-black/35 px-2 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                          <Star
                            size={12}
                            className="fill-[#f4c542] text-[#f4c542]"
                          />
                          {getRating(profile.id)}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#f3f4f6] pb-4 text-[14px] text-[#5b6474]">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} className="text-[#d9468f]" />
                          <span>
                            {profile.age} Yrs, {getHeight(profile.id)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-[#d9468f]" />
                          <span>{profile.city}, IND</span>
                        </div>
                      </div>

                      <div className="space-y-3 border-b border-[#f3f4f6] py-4">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#4b5563]">
                          <div className="flex items-center gap-2">
                            <BriefcaseBusiness
                              size={15}
                              className="text-[#d9468f]"
                            />
                            <span className="font-medium">{profile.profession}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <GraduationCap
                              size={15}
                              className="text-[#d9468f]"
                            />
                            <span>Verified Profile</span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 min-h-[88px] text-[14px] leading-7 text-[#6b7280]">
                        {profile.description ||
                          "Independent, ambitious, and family-oriented profile looking for a meaningful connection with shared values and long-term compatibility."}
                      </p>

                      <button
                        onClick={() => handleWhatsAppClick(profile)}
                        disabled={checkingProfileId === profile.id}
                        className="mt-5 inline-flex h-[44px] w-full items-center justify-center rounded-[14px] border border-[#f3bfd6] bg-white text-[15px] font-semibold text-[#f35aa5] transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {checkingProfileId === profile.id
                          ? "Checking..."
                          : "Chat On WhatsApp"}
                        <PhoneCall size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-[#f3bfd6] bg-white px-7 text-[15px] font-semibold text-[#f35aa5] shadow-sm transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <ShieldCheck size={16} className="text-[#d9468f]" />
                    {loadingMore ? "Loading..." : "Load More Profiles"}
                  </button>
                )}

                {endMessage && (
                  <div className="rounded-full bg-[#141b2d] px-4 py-2 text-sm font-medium text-white shadow-lg">
                    {endMessage}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}