"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeEndRef = useRef<{ x: number; y: number } | null>(null);

  const pauseAutoplayAfterManualAction = () => {
    setIsAutoplayPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    // Resume autoplay only after a period without additional clicks.
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 12000);
  };

  const handleNext = () => {
    pauseAutoplayAfterManualAction();
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    pauseAutoplayAfterManualAction();
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const point = { x: touch.clientX, y: touch.clientY };
    swipeStartRef.current = point;
    swipeEndRef.current = point;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    swipeEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    const start = swipeStartRef.current;
    const end = swipeEndRef.current;
    swipeStartRef.current = null;
    swipeEndRef.current = null;
    if (!start || !end) return;

    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) return;
    if (deltaX < 0) {
      handleNext();
      return;
    }
    handlePrev();
  };

  useEffect(() => {
    if (!autoplay || testimonials.length < 2 || isAutoplayPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length, isAutoplayPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const rotateByIndex = (index: number) => ((index * 5) % 7) - 3;

  if (!testimonials.length) return null;

  return (
    <div
      className={cn(
        "mx-auto max-w-sm px-4 py-20 md:max-w-4xl md:px-8 lg:px-12",
        className
      )}
    >
      <div
        className="relative grid grid-cols-1 gap-20 md:grid-cols-2 md:items-stretch md:min-h-[520px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div>
          <div className="mb-4 flex h-[6.4rem] items-end justify-center md:h-[5.2rem]">
            <AnimatePresence mode="wait">
              <motion.h3
                key={`coach-image-title-${active}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="text-center text-[clamp(1.7rem,5.8vw,2.3rem)] leading-[1.05] text-white"
              >
                {testimonials[active].designation}
              </motion.h3>
            </AnimatePresence>
          </div>
          <div className="relative h-[430px] w-full md:h-[520px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotateByIndex(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.98,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotateByIndex(index),
                    zIndex: isActive(index) ? 20 : testimonials.length + 2 - index,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotateByIndex(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-center"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-4 pt-4 md:pt-5">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
              aria-label="Previous testimonial"
              type="button"
            >
              <ChevronLeft className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
              aria-label="Next testimonial"
              type="button"
            >
              <ChevronRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 md:min-h-[520px]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-foreground">{testimonials[active].name}</h3>
            <motion.p className="mt-5 text-lg text-muted-foreground">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
