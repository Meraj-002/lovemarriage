import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: `"I found my perfect match within 2 weeks of joining. The verification process made me feel secure. Highly recommended for serious people looking for marriage."`,
    name: "Anjali Deshmukh",
    role: "Software Engineer, Pune",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/49ed9b8935-f33bedfbfa079108ecd3.png",
  },
  {
    id: 2,
    text: `"The Diamond plan was worth every penny. Got instant access to quality profiles and the support team was very helpful throughout my journey."`,
    name: "Meera Patel",
    role: "Doctor, Ahmedabad",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2a5c6e6ff4-6323608b40360fd7a7f3.png",
  },
  {
    id: 3,
    text: `"Best matrimony platform I've used. The profiles are genuine and the instant WhatsApp access feature is amazing. Found my life partner here!"`,
    name: "Sneha Gupta",
    role: "Teacher, Delhi",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/686ada91f1-9615fd7ebfb992aa1a8e.png",
  },
  {
    id: 4,
    text: `"The advanced filters helped me find exactly what I was looking for. The customer support is excellent and very responsive. Thank you Love Marriage!"`,
    name: "Divya Singh",
    role: "CA, Mumbai",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f8cbd7c0b9-a98f0e4fe2350005165a.png",
  },
  {
    id: 5,
    text: `"Safe, secure and efficient. The verification badge on profiles gave me confidence. I'm grateful to have found my soulmate through this platform."`,
    name: "Kavita Rao",
    role: "Entrepreneur, Bangalore",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/3b03afd828-3f97edf62d57347b2f55.png",
  },
  {
    id: 6,
    text: `"Professional, trustworthy and results-oriented. The Gold plan gave me access to quality matches. Very happy with my experience on Love Marriage."`,
    name: "Ritika Malhotra",
    role: "Designer, Chandigarh",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/78c27299a9-0d2240317437ee5a66c3.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#fdf1f7] py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Top heading */}
        <div className="text-center">
          <div className="inline-flex rounded-full bg-[#f9dceb] px-6 py-2.5">
            <span className="text-sm font-bold uppercase tracking-wide text-[#ff2f92]">
              Testimonials
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[64px] font-bold leading-none tracking-[-0.03em] text-[#111827]">
            Success Stories
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[21px] leading-[1.6] text-[#4b5563]">
            Read what our happy members have to say
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-[24px] bg-white px-8 py-8 shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
            >
              {/* Stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className="fill-[#facc15] text-[#facc15]"
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="mt-7 text-[17px] italic leading-[1.7] text-[#374151]">
                {item.text}
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[54px] w-[54px] overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={54}
                    height={54}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-[18px] font-bold text-[#111827]">
                    {item.name}
                  </h3>
                  <p className="text-[16px] text-[#6b7280]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}