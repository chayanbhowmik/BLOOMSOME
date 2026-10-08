"use client";

export default function Marquee() {
  return (
    <section
      className="bg-sage/60 text-ink text-[11px] tracking-[0.1em] overflow-hidden py-3 whitespace-nowrap"
      aria-label="BLOOMSOME values"
    >
      <div className="animate-[drift_24s_linear_infinite] inline-block">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            EVERLASTING JOY <span className="text-[#7a8a3e] mx-5">✿</span>{" "}
            HANDMADE WITH HEART <span className="text-[#7a8a3e] mx-5">✿</span>{" "}
            THOUGHTFUL GIFTING <span className="text-[#7a8a3e] mx-5">✿</span>{" "}
            FREE DELIVERY ABOVE ₹999 <span className="text-[#7a8a3e] mx-5">✿</span>{" "}
          </span>
        ))}
      </div>
    </section>
  );
}
