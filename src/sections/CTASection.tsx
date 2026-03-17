import { Heart, UserPlus, Crown, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full">
      <div className="bg-gradient-to-br from-[#ff5aa8] via-[#ff1493] to-[#8b5cf6] px-8 py-24">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top pill */}
          <div className="inline-flex items-center gap-3 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Heart size={18} className="fill-white text-white" />
            <span className="text-[15px] font-bold uppercase tracking-wide text-white">
              Start Your Journey Today
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-8 font-serif text-[72px] font-bold leading-[1.05] tracking-[-0.03em] text-white">
            Join Love Marriage Today
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-7 max-w-4xl text-[24px] leading-[1.45] text-white/95">
            Take the first step towards finding your perfect life partner. Join
            thousands of verified members looking for meaningful relationships.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link href="/signup">
            <button className="flex h-[78px] min-w-[300px] items-center justify-center gap-3 rounded-full bg-white px-10 text-[18px] font-bold text-[#ff2f92] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:scale-[1.02]">
              <UserPlus size={22} />
              Create Free Account
            </button>
            </Link>

<Link href="/plans">
            <button className="flex h-[78px] min-w-[300px] items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-10 text-[18px] font-bold text-white transition hover:bg-white/10">
              <Crown size={22} className="fill-white text-white" />
              View Premium Plans
            </button>
            </Link>
          </div>

          {/* Bottom features */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {[
              "Free Registration",
              "Verified Profiles",
              "Instant Access",
              "24/7 Support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#ff2f92]">
                  <CheckCircle2 size={18} className="fill-white text-[#ff2f92]" />
                </div>
                <span className="text-[16px] font-semibold text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark strip below like screenshot */}
      <div className="h-14 w-full bg-[#08162b]" />
    </section>
  );
}