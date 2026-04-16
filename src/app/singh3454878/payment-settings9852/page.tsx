"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Save, QrCode, CircleDollarSign, Send, BadgeIndianRupee } from "lucide-react";

type PlanItem = {
  id: number;
  name: string;
  price: number;
};

export default function AdminPaymentSettingsPage() {
  const [upiId, setUpiId] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [plans, setPlans] = useState<PlanItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const response = await fetch("/api/payment-settings");
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Failed to load settings.");
          return;
        }

        setUpiId(result.upi_id || "");
        setQrImage(result.qr_image || "");
        setTelegramLink(result.telegram_link || "");
        setPlans(result.plans || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load settings.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchPaymentSettings();
  }, []);

  const handleQrUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://uploads.lovemarriageonline.store/upload.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        setError(result.error || "QR image upload failed.");
        return;
      }

      setQrImage(result.url);
      setMessage("QR image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setError("QR image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePlanPriceChange = (id: number, value: string) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              price: Number(value) || 0,
            }
          : plan
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!upiId.trim() || !qrImage.trim()) {
      setError("Please fill UPI ID and upload QR image.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/payment-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upi_id: upiId.trim(),
          qr_image: qrImage.trim(),
          telegram_link: telegramLink.trim(),
          plans,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to update settings.");
        return;
      }

      setMessage("Settings updated successfully.");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[28px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-8">
          <h1 className="text-[30px] font-extrabold text-[#162033] sm:text-[38px]">
            Payment & Site Settings
          </h1>
          <p className="mt-2 text-[15px] text-[#6b7280] sm:text-[16px]">
            Update UPI ID, QR image, Telegram link, and membership prices.
          </p>

          {pageLoading ? (
            <div className="py-10 text-center text-[#6b7280]">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-[14px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                  {message}
                </div>
              )}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <CircleDollarSign size={16} />
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID"
                  className="h-[54px] w-full rounded-[14px] border border-[#eceef3] px-4 text-sm text-[#374151] outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <Send size={16} />
                  Telegram Link
                </label>
                <input
                  type="text"
                  value={telegramLink}
                  onChange={(e) => setTelegramLink(e.target.value)}
                  placeholder="https://t.me/yourusername"
                  className="h-[54px] w-full rounded-[14px] border border-[#eceef3] px-4 text-sm text-[#374151] outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <QrCode size={16} />
                  Upload QR Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrUpload}
                  className="block w-full rounded-[14px] border border-[#eceef3] px-4 py-3 text-sm text-[#374151] outline-none focus:border-pink-400"
                />

                {uploadingImage && (
                  <p className="mt-2 text-sm text-[#ff2f92]">
                    Uploading QR image...
                  </p>
                )}
              </div>

              {qrImage && (
                <div className="rounded-[18px] border border-[#eceef3] bg-[#fafafa] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#374151]">
                    QR Preview
                  </p>
                  <img
                    src={qrImage}
                    alt="QR Preview"
                    className="h-[220px] w-[220px] rounded-[14px] object-cover"
                  />
                </div>
              )}

              <div className="rounded-[18px] border border-[#eceef3] bg-[#fafafa] p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BadgeIndianRupee size={18} className="text-[#ff2f92]" />
                  <h3 className="text-[18px] font-bold text-[#162033]">
                    Membership Prices
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {plans.map((plan) => (
                    <div key={plan.id}>
                      <label className="mb-2 block text-sm font-semibold text-[#374151]">
                        {plan.name} Price
                      </label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) =>
                          handlePlanPriceChange(plan.id, e.target.value)
                        }
                        className="h-[54px] w-full rounded-[14px] border border-[#eceef3] px-4 text-sm text-[#374151] outline-none focus:border-pink-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="inline-flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#f35aa5] to-[#b56ae8] px-6 text-base font-bold text-white shadow-[0_12px_30px_rgba(226,92,177,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}