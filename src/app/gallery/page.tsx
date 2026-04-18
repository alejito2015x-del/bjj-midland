"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const galleryImages = [
  "/images/gallery/gallery-01.png",
  "/images/gallery/gallery-02.png",
  "/images/gallery/gallery-03.png",
  "/images/gallery/gallery-04.png",
  "/images/gallery/gallery-05.png",
  "/images/gallery/gallery-06.png",
  "/images/gallery/gallery-07.png",
  "/images/gallery/gallery-08.png",
  "/images/gallery/gallery-09.png",
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <Image
            src="/images/gallery-hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,167,75,0.1),transparent)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                Our Community
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                WARRIOR
                <span className="block text-gradient-gold">GALLERY</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Training moments, competitions, and community. This is what we do.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-background-elevated">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative cursor-pointer group ${
                    index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div
                    className={`relative overflow-hidden ${
                      index % 5 === 0 ? "h-[400px]" : "h-48 md:h-56"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-gold flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-background"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors z-10"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 p-2 text-white hover:text-gold transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={40} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 p-2 text-white hover:text-gold transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={40} />
              </button>

              {/* Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage]}
                  alt={`Gallery image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,75,0.05)_0%,transparent_70%)]" />

          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                BE PART OF <span className="text-gradient-gold">THE FAMILY</span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                The next photo could be yours. Join our community of warriors.
              </p>
              <Link
                href="/contact"
                className="inline-flex btn-predator btn-gold px-10 py-5 text-lg"
              >
                <span>Book My Free Class</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
