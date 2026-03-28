"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AddProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [planType, setPlanType] = useState("silver");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setAge("");
    setCity("");
    setProfession("");
    setDescription("");
    setImageUrl("");
    setPlanType("silver");
    setWhatsappNumber("");
    setIsActive(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");
  setError("");

  if (
    !name.trim() ||
    !age.trim() ||
    !city.trim() ||
    !profession.trim() ||
    !planType.trim()
  ) {
    setError("Please fill all required fields.");
    return;
  }

  const numericAge = Number(age);

  if (Number.isNaN(numericAge) || numericAge < 18 || numericAge > 99) {
    setError("Please enter a valid age.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/admin/add-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        age: numericAge,
        city: city.trim(),
        profession: profession.trim(),
        description: description.trim() || null,
        image_url: imageUrl.trim() || null,
        plan_type: planType,
        whatsapp_number: whatsappNumber.trim() || null,
        is_active: isActive,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Failed to add profile.");
      return;
    }

    setMessage("Profile added successfully.");
    resetForm();
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
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[28px] border border-[#f1d6e4] bg-white p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="text-center">
              <div className="inline-flex rounded-full bg-[#f9dceb] px-5 py-2 text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
                Admin Panel
              </div>

              <h1 className="mt-5 text-[34px] font-bold tracking-[-0.03em] text-[#141b2d] sm:text-[42px]">
                Add New Profile
              </h1>

              <p className="mt-3 text-[16px] leading-7 text-[#6b7280]">
                Add a new girl profile to your database
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Profession *
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="Enter profession"
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write profile description"
                  rows={4}
                  className="w-full rounded-[14px] border border-[#e5e7eb] px-4 py-3 text-sm outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL"
                  className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    Plan Type *
                  </label>
                  <select
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  >
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#374151]">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Enter WhatsApp number"
                    className="h-[52px] w-full rounded-[14px] border border-[#e5e7eb] px-4 text-sm outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-[#374151]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 accent-pink-500"
                />
                Active profile
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex h-[54px] w-full items-center justify-center rounded-[14px] bg-gradient-to-r from-[#f35aa5] to-[#a855f7] text-base font-bold text-white shadow-[0_10px_24px_rgba(226,92,177,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Adding Profile..." : "Add Profile"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}