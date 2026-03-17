import Image from "next/image";
import Link from "next/link";
import { Cake, MapPin, Star, Eye, ArrowRight,} from "lucide-react";

const profiles = [
  {
    id: 1,
    name: "Aisha Khan",
    age: 25,
    location: "Mumbai",
    profession: "Doctor • MBBS",
    description:
      "Looking for a caring and understanding life partner who values family and traditions.",
    rating: "4.9",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/49ed9b8935-f33bedfbfa079108ecd3.png",
    plan: "gold",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    age: 27,
    location: "Delhi",
    profession: "CA • Finance Professional",
    description:
      "Ambitious professional seeking a supportive partner to build a beautiful future together.",
    rating: "5.0",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2a5c6e6ff4-6323608b40360fd7a7f3.png",
    plan: "diamond",
  },
  {
    id: 3,
    name: "Simran Singh",
    age: 24,
    location: "Chandigarh",
    profession: "Teacher • B.Ed",
    description:
      "Family-oriented person looking for someone who values relationships and honesty.",
    rating: "4.8",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/686ada91f1-9615fd7ebfb992aa1a8e.png",
    plan: "silver",
  },
  {
    id: 4,
    name: "Kavya Iyer",
    age: 26,
    location: "Bangalore",
    profession: "Software Engineer • B.Tech",
    description:
      "Tech enthusiast seeking an educated partner who shares similar values and interests.",
    rating: "4.9",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f8cbd7c0b9-a98f0e4fe2350005165a.png",
    plan: "gold",
  },
  {
    id: 5,
    name: "Tanvi Mehta",
    age: 28,
    location: "Ahmedabad",
    profession: "Entrepreneur • MBA",
    description:
      "Independent and ambitious, looking for a partner who supports dreams and growth.",
    rating: "5.0",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3b03afd828-3f97edf62d57347b2f55.png",
    plan: "diamond",
  },
  {
    id: 6,
    name: "Ishita Joshi",
    age: 23,
    location: "Pune",
    profession: "Graphic Designer • B.Des",
    description:
      "Creative soul seeking a like-minded partner to share life's beautiful moments.",
    rating: "4.7",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/78c27299a9-0d2240317437ee5a66c3.png",
    plan: "silver",
  },
];

function getPlanBadge(plan: string) {
  if (plan === "gold") {
    return "bg-gradient-to-r from-[#facc15] to-[#eab308] text-white";
  }
  if (plan === "diamond") {
    return "bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white";
  }
  return "bg-[#e5e7eb] text-[#4b5563]";
}

function getPlanText(plan: string) {
  if (plan === "gold") return "GOLD";
  if (plan === "diamond") return "DIAMOND";
  return "SILVER";
}

export default function FeaturedProfilesSection() {
  return (
    <section className="bg-[#fdf6f9] py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Top text */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-[#f9dceb] px-6 py-2.5">
            <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
              Featured Profiles
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[64px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            Meet Your Perfect Match
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[21px] leading-[1.6] text-[#4b5563]">
            Browse through our carefully verified profiles and find someone
            special
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="overflow-hidden rounded-[26px] border border-[#eadde3] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >
              {/* Image part */}
              <div className="relative">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={500}
                  height={420}
                  className="h-[330px] w-full object-cover"
                />

                <div
                  className={`absolute right-5 top-5 rounded-full px-5 py-2 text-sm font-bold shadow-sm ${getPlanBadge(
                    profile.plan
                  )}`}
                >
                  {getPlanText(profile.plan)}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-[28px] font-bold leading-none text-[#111827]">
                    {profile.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[20px] font-semibold text-[#374151]">
                    <Star
                      size={18}
                      className="fill-[#facc15] text-[#facc15]"
                    />
                    <span className="text-[16px]">{profile.rating}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-[16px] text-[#4b5563]">
                  <div className="flex items-center gap-2">
                    <Cake size={17} className="text-[#ff4fa3]" />
                    <span>{profile.age} years</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={17} className="text-[#ff4fa3]" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <p className="mt-5 text-[17px] font-semibold text-[#4b5563]">
                  {profile.profession}
                </p>

                <p className="mt-3 min-h-[72px] text-[16px] leading-[1.5] text-[#6b7280]">
                  {profile.description}
                </p>

                <button className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#ff4fa3] to-[#ff1493] text-[16px] font-bold text-white shadow-[0_8px_24px_rgba(255,79,163,0.25)] transition hover:scale-[1.01]">
                  <Eye size={18} />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom button */}
        <div className="mt-14 flex justify-center">
            <Link href="/profiles">
          <button className="flex h-[62px] items-center gap-3 rounded-full border-2 border-[#ff69b4] bg-white px-12 text-[18px] font-bold text-[#ff2f92] shadow-sm transition hover:bg-pink-50">
            View All Profiles
            <ArrowRight size={20} />
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}