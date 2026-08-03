"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/#hero" },
  { name: "Programs", href: "/#programs" },
  { name: "Schedule", href: "/#schedule" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const PROGRAMS = [
  { name: "BJJ Gi", href: "/classes#bjj-gi" },
  { name: "No-Gi", href: "/classes#no-gi" },
  { name: "MMA", href: "/classes#mma" },
  { name: "Kids Programs", href: "/classes" },
  { name: "Private Training", href: "/contact" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/midlandbjj/", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com/bjjmidland", icon: Facebook },
  { name: "YouTube", href: "https://youtube.com/@bjjmidland", icon: Youtube },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-elevated border-t border-border relative overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div aria-hidden="true" className="h-0.5 md:h-1" />

      {/* Main Footer Content */}
      <div
        className="w-full px-5 md:px-12 py-6 md:py-10"
        style={{ maxWidth: "1280px", marginInline: "auto" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-y-8 md:gap-x-10 lg:gap-x-12 text-center md:text-left">
          {/* Brand Column */}
          <div className="lg:col-span-1 mt-1 md:mt-2">
            <Link href="/#hero" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/jaguar-logo.png"
                  alt="Stay Relentless BJJ"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <span
                  className="text-white text-xl tracking-tight block leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  STAY RELENTLESS
                </span>
                <span className="text-gold text-[10px] tracking-[0.15em] uppercase">
                  Est. 2000
                </span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
              Premier Brazilian Jiu Jitsu and MMA training center in Midland, Texas.
              Building warriors since 2000.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-background border border-border hover:border-gold hover:text-gold transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-[15px] h-[15px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile Compact Sections */}
          <div className="md:hidden pt-0.5">
            <div className="mx-auto grid w-fit grid-cols-[max-content_max-content] justify-center gap-x-10 gap-y-5 text-left">
              <div>
                <h4
                  className="text-white text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Navigation
                </h4>
                <div className="h-2.5" />
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={`mobile-nav-${link.href}`}
                      href={link.href}
                      className="block text-text-secondary hover:text-gold transition-colors text-[0.95rem] leading-tight"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h4
                  className="text-white text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Programs
                </h4>
                <div className="h-2.5" />
                <nav className="flex flex-col gap-2">
                  {PROGRAMS.map((program) => (
                    <Link
                      key={`mobile-program-${program.href}`}
                      href={program.href}
                      className="block text-text-secondary hover:text-gold transition-colors text-[0.95rem] leading-tight"
                    >
                      {program.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="col-span-2 mx-auto w-full max-w-[330px] text-center">
                <h4
                  className="text-white text-xs tracking-[0.12em] uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Contact
                </h4>
                <div className="h-2.5" />
                <div className="grid grid-cols-1 gap-2.5">
                  <a
                    href="tel:+14322305545"
                    className="flex items-center justify-center gap-2.5 text-text-secondary hover:text-gold transition-colors text-[0.95rem] leading-tight"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    (432) 230-5545
                  </a>
                  <a
                    href="mailto:Midlandbjj@yahoo.com"
                    className="flex items-center justify-center gap-2.5 text-text-secondary hover:text-gold transition-colors text-[0.95rem] leading-tight"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    Midlandbjj@yahoo.com
                  </a>
                  <div className="flex items-start justify-center gap-2.5 text-text-secondary text-[0.95rem] leading-tight">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>
                      4612 Billingsley Blvd<br />
                      Midland, TX 79705
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:block pt-3 md:pt-4">
            <h4
              className="text-white text-sm tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Navigation
            </h4>
            <div className="h-4 md:h-6" />
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-text-secondary hover:text-gold transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Programs */}
          <div className="hidden md:block pt-3 md:pt-4">
            <h4
              className="text-white text-sm tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Programs
            </h4>
            <div className="h-4 md:h-6" />
            <nav className="flex flex-col gap-4">
              {PROGRAMS.map((program) => (
                <Link
                  key={program.href}
                  href={program.href}
                  className="block text-text-secondary hover:text-gold transition-colors text-sm"
                >
                  {program.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="hidden md:block pt-3 md:pt-4">
            <h4
              className="text-white text-sm tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact
            </h4>
            <div className="h-4 md:h-6" />
            <div className="flex flex-col gap-5">
              <a
                href="tel:+14322305545"
                className="flex items-center justify-center md:justify-start gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                (432) 230-5545
              </a>
              <a
                href="mailto:Midlandbjj@yahoo.com"
                className="flex items-center justify-center md:justify-start gap-3 text-text-secondary hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-gold" />
                Midlandbjj@yahoo.com
              </a>
              <div className="flex items-center md:items-start justify-center md:justify-start gap-3 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-left">
                  4612 Billingsley Blvd<br />
                  Midland, TX 79705
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div aria-hidden="true" className="h-1 md:h-2" />
        <div
          className="w-full px-6 md:px-12"
          style={{ maxWidth: "1280px", marginInline: "auto" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
            <p className="text-text-muted text-xs tracking-wider text-center md:text-left">
              © {currentYear} MIDLAND BJJ & MMA. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-text-muted hover:text-gold transition-colors text-xs tracking-wider"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-text-muted hover:text-gold transition-colors text-xs tracking-wider"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="h-1 md:h-2" />
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.02] pointer-events-none">
        <Image
          src="/images/jaguar-logo.png"
          alt=""
          fill
          sizes="400px"
          className="object-contain grayscale"
        />
      </div>
    </footer>
  );
}
