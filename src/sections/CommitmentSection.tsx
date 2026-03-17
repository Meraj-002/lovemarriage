import Image from "next/image";
import {
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Heart,
  Quote,
} from "lucide-react";

const commitments = [
  {
    id: 1,
    title: "Privacy Protection",
    description:
      "Your personal information is encrypted and never shared with third parties without your consent.",
    icon: ShieldCheck,
    iconBox: "bg-[#fde7f1]",
    iconColor: "text-[#f35aa5]",
  },
  {
    id: 2,
    title: "Profile Authenticity",
    description:
      "We verify documents and conduct background checks to ensure profile authenticity.",
    icon: BadgeCheck,
    iconBox: "bg-[#efe3ff]",
    iconColor: "text-[#9b5cf6]",
  },
  {
    id: 3,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you with any queries.",
    icon: Headphones,
    iconBox: "bg-[#e2efff]",
    iconColor: "text-[#4b82ff]",
  },
  {
    id: 4,
    title: "Success Stories",
    description:
      "Join thousands of happy couples who found their life partners through Love Marriage.",
    icon: Heart,
    iconBox: "bg-[#dbf4e5]",
    iconColor: "text-[#22c55e]",
  },
];

const stats = [
  {
    id: 1,
    value: "95%",
    label: "Success Rate",
    valueColor: "text-[#f35aa5]",
  },
  {
    id: 2,
    value: "10K+",
    label: "Active Users",
    valueColor: "text-[#9b5cf6]",
  },
  {
    id: 3,
    value: "5K+",
    label: "Happy Couples",
    valueColor: "text-[#4b82ff]",
  },
  {
    id: 4,
    value: "24/7",
    label: "Support",
    valueColor: "text-[#22c55e]",
  },
];

export default function CommitmentSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-8 lg:grid-cols-2">
        {/* Left Side */}
        <div>
          <h2 className="font-serif text-[58px] font-bold leading-[1.05] tracking-[-0.03em] text-[#111827]">
            Our Commitment to You
          </h2>

          <div className="mt-10 space-y-8">
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.id} className="flex items-start gap-4">
                  <div
                    className={`flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[12px] ${item.iconBox}`}
                  >
                    <Icon size={25} className={item.iconColor} strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="text-[22px] font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[560px] text-[17px] leading-[1.55] text-[#4b5563]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side */}
        <div className="rounded-[34px] bg-[#fdf1f7] p-9 shadow-[0_28px_55px_rgba(0,0,0,0.08)]">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.id}
                className="rounded-[22px] bg-white px-8 py-7 text-center shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
              >
                <h3
                  className={`text-[56px] font-bold leading-none ${item.valueColor}`}
                >
                  {item.value}
                </h3>
                <p className="mt-3 text-[16px] font-semibold text-[#4b5563]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial Card */}
          <div className="mt-8 rounded-[24px] bg-white px-8 py-8 shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
            <Quote
              size={28}
              className="fill-[#f35aa5] text-[#f35aa5]"
              strokeWidth={2}
            />

            <p className="mt-5 max-w-[560px] text-[18px] italic leading-[1.65] text-[#374151]">
              &quot;Love Marriage helped me find my soulmate. The verification
              process gave me confidence and the platform is very easy to use.&quot;
            </p>

            <div className="mt-7 flex items-center gap-4">
              <div className="h-[52px] w-[52px] overflow-hidden rounded-full">
                <Image
                  src="/images/testimonials/priya-user.jpg"
                  alt="Priya Sharma"
                  width={52}
                  height={52}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-[18px] font-bold text-[#111827]">
                  Priya Sharma
                </h4>
                <p className="text-[16px] text-[#6b7280]">Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}