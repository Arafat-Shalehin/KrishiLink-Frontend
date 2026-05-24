import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  MapPin
} from "lucide-react";

import heroMangoes from "../Assets/hero-mangoes.png";

/* ─── Animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

/* ─── Card Data for Blooming Array ─── */
const cropCards = [
  {
    id: 1,
    title: "Miniket Rice",
    price: "৳68 / kg",
    location: "Dinajpur",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=400&auto=format&fit=crop",
    rotate: -20,
    x: -125,
    y: 40,
    zIndex: 10
  },
  {
    id: 2,
    title: "Fresh Tomatoes",
    price: "৳45 / kg",
    location: "Rangpur",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop",
    rotate: -10,
    x: -62,
    y: 15,
    zIndex: 20
  },
  {
    id: 3,
    title: "Rajshahi Mangoes",
    price: "৳62 / kg",
    location: "Shibganj",
    image: heroMangoes,
    rotate: 0,
    x: 0,
    y: 0,
    zIndex: 30 // Center card on top
  },
  {
    id: 4,
    title: "Bogura Potatoes",
    price: "৳35 / kg",
    location: "Bogura",
    image: "https://images.unsplash.com/photo-1518977673343-a4e0f40d2a93?q=80&w=400&auto=format&fit=crop",
    rotate: 10,
    x: 62,
    y: 15,
    zIndex: 20
  },
  {
    id: 5,
    title: "Red Chilies",
    price: "৳210 / kg",
    location: "Panchagarh",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop",
    rotate: 20,
    x: 125,
    y: 40,
    zIndex: 10
  }
];

const Hero = () => {
  const [hoveredId, setHoveredId] = useState(null);

  /* ─── Dynamic Card Positioning Logic ─── */
  const getCardProps = (card) => {
    let targetScale = 1;
    let targetOpacity = 1;
    let targetZIndex = card.zIndex;
    let targetX = card.x;
    let targetY = card.y;
    let targetRotate = card.rotate;

    if (hoveredId !== null) {
      if (hoveredId === card.id) {
        // Hovered Card: Elevate, straighten, scale, and push outward
        targetScale = 1.08;
        targetZIndex = 50;
        targetRotate = card.rotate * 0.4; // Straighten out for readability

        // Push outward into open space to avoid clipping
        if (card.x < -20) {
          targetX = card.x - 25;
          targetY = card.y - 35;
        } else if (card.x > 20) {
          targetX = card.x + 25;
          targetY = card.y - 35;
        } else {
          // Center card pushes straight up
          targetY = card.y - 45;
        }
      } else {
        // Non-Hovered Cards: Recede, fade, and shift away to yield space
        targetScale = 0.95;
        targetOpacity = 0.65;

        const hoveredCard = cropCards.find(c => c.id === hoveredId);
        if (hoveredCard) {
          if (card.x < hoveredCard.x) {
            targetX = card.x - 15; // Shift further left
          } else if (card.x > hoveredCard.x) {
            targetX = card.x + 15; // Shift further right
          }
          targetY = card.y + 15; // Sink downward slightly
        }
      }
    }

    return { targetScale, targetOpacity, targetZIndex, targetX, targetY, targetRotate };
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f4] dark:bg-[#0c0e13]">
      {/* ─── Soft ambient warm glow ─── */}
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#f3eddf]/60 dark:bg-[#1a1710]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[#e8f0e6]/50 dark:bg-[#0f1a14]/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-16 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-14 lg:gap-20 items-center">

          {/* ════════════════════════════════════
              LEFT COLUMN — Copy, CTAs, Trust
             ════════════════════════════════════ */}
          <div className="max-w-xl z-10 relative">

            {/* Tagline badge */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/70 dark:bg-emerald-950/30 px-4 py-1.5 text-[11px] font-semibold tracking-wide uppercase text-emerald-800 dark:text-emerald-400">
                <Leaf className="h-3.5 w-3.5" />
                Verified Farmers · Transparent Trade
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.08)}
              className="text-[2.5rem] sm:text-5xl xl:text-[3.4rem] font-bold tracking-tight leading-[1.13] text-slate-900 dark:text-slate-50"
            >
              Fresh Crops Direct{" "}
              <br className="hidden sm:block" />
              From Trusted Farmers
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              {...fadeUp(0.15)}
              className="mt-6 text-[1.05rem] leading-relaxed text-slate-600 dark:text-slate-400 max-w-md"
            >
              KrishiLink connects wholesale buyers, retailers, and exporters
              directly with local growers across Bangladesh — no middlemen,
              transparent pricing, and secure escrow on every trade.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.22)}
              className="mt-10 flex flex-col sm:flex-row gap-3.5"
            >
              <Link
                to="/all-crops"
                className="group inline-flex items-center justify-center rounded-xl bg-emerald-700 px-7 py-3.5 text-[15px] font-semibold text-white shadow-sm hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 gap-2"
              >
                Explore Marketplace
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/dashboard/farmer/crops/add"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-7 py-3.5 text-[15px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 active:scale-[0.98] transition-all duration-200 gap-2"
              >
                Become a Seller
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-slate-500 dark:text-slate-400"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                Verified local farmers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                45+ districts covered
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                Secure escrow protection
              </span>
            </motion.div>
          </div>

          {/* ════════════════════════════════════
              RIGHT COLUMN — Organic Fanning Array
             ════════════════════════════════════ */}
          <div className="relative w-full h-[250px] sm:h-[450px] lg:h-[550px] flex items-center justify-center lg:justify-end">
            <div className="relative flex items-center justify-center scale-[0.45] 
            sm:scale-[0.75] lg:scale-100 origin-center lg:origin-right lg:pr-10">
              {/* The anchor point for all cards */}
              <div className="relative w-[350px] h-[430px] lg:w-[400px] lg:h-[480px]">
                {cropCards.map((card, index) => {
                  const props = getCardProps(card);
                  const isHovered = hoveredId === card.id;

                  return (
                    <motion.div
                      key={card.id}
                      onMouseEnter={() => setHoveredId(card.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: 0,
                        y: 100,
                        rotate: 0
                      }}
                      animate={{
                        opacity: props.targetOpacity,
                        scale: props.targetScale,
                        x: props.targetX,
                        y: props.targetY,
                        rotate: props.targetRotate,
                        zIndex: props.targetZIndex
                      }}
                      transition={{
                        // Stagger fan out on initial load, but fast & fluid transitions on hover
                        delay: hoveredId === null && props.targetScale === 1 ? 0.2 + (index * 0.1) : 0,
                        duration: hoveredId === null ? 0.9 : 0.5,
                        type: "spring",
                        stiffness: hoveredId === null ? 45 : 250,
                        damping: hoveredId === null ? 14 : 28,
                        mass: 1.2
                      }}
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden 
                      shadow-xl dark:shadow-black/40 border border-slate-100 dark:border-slate-800 flex flex-col cursor-pointer"
                      style={{
                        boxShadow: isHovered
                          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      {/* Card Image */}
                      <div className="h-[65%] w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <motion.img
                          src={card.image}
                          alt={card.title}
                          animate={{ scale: isHovered ? 1.12 : 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>

                      {/* Card Details */}
                      <div className="h-[35%] w-full p-4 flex flex-col justify-between bg-white dark:bg-slate-900 pointer-events-none">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                            {card.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{card.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {card.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
