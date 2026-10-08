"use client";

export default function Marquee() {
  return (
    <section
      className="bg-sage text-ink text-[11px] tracking-[0.12em] overflow-hidden py-3 whitespace-nowrap"
      aria-label="BLOOMSOME values"
    >
      <div className="animate-[drift_24s_linear_infinite] inline-block">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i}>
            EVERLASTING JOY <span className="text-[#a7ac46] mx-5">✳</span>{" "}
            HANDMADE WITH HEART <span className="text-[#a7ac46] mx-5">✳</span>{" "}
            THOUGHTFUL GIFTING <span className="text-[#a7ac46] mx-5">✳</span>{" "}
          </span>
        ))}
      </div>
    </section>
  );
}
