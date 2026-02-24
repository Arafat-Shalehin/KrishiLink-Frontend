import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

import imageOne from "../Assets/pexels-brian-wijoyo-2156646375-34601487.jpg";
import imageTwo from "../Assets/pexels-zen-chung-5529952.jpg";
import imageThree from "../Assets/pexels-quang-nguyen-vinh-222549-2131784.jpg";
import imageFour from "../Assets/pexels-nc-farm-bureau-mark-2886937.jpg";

/* ---------------------------------------------
   Hero Content (Data-driven)
--------------------------------------------- */
const heroData = [
  {
    text: "Connecting Farmers, Traders & Consumers",
    subtext:
      "Join KrishiLink — the digital network empowering every hand in agriculture.",
    cta: "Join the Community",
    href: "/about",
    image: imageOne,
  },
  {
    text: "Grow Together, Trade Smarter",
    subtext:
      "Discover new markets, share your harvest, and collaborate directly with others in your region.",
    cta: "Explore Posts",
    href: "/all-crops",
    image: imageTwo,
  },
  {
    text: "Your Farm, Your Network",
    subtext:
      "Post what you’re growing or selling and connect instantly with people who care.",
    cta: "Start Posting",
    href: "dashboard/farmer/crops/add",
    image: imageThree,
  },
  {
    text: "Building the Future of Farming — Digitally",
    subtext:
      "KrishiLink bridges rural and urban communities to create a smarter, connected agro world.",
    cta: "Learn More",
    href: "/about",
    image: imageFour,
  },
];

/* ---------------------------------------------
   Animation Variants (Static, Reusable)
--------------------------------------------- */
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      /* ── Faster sequencing: reduced stagger and delay ── */
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const heroChildVariants = {
  hidden: { opacity: 0, y: 30 }, // Slide up from bottom looks better than dropping
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a "premium" feel
    },
  },
};

/* ---------------------------------------------
   Hero Component
 --------------------------------------------- */
const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev < heroData.length - 1 ? prev + 1 : 0));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000); // Slightly longer pause for readability
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlide = heroData[slideIndex];

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${currentSlide.image})`,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 bg-cover bg-center"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/80 via-[var(--color-primary)]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-8 md:px-16 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.text}
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h1
              variants={heroChildVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] drop-shadow-2xl"
            >
              {currentSlide.text}
            </motion.h1>

            <motion.p
              variants={heroChildVariants}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
            >
              {currentSlide.subtext}
            </motion.p>

            <motion.div variants={heroChildVariants} className="pt-2">
              <Link
                to={currentSlide.href}
                className="inline-flex items-center bg-[var(--color-accent)] text-[var(--color-text)]
                font-bold text-base sm:text-lg rounded-full px-8 py-3.5 gap-3
                shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all"
              >
                {currentSlide.cta}
                <FaArrowRight className="text-[var(--color-secondary)]" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute mt-12 flex gap-4">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === slideIndex
                ? "w-10 bg-[var(--color-accent)]"
                : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
