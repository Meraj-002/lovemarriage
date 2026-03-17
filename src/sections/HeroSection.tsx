import Image from "next/image";
import { Search, Crown, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#fdf1f7]">
      <div className="mx-auto grid min-h-[740px] max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="max-w-[620px]">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f9e4ef] px-5 py-3">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[15px] font-semibold text-[#ff2f92]">
              India&apos;s Most Trusted Marriage Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-10 font-serif text-[68px] font-bold leading-[0.96] tracking-[-0.03em] text-[#111827]">
            Find Verified
            <br />
            Profiles &amp; Start
            <br />
            Your{" "}
            <span className="bg-gradient-to-r from-[#ff4fa3] to-[#ff7fc4] bg-clip-text text-transparent">
              Love Story
            </span>
          </h1>

          {/* Paragraph */}
          <p className="mt-8 max-w-[620px] text-[20px] leading-[1.9] text-[#4b5563]">
            Connect with thousands of verified profiles. Get instant WhatsApp
            access with our premium membership plans. Your perfect match is just
            a click away.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/profiles">
            <button className="flex h-[66px] items-center gap-3 rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#ff1f8f] px-9 text-[17px] font-bold text-white shadow-[0_10px_30px_rgba(255,79,163,0.28)] transition hover:scale-[1.02]">
              <Search size={20} />
              Explore Profiles
            </button>
            </Link>

<Link href="/plans">
            <button className="flex h-[66px] items-center gap-3 rounded-full border-2 border-[#ff69b4] bg-white px-10 text-[17px] font-bold text-[#ff2f92] transition hover:bg-pink-50">
              <Crown size={18} className="fill-[#ff2f92] text-[#ff2f92]" />
              View Plans
            </button>
            </Link>
          </div>

          {/* Trusted users */}
          <div className="mt-14 flex items-center gap-6">
            <div className="flex -space-x-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f8cbd7c0b9-a98f0e4fe2350005165a.png"
                  alt="user 1"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3b03afd828-3f97edf62d57347b2f55.png"
                  alt="user 2"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/78c27299a9-0d2240317437ee5a66c3.png"
                  alt="user 3"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-sm">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/49ed9b8935-f33bedfbfa079108ecd3.png"
                  alt="user 4"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-1 text-[15px] font-semibold text-[#4b5563]">
                Trusted by 10,000+ users
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center lg:justify-end">
          {/* pink glow behind cards */}
          <div className="absolute left-[14%] top-[16%] h-[360px] w-[360px] rounded-full bg-pink-300/30 blur-3xl" />

          <div className="relative w-full max-w-[720px]">
            {/* top two cards */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Card 1 */}
              <div className="w-full rounded-[24px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:w-[292px]">
                <div className="overflow-hidden rounded-[18px] bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2a5c6e6ff4-6323608b40360fd7a7f3.png"
                    alt="Priya Sharma"
                    width={260}
                    height={260}
                    className="h-[198px] w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-[20px] font-bold text-[#111827]">
                    Priya Sharma
                  </h3>

                  <span className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-1.5 text-[13px] font-bold text-white shadow-sm">
  GOLD
</span>
                </div>

                <p className="mt-3 text-[16px] text-[#4b5563]">
                  24 years • Mumbai
                </p>
                <p className="mt-1 text-[15px] text-[#6b7280]">
                  Software Engineer
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-full rounded-[24px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:mt-[-50px] md:w-[310px]">
                <div className="overflow-hidden rounded-[18px] bg-gray-100">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/686ada91f1-9615fd7ebfb992aa1a8e.png"
                    alt="Ananya Reddy"
                    width={280}
                    height={300}
                    className="h-[238px] w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="text-[20px] font-bold text-[#111827]">
                    Ananya Reddy
                  </h3>

                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1.5 text-[13px] font-bold text-white shadow-sm">
  DIAMOND
</span>
                </div>

                <p className="mt-3 text-[16px] text-[#4b5563]">
                  26 years • Bangalore
                </p>
                <p className="mt-1 text-[15px] text-[#6b7280]">
                  Marketing Manager
                </p>
              </div>
            </div>

            {/* Bottom long card */}
            <div className="mt-7 rounded-[24px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="h-[86px] w-[86px] overflow-hidden rounded-full bg-gray-100">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/49ed9b8935-f33bedfbfa079108ecd3.png"
                      alt="Riya Patel"
                      width={86}
                      height={86}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold text-[#111827]">
                      Riya Patel
                    </h3>
                    <p className="mt-2 text-[16px] text-[#4b5563]">
                      23 years • Delhi
                    </p>
                    <p className="mt-1 text-[15px] text-[#6b7280]">
                      Fashion Designer
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#d1d5db] px-4 py-1.5 text-[13px] font-bold text-[#4b5563]">
                  SILVER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}