"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Medal,
  Crown,
  Gem,
  CheckCircle2,
  ShieldCheck,
  X,
  QrCode,
  Copy,
  ReceiptText,
  CircleDollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlanType = {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  per: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  iconColor: string;
  cardBg: string;
  border: string;
  buttonBg: string;
  features: string[];
};

const plans: PlanType[] = [
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

function getPlanChipStyle(name: string) {
  if (name === "Gold") {
    return "bg-gradient-to-r from-[#f59e0b] to-[#eab308] text-white";
  }
  if (name === "Diamond") {
    return "bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white";
  }
  return "bg-gradient-to-r from-[#9ca3af] to-[#6b7280] text-white";
}

export default function PlansClient() {
  const searchParams = useSearchParams();
  const requiredPlan = (searchParams.get("required") || "").toLowerCase();

  const requiredPlanName = useMemo(() => {
    if (requiredPlan === "diamond") return "Diamond";
    if (requiredPlan === "gold") return "Gold";
    if (requiredPlan === "silver") return "Silver";
    return "";
  }, [requiredPlan]);

  const initialSelectedPlan =
    plans.find((plan) => plan.name.toLowerCase() === requiredPlan) || null;

  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(
    initialSelectedPlan
  );
  const [isDialogOpen, setIsDialogOpen] = useState(Boolean(initialSelectedPlan));
  const [utrNumber, setUtrNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const upiId = "lovemarriage@paytm";
  const qrImage = "https://expressionengine.com/asset/img/add-on-details/qrcode_3.png"; // replace with your real QR image path

  const openDialog = (plan: PlanType) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
    setCopied(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCopied(false);
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmitPaymentDetails = async () => {
  if (!utrNumber.trim()) {
    alert("Please enter your UTR / transaction ID.");
    return;
  }

  if (!selectedPlan) {
    alert("No plan selected.");
    return;
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Please login first.");
      return;
    }

    // optional: remove old active subscriptions for testing
    await supabase
      .from("user_subscriptions")
      .delete()
      .eq("user_id", user.id);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);

    const { error: insertError } = await supabase
      .from("user_subscriptions")
      .insert({
        user_id: user.id,
        plan_id: selectedPlan.id,
        status: "active",
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      });

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert(
      `${selectedPlan.name} plan activated successfully for testing.\nUTR: ${utrNumber}`
    );

    setUtrNumber("");
    setIsDialogOpen(false);
  } catch {
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-[#f9dceb] px-6 py-2.5">
              <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
                Membership Plans
              </span>
            </div>

            <h2 className="mt-6 font-serif text-[38px] font-bold leading-tight tracking-[-0.03em] text-[#111827] sm:text-[48px] lg:text-[62px]">
              Choose Your Perfect Plan
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-[17px] leading-[1.7] text-[#4b5563] sm:text-[19px] lg:text-[21px]">
              Get instant WhatsApp access to verified profiles with our premium
              plans
            </p>

            {requiredPlanName && (
              <div className="mx-auto mt-6 inline-flex max-w-full items-center rounded-full bg-[#141b2d] px-5 py-2.5 text-sm font-medium text-white shadow-lg">
                This profile requires the {requiredPlanName} plan.
              </div>
            )}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isRequired =
                requiredPlan && plan.name.toLowerCase() === requiredPlan;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-[28px] border px-7 pb-7 pt-8 shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition duration-300 ${
                    plan.border
                  } ${plan.cardBg} ${
                    isRequired
                      ? "ring-4 ring-[#ff4fa3] ring-offset-2 scale-[1.02]"
                      : ""
                  }`}
                >
                  {isRequired && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#a855f7] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                        Required Plan
                      </span>
                    </div>
                  )}

                  {plan.name === "Diamond" && (
                    <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[36px] rounded-tr-[28px] bg-[#f4c6ec]" />
                  )}

                  <div className="flex justify-center">
                    <div
                      className={`relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-[16px] ${plan.iconBg}`}
                    >
                      <Icon size={26} className={plan.iconColor} />
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="font-serif text-[30px] font-bold leading-none text-[#111827] sm:text-[32px]">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-[16px] text-[#4b5563] sm:text-[17px]">
                      {plan.subtitle}
                    </p>
                  </div>

                  <div className="mt-7 text-center">
                    <div className="flex items-end justify-center gap-1">
                      <span className="font-serif text-[48px] font-bold leading-none text-[#111827] sm:text-[56px]">
                        {plan.price}
                      </span>
                      <span className="mb-1 text-[17px] text-[#4b5563] sm:text-[18px]">
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
                        <span className="text-[16px] text-[#374151] sm:text-[17px]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openDialog(plan)}
                    className={`mt-9 flex h-[56px] w-full items-center justify-center rounded-[14px] ${plan.buttonBg} text-[17px] font-bold text-white shadow-sm transition hover:scale-[1.01] sm:text-[18px]`}
                  >
                    {isRequired ? `Get ${plan.name}` : "Get Started"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-[#6b7280]">
            <ShieldCheck size={18} className="text-[#22c55e]" />
            <p className="text-[15px] font-medium">
              Secure payments • Privacy protected • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Payment Dialog */}
      {isDialogOpen && selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-4 sm:px-6">
          <div className="relative max-h-[92vh] w-full max-w-[700px] overflow-y-auto rounded-[28px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
            {/* Header */}
            <div className="relative bg-[#f9edf4] px-5 pb-6 pt-7 sm:px-8 sm:pb-7 sm:pt-8">
              <button
                onClick={closeDialog}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f3] text-[#4b5563] transition hover:bg-[#e5e7eb]"
              >
                <X size={22} />
              </button>

              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#11a36a] px-5 py-3 text-sm font-bold text-white shadow-md">
                  <ShieldCheck size={16} />
                  Secure Payment
                </div>
              </div>

              <h2 className="mt-5 text-center font-serif text-[34px] font-bold leading-tight text-[#131a2c] sm:text-[50px]">
                Complete Your Payment
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-center text-[16px] leading-7 text-[#5b6474] sm:text-[18px]">
                Pay using QR code or UPI and submit your UTR number for
                verification
              </p>
            </div>

            {/* Body */}
            <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-8">
              {/* Selected plan summary */}
              <div className="rounded-[24px] border border-[#f2bfd8] bg-[#fff8fc] p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-[68px] w-[68px] items-center justify-center rounded-[18px] ${selectedPlan.iconBg} shadow-sm`}
                    >
                      <selectedPlan.icon
                        size={30}
                        className={selectedPlan.iconColor}
                      />
                    </div>

                    <div>
                      <div className="mb-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[12px] font-bold uppercase ${getPlanChipStyle(
                            selectedPlan.name
                          )}`}
                        >
                          {selectedPlan.name} Plan
                        </span>
                      </div>
                      <h3 className="text-[26px] font-bold leading-none text-[#131a2c]">
                        {selectedPlan.name} Membership
                      </h3>
                      <p className="mt-2 text-[15px] text-[#5b6474]">
                        6 months access
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[28px] font-bold text-[#ec4899] sm:text-[40px]">
                      {selectedPlan.price}
                    </div>
                    <p className="text-[15px] text-[#5b6474]">One-time payment</p>
                  </div>
                </div>
              </div>

              {/* QR section title */}
              <div className="mt-8 flex items-center gap-2">
                <QrCode size={18} className="text-[#ec4899]" />
                <h4 className="text-[18px] font-bold text-[#131a2c] sm:text-[20px]">
                  Scan QR Code to Pay
                </h4>
              </div>

              {/* QR Card */}
              <div className="mt-4 rounded-[22px] border border-[#e6e9ef] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)] sm:p-6">
                <div className="flex justify-center">
                  <div className="rounded-[22px] border-4 border-[#f35aa5] bg-white p-4 sm:p-5">
                    <img
                      src={qrImage}
                      alt="Payment QR Code"
                      width={260}
                      height={260}
                      className="h-[210px] w-[210px] rounded-[12px] object-cover sm:h-[260px] sm:w-[260px]"
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h5 className="text-[26px] font-bold text-[#1f2937]">
                    Scan &amp; Pay
                  </h5>
                  <p className="mt-2 text-[16px] text-[#6b7280]">
                    Use any UPI app to scan and pay
                  </p>
                </div>
              </div>

              {/* UPI ID */}
              <div className="mt-8 flex items-center gap-2">
                <CircleDollarSign size={18} className="text-[#ec4899]" />
                <h4 className="text-[18px] font-bold text-[#131a2c] sm:text-[20px]">
                  Or Pay Using UPI ID
                </h4>
              </div>

              <div className="mt-4 rounded-[18px] border border-[#e6e9ef] bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-[#6b7280]">
                      UPI ID
                    </p>
                    <p className="mt-2 break-all text-[22px] font-bold tracking-wide text-[#111827]">
                      {upiId}
                    </p>
                  </div>

                  <button
                    onClick={copyUpiId}
                    className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#f35aa5] to-[#ec4899] px-5 text-[16px] font-bold text-white shadow-sm transition hover:scale-[1.01]"
                  >
                    <Copy size={18} />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* UTR input */}
              <div className="mt-8 flex items-center gap-2">
                <ReceiptText size={18} className="text-[#ec4899]" />
                <h4 className="text-[18px] font-bold text-[#131a2c] sm:text-[20px]">
                  Enter Transaction Details
                </h4>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-[16px] font-semibold text-[#374151]">
                  UTR Number / Transaction ID
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="Enter your UTR / transaction reference number"
                  className="h-[58px] w-full rounded-[16px] border border-[#d8dde6] px-5 text-[16px] text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#f35aa5]"
                />
                <p className="mt-3 text-[14px] text-[#6b7280]">
                  You can find the UTR number in your payment confirmation
                  message or transaction history.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleSubmitPaymentDetails}
                  className="flex h-[58px] flex-1 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#f35aa5] to-[#ec4899] text-[18px] font-bold text-white shadow-[0_10px_24px_rgba(236,72,153,0.25)] transition hover:scale-[1.01]"
                >
                  <CheckCircle2 size={20} />
                  Submit Payment Details
                </button>

                <button
                  onClick={closeDialog}
                  className="flex h-[58px] items-center justify-center gap-2 rounded-[16px] border border-[#cfd5de] bg-white px-7 text-[18px] font-bold text-[#374151] transition hover:bg-gray-50"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>

              {/* Bottom trust note */}
              <div className="mt-7 rounded-[18px] border border-[#b8efc6] bg-[#eefcf2] p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h5 className="text-[20px] font-bold text-[#1f2937]">
                      Secure &amp; Verified
                    </h5>
                    <p className="mt-1 text-[15px] leading-7 text-[#4b5563]">
                      Your payment details are securely reviewed before
                      activation. Our team will verify your transaction within
                      2-4 hours and activate your membership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}