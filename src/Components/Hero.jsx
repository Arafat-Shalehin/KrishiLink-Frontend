import React, { useEffect, useState, useCallback } from "react";
import imageOne from "../Assets/pexels-brian-wijoyo-2156646375-34601487.jpg";
import imageTwo from "../Assets/pexels-zen-chung-5529952.jpg";
import imageThree from "../Assets/pexels-quang-nguyen-vinh-222549-2131784.jpg";
import imageFour from "../Assets/pexels-nc-farm-bureau-mark-2886937.jpg";
import { FaArrowRight } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const heroData = [
  {
    text: "Connecting Farmers, Traders & Consumers",
    subtext:
      "Join KrishiLink — the digital network empowering every hand in agriculture.",
    cta: "Join the Community",
    image: imageOne,
  },
  {
    text: "Grow Together, Trade Smarter",
    subtext:
      "Discover new markets, share your harvest, and collaborate directly with others in your region.",
    cta: "Explore Posts",
    image: imageTwo,
  },
  {
    text: "Your Farm, Your Network",
    subtext:
      "Post what you’re growing or selling and connect instantly with people who care.",
    cta: "Start Posting",
    image: imageThree,
  },
  {
    text: "Building the Future of Farming — Digitally",
    subtext:
      "KrishiLink bridges rural and urban communities to create a smarter, connected agro world.",
    cta: "Learn More",
    image: imageFour,
  },
];

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Simple fade-up variant
  const childVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const nextSlide = useCallback(() => {
    setSlideIndex((prevIndex) =>
      prevIndex < heroData.length - 1 ? prevIndex + 1 : 0
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background image with smooth fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroData[slideIndex].image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${heroData[slideIndex].image})`,
          }}
          className="absolute inset-0 bg-cover bg-center"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-green-900/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-8 md:px-16 text-white space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroData[slideIndex].text}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.6,
                },
              },
              hidden: {},
              exit: {
                opacity: 0,
                y: -30,
                transition: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          >
            {/* HEADER */}
            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            >
              {heroData[slideIndex].text}
            </motion.h1>

            {/* SUBTEXT */}
            <motion.p
              variants={childVariants}
              className="mt-4 text-lg md:text-xl text-gray-100/90 max-w-xl leading-relaxed"
            >
              {heroData[slideIndex].subtext}
            </motion.p>

            {/* BUTTON */}
            <motion.a
              href={
                heroData[slideIndex].cta === "Explore Posts"
                  ? "/all-crops"
                  : heroData[slideIndex].cta === "Start Posting"
                  ? "/add-crops"
                  : "/about"
              }
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center mt-8 bg-white text-green-900 font-semibold text-lg md:text-xl rounded-full px-6 py-3 gap-2 shadow-md hover:bg-green-100 transition"
            >
              {heroData[slideIndex].cta}
              <FaArrowRight className="text-green-800" />
            </motion.a>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute flex gap-3">
          {heroData.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === slideIndex
                  ? "bg-white scale-125"
                  : "bg-gray-300 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
