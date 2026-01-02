import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

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
    href: "/add-crops",
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
      staggerChildren: 0.3,
      delayChildren: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const heroChildVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlide = heroData[slideIndex];

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ backgroundImage: `url(${currentSlide.image})` }}
          className="absolute inset-0 bg-cover bg-center"
        />
      </AnimatePresence>

      {/* Overlay (palette-based) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-8 md:px-16 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.text}
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <motion.h1
              variants={heroChildVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
            >
              {currentSlide.text}
            </motion.h1>

            <motion.p
              variants={heroChildVariants}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
            >
              {currentSlide.subtext}
            </motion.p>

            <motion.a
              href={currentSlide.href}
              variants={heroChildVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center mt-6 bg-[var(--color-accent)] text-[var(--color-text)]
              font-semibold text-base sm:text-lg md:text-lg rounded-full px-6 py-3 gap-2
              shadow-md hover:brightness-95 transition"
            >
              {currentSlide.cta}
              <FaArrowRight className="text-[var(--color-secondary)]" />
            </motion.a>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute mt-10 flex gap-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === slideIndex
                  ? "bg-[var(--color-accent)] scale-125"
                  : "bg-white/55 hover:bg-white/80"
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
