"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Send,
} from "lucide-react";

const quickLinks = [
  "Home",
  "Browse Profiles",
  "Membership Plans",
  "How It Works",
  "Success Stories",
  "About Us",
];

const supportLinks = [
  "Help Center",
  "FAQs",
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
  "Safety Tips",
];

export default function Footer() {
  const [telegramLink, setTelegramLink] = useState("https://t.me/yourusername");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/payment-settings");
        const result = await response.json();

        if (!response.ok) return;

        if (result.telegram_link) {
          setTelegramLink(result.telegram_link);
        }
      } catch (error) {
        console.error("Failed to load telegram link:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="w-full">
      <div className="bg-[#08162b] text-white">
        <div className="mx-auto max-w-7xl px-8 pb-10 pt-20">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#ff1f8f]">
                  <Heart size={20} className="fill-white text-white" />
                </div>
                <h3 className="font-serif text-[28px] font-bold text-white">
                  Love Marriage
                </h3>
              </div>

              <p className="mt-8 max-w-[310px] text-[18px] leading-[1.7] text-white/70">
                India&apos;s most trusted premium marriage platform. Find verified
                profiles and start your love story today.
              </p>

              <div className="mt-8 flex items-center gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                      <Icon size={18} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-[24px] font-bold text-white">
                Quick Links
              </h4>

              <div className="mt-8 space-y-4">
                {quickLinks.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-[18px] text-white/70 transition hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-[24px] font-bold text-white">
                Support
              </h4>

              <div className="mt-8 space-y-4">
                {supportLinks.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block text-[18px] text-white/70 transition hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-[24px] font-bold text-white">
                Contact Us
              </h4>

              <div className="mt-8 space-y-6">
                <a
                  href={telegramLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
                >
                  <Send
                    size={20}
                    className="text-[#ff5aa8]"
                    strokeWidth={2.3}
                  />
                  <p className="text-[18px] text-white/70">Telegram</p>
                </a>

                <div className="flex items-center gap-4">
                  <Mail
                    size={20}
                    className="text-[#ff5aa8]"
                    strokeWidth={2.3}
                  />
                  <p className="text-[16px] text-white/70">
                    info@lovemarriageonline.store
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-[18px] bg-white/10 px-5 py-5">
                <h5 className="text-[18px] font-semibold text-white/90">
                  Available 24/7
                </h5>
                <p className="mt-3 text-[16px] leading-[1.5] text-white/55">
                  Our support team is always ready to help you
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <p className="text-[18px] text-white/60">
                © 2024 Love Marriage. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link
                  href="#"
                  className="text-[18px] text-white/60 transition hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-[18px] text-white/60 transition hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-[18px] text-white/60 transition hover:text-white"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}