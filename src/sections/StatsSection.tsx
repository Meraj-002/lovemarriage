import { Users, Shield, BadgeCheck, Headphones } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    value: "10,000+",
    label: "Verified Profiles",
    cardBg: "bg-[#fff7fb]",
    border: "border-[#f7d8ea]",
    iconBg: "bg-gradient-to-br from-[#ff4fa3] to-[#ff1f8f]",
  },
  {
    id: 2,
    icon: Shield,
    value: "100%",
    label: "Secure Payments",
    cardBg: "bg-[#fcf8ff]",
    border: "border-[#eadbff]",
    iconBg: "bg-gradient-to-br from-[#a855f7] to-[#ff5ca8]",
  },
  {
    id: 3,
    icon: BadgeCheck,
    value: "95%",
    label: "Verified Users",
    cardBg: "bg-[#f8fbff]",
    border: "border-[#d9e7ff]",
    iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#a855f7]",
  },
  {
    id: 4,
    icon: Headphones,
    value: "24/7",
    label: "Support Available",
    cardBg: "bg-[#f8fffb]",
    border: "border-[#d8f2e2]",
    iconBg: "bg-gradient-to-br from-[#22c55e] to-[#10b981]",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`flex min-h-[225px] flex-col items-center justify-center rounded-[24px] border ${item.border} ${item.cardBg} px-8 text-center`}
              >
                <div
                  className={`flex h-[68px] w-[68px] items-center justify-center rounded-[18px] ${item.iconBg} shadow-md`}
                >
                  <Icon size={30} className="text-white" strokeWidth={2.4} />
                </div>

                <h3 className="mt-7 font-serif text-[34px] font-bold leading-none text-[#111827]">
                  {item.value}
                </h3>

                <p className="mt-4 text-[16px] font-semibold text-[#4b5563]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}