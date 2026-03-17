import {
  UserPlus,
  Search,
  Crown,
  MessageCircle,
  Lightbulb,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "Create your free account in just 2 minutes. Add your basic details and preferences.",
    icon: UserPlus,
    iconBg: "bg-gradient-to-br from-[#ff4fa3] to-[#ff1493]",
  },
  {
    id: 2,
    title: "Browse Profiles",
    description:
      "Explore thousands of verified profiles. Use advanced filters to find your match.",
    icon: Search,
    iconBg: "bg-gradient-to-br from-[#a855f7] to-[#ec4899]",
  },
  {
    id: 3,
    title: "Choose Plan",
    description:
      "Select a membership plan that suits your needs. Secure payment options available.",
    icon: Crown,
    iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]",
  },
  {
    id: 4,
    title: "Get Contact",
    description:
      "Instantly access WhatsApp numbers and start your conversation journey.",
    icon: MessageCircle,
    iconBg: "bg-gradient-to-br from-[#22c55e] to-[#10b981]",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#fdf1f7] py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Top heading */}
        <div className="text-center">
          <div className="inline-flex rounded-full bg-[#f9dceb] px-6 py-2.5">
            <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
              How It Works
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[62px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            Your Journey to Love
          </h2>

          <p className="mt-5 text-[20px] text-[#4b5563]">
            Four simple steps to find your perfect match
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative text-center">
                {/* yellow number bubble */}
                <div className="absolute right-[18%] top-[-8px] z-20 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#facc15] text-[20px] font-bold text-white shadow-[0_8px_20px_rgba(250,204,21,0.35)]">
                  {step.id}
                </div>

                {/* big circle */}
                <div
                  className={`mx-auto flex h-[122px] w-[122px] items-center justify-center rounded-full ${step.iconBg} shadow-[0_18px_35px_rgba(0,0,0,0.10)]`}
                >
                  <Icon size={44} className="text-white" strokeWidth={2.2} />
                </div>

                {/* title */}
                <h3 className="mt-8 font-serif text-[28px] font-bold text-[#111827]">
                  {step.title}
                </h3>

                {/* description */}
                <p className="mx-auto mt-4 max-w-[290px] text-[17px] leading-[1.55] text-[#4b5563]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tip card */}
        <div className="mx-auto mt-16 max-w-[840px] rounded-[26px] border border-[#f3d7e6] bg-white px-11 py-14 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff4fa3] to-[#ff1493] shadow-[0_12px_28px_rgba(255,79,163,0.28)]">
              <Lightbulb size={36} className="text-white" strokeWidth={2.3} />
            </div>

            <div>
              <h3 className="font-serif text-[24px] font-bold text-[#111827]">
                Pro Tip for Success
              </h3>

              <p className="mt-3 max-w-[620px] text-[17px] leading-[1.65] text-[#4b5563]">
                Complete your profile with genuine information and a clear
                photo. Profiles with complete information receive 5x more
                responses. Be honest, respectful, and patient in your search
                for the perfect match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}