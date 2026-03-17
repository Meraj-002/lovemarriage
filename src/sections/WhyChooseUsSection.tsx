import { BadgeCheck, Lock, Zap, Database } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Profiles",
    description:
      "Every profile is manually verified by our team. We ensure authenticity and safety for all our members.",
    icon: BadgeCheck,
    cardBg: "bg-[#fff8fc]",
    border: "border-[#f7dce9]",
    iconBg: "bg-gradient-to-br from-[#ff4fa3] to-[#ff1493]",
  },
  {
    id: 2,
    title: "Secure Payments",
    description:
      "Industry-standard encryption and secure payment gateways. Your financial data is completely safe.",
    icon: Lock,
    cardBg: "bg-[#fcf9ff]",
    border: "border-[#eadfff]",
    iconBg: "bg-gradient-to-br from-[#a855f7] to-[#ec4899]",
  },
  {
    id: 3,
    title: "Instant Access",
    description:
      "Get immediate access to WhatsApp contacts after subscribing. No waiting period required.",
    icon: Zap,
    cardBg: "bg-[#f8fbff]",
    border: "border-[#dce9ff]",
    iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]",
  },
  {
    id: 4,
    title: "Large Database",
    description:
      "10,000+ active profiles from across India. Find matches based on your preferences.",
    icon: Database,
    cardBg: "bg-[#f8fffb]",
    border: "border-[#d8f0df]",
    iconBg: "bg-gradient-to-br from-[#22c55e] to-[#10b981]",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Top heading */}
        <div className="text-center">
          <div className="inline-flex rounded-full bg-[#f9dceb] px-6 py-2.5">
            <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
              Why Choose Us
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[64px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            Why Love Marriage?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[21px] leading-[1.6] text-[#4b5563]">
            We&apos;re committed to helping you find your perfect life partner
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className={`rounded-[24px] border ${feature.border} ${feature.cardBg} px-8 pb-10 pt-9 shadow-[0_10px_24px_rgba(0,0,0,0.06)]`}
              >
                <div
                  className={`flex h-[68px] w-[68px] items-center justify-center rounded-[16px] ${feature.iconBg} shadow-sm`}
                >
                  <Icon size={30} className="text-white" strokeWidth={2.3} />
                </div>

                <h3 className="mt-8 font-serif text-[28px] font-bold leading-[1.1] text-[#111827]">
                  {feature.title}
                </h3>

                <p className="mt-5 text-[17px] leading-[1.65] text-[#4b5563]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}