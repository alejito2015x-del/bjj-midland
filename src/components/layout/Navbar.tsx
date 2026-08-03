"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useRegistrationModal } from "@/context/RegistrationModalContext";
import { SITE_CONFIG } from "@/lib/constants";

const NAV_LINKS = [
  { name: "HOME", href: "/#hero" },
  { name: "PROGRAMS", href: "/#programs" },
  { name: "SCHEDULE", href: "/#schedule" },
  { name: "GALLERY", href: "/gallery" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];
const NAV_SCROLL_OFFSET = 96;
const HERO_HASH = "#hero";
const PROGRAMS_HASH = "#programs";
const PROGRAMS_FOCUS_PROGRESS = 0.3;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useRegistrationModal();

  const scrollToProgramsFocus = useCallback(() => {
    const focusEl = document.querySelector<HTMLElement>('[data-programs-focus="gi"]');
    // Skip hidden elements (e.g. desktop section hidden on mobile via display:none)
    const isRendered = focusEl && focusEl.getBoundingClientRect().height > 0;
    const target = (isRendered ? focusEl : null) ?? document.querySelector<HTMLElement>(PROGRAMS_HASH);

    if (!target) return false;

    const rect = target.getBoundingClientRect();
    const absTop = window.scrollY + rect.top;
    const range = Math.max(0, target.offsetHeight - window.innerHeight);
    const offset = isRendered ? NAV_SCROLL_OFFSET : 56;
    const targetTop =
      range > 0 ? absTop + range * PROGRAMS_FOCUS_PROGRESS : absTop - offset;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    if (window.location.hash !== PROGRAMS_HASH) {
      window.history.replaceState(null, "", PROGRAMS_HASH);
    }
    return true;
  }, []);

  const scrollToHashWithOffset = useCallback((hash: string) => {
    if (hash === HERO_HASH) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash !== HERO_HASH) {
        window.history.replaceState(null, "", HERO_HASH);
      }
      return;
    }

    if (hash === PROGRAMS_HASH && scrollToProgramsFocus()) {
      return;
    }

    const el = document.querySelector(hash);
    if (!el) return;
    const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, [scrollToProgramsFocus]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Handle hash links (e.g. /#programs, /#schedule)
      if (href.startsWith("/#")) {
        const hash = href.slice(1); // e.g. "#programs"
        if (pathname === "/") {
          // Already on homepage, just scroll
          e.preventDefault();
          scrollToHashWithOffset(hash);
        }
        // If not on homepage, Link will navigate to / and the hash will scroll
      }
      setIsOpen(false);
    },
    [pathname, scrollToHashWithOffset]
  );

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;

    const raf = window.requestAnimationFrame(() => {
      scrollToHashWithOffset(window.location.hash);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [pathname, scrollToHashWithOffset]);

  useEffect(() => {
    if (pathname !== "/") return;

    const onHashChange = () => {
      if (!window.location.hash) return;
      scrollToHashWithOffset(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, scrollToHashWithOffset]);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-2.5 md:py-3 transition-all duration-300 ${scrolled && !menuVisible ? "bg-black/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
    >
      <div
        className="w-full px-4 md:px-8 lg:px-12"
        style={{ maxWidth: "1280px", marginInline: "auto" }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, "/#hero")}
            className="relative z-50 flex items-center gap-2 md:gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/logo-nav-v5.png"
                alt="Midland BJJ & MMA"
                fill
                className="object-cover scale-[1.11]"
                priority
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>
            <span
              className="hidden lg:block text-white text-xl xl:text-2xl tracking-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MIDLAND <span className="text-gold">BJJ/MMA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-2 py-2 text-text-secondary hover:text-white transition-colors duration-300 text-xs tracking-[0.18em] font-medium uppercase group"
              >
                {link.name}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="flex items-center gap-1.5 text-text-secondary hover:text-gold transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs tracking-wider">{SITE_CONFIG.phone}</span>
            </a>
            <Link
              href="/contact"
              onClick={(e) => { e.preventDefault(); openModal("trial"); }}
              className="btn-predator btn-gold px-4 py-2 text-xs whitespace-nowrap"
            >
              FREE TRIAL
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => { const next = !isOpen; setIsOpen(next); if (next) setMenuVisible(true); }}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence onExitComplete={() => setMenuVisible(false)}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 lg:hidden"
          >

            <nav className="relative h-full flex flex-col items-center justify-center px-6 pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]">
              <div className="flex flex-col items-center gap-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white text-3xl sm:text-4xl md:text-5xl hover:text-gold transition-colors duration-300 uppercase tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.2 }}
                className="mt-12 flex flex-col items-center gap-6"
              >
                <Link
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); openModal("trial"); }}
                  className="btn-predator btn-gold px-8 py-4 text-base sm:text-lg"
                >
                  START FREE TRIAL
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="flex items-center gap-2 text-gold"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-base sm:text-lg tracking-wider">{SITE_CONFIG.phone}</span>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 left-0 right-0 text-center"
              >
                <p className="text-text-muted text-xs tracking-[0.2em] uppercase">
                  @bjjmidland
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
