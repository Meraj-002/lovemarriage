import {
  Medal,
  Crown,
  Gem,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Silver",
    subtitle: "Perfect for starters",
    price: "₹999",
    per: "/month",
    badge: "",
    icon: Medal,
    iconBg: "bg-[#d1d5db]",
    iconColor: "text-[#374151]",
    cardBg: "bg-white",
    border: "border-[#e5e7eb]",
    buttonBg: "bg-gradient-to-r from-[#4b5563] to-[#374151]",
    features: [
      "Access to 100 profiles",
      "10 WhatsApp contacts/month",
      "Basic profile visibility",
      "Email support",
      "Profile verification",
    ],
  },
  {
    id: 2,
    name: "Gold",
    subtitle: "Most popular choice",
    price: "₹1,999",
    per: "/month",
    badge: "RECOMMENDED",
    icon: Crown,
    iconBg: "bg-gradient-to-br from-[#facc15] to-[#eab308]",
    iconColor: "text-white",
    cardBg: "bg-[#fff9db]",
    border: "border-[#facc15]",
    buttonBg: "bg-gradient-to-r from-[#facc15] to-[#eab308]",
    features: [
      "Access to 500 profiles",
      "50 WhatsApp contacts/month",
      "Priority profile visibility",
      "24/7 Chat support",
      "Advanced filters",
      "Profile boost weekly",
    ],
  },
  {
    id: 3,
    name: "Diamond",
    subtitle: "Premium experience",
    price: "₹3,999",
    per: "/month",
    badge: "PREMIUM",
    icon: Gem,
    iconBg: "bg-gradient-to-br from-[#ec4899] to-[#a855f7]",
    iconColor: "text-white",
    cardBg: "bg-[#fff6fb]",
    border: "border-[#ff69b4]",
    buttonBg: "bg-gradient-to-r from-[#ec4899] to-[#a855f7]",
    features: [
      "Unlimited profile access",
      "Unlimited WhatsApp contacts",
      "Top profile visibility",
      "Dedicated support manager",
      "All premium filters",
      "Daily profile boost",
      "Personalized matchmaking",
    ],
  },
];

function getBadgeStyle(name: string) {
  if (name === "Gold") {
    return "bg-gradient-to-r from-[#facc15] to-[#eab308] text-white";
  }
  if (name === "Diamond") {
    return "bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white";
  }
  return "";
}

export default function PricingSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Top content */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-[#f9dceb] px-6 py-2.5">
            <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
              Membership Plans
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[62px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            Choose Your Perfect Plan
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-[21px] leading-[1.6] text-[#4b5563]">
            Get instant WhatsApp access to verified profiles with our premium
            plans
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative rounded-[28px] border ${plan.border} ${plan.cardBg} px-7 pb-7 pt-8 shadow-[0_12px_35px_rgba(0,0,0,0.06)]`}
              >
                {/* Decorative corner for diamond */}
                {plan.name === "Diamond" && (
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[36px] rounded-tr-[28px] bg-[#f4c6ec]" />
                )}

                {/* Icon */}
                <div className="flex justify-center">
                  <div
                    className={`relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-[16px] ${plan.iconBg}`}
                  >
                    <Icon size={26} className={plan.iconColor} />
                  </div>
                </div>

                {/* Title */}
                <div className="mt-5 text-center">
                  <h3 className="font-serif text-[32px] font-bold leading-none text-[#111827]">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-[17px] text-[#4b5563]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-7 text-center">
                  <div className="flex items-end justify-center gap-1">
                    <span className="font-serif text-[56px] font-bold leading-none text-[#111827]">
                      {plan.price}
                    </span>
                    <span className="mb-1 text-[18px] text-[#4b5563]">
                      {plan.per}
                    </span>
                  </div>

                  {plan.badge && (
                    <div className="mt-5 flex justify-center">
                      <span
                        className={`rounded-full px-4 py-1.5 text-[13px] font-bold ${getBadgeStyle(
                          plan.name
                        )}`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        size={19}
                        className={
                          plan.name === "Diamond"
                            ? "mt-0.5 text-[#ec4899]"
                            : "mt-0.5 text-[#22c55e]"
                        }
                      />
                      <span className="text-[17px] text-[#374151]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`mt-9 flex h-[56px] w-full items-center justify-center rounded-[14px] ${plan.buttonBg} text-[18px] font-bold text-white shadow-sm transition hover:scale-[1.01]`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom privacy text */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[#6b7280]">
          <ShieldCheck size={18} className="text-[#22c55e]" />
          <p className="text-[15px] font-medium">
            Secure payments • Privacy protected • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}