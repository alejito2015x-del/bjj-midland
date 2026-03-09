"use client";

export default function ChoosePathSection() {
  return (
    <section
      id="choose-path"
      className="relative bg-background-elevated/95 backdrop-blur-sm pt-8 md:pt-10 pb-5 md:pb-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,167,75,0.05),transparent)]" />
      <div className="relative text-center px-6">
        <h2
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[0.9]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          CHOOSE YOUR
          <span className="block text-gradient-gold">PATH</span>
        </h2>
      </div>
    </section>
  );
}
