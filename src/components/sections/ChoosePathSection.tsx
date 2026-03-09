"use client";

export default function ChoosePathSection() {
  return (
    <section
      id="choose-path"
      className="relative bg-background-elevated/95 backdrop-blur-sm pt-10 sm:pt-12 md:pt-10 pb-6 md:pb-6 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,167,75,0.06),transparent)]" />
      <div className="relative text-center px-5 sm:px-6">
        <p
          className="uppercase text-gold/75"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.64rem, 2.7vw, 0.72rem)",
            letterSpacing: "0.28em",
            marginBottom: "0.45rem",
          }}
        >
          Programs
        </p>
        <h2
          className="text-[clamp(2.4rem,16vw,4.8rem)] md:text-6xl lg:text-7xl text-white leading-[0.88]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          CHOOSE YOUR
          <span className="block text-gradient-gold">PATH</span>
        </h2>
      </div>
    </section>
  );
}
