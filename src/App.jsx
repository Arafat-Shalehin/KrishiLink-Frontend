import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Loader from "./Components/Loader";

const Hero = lazy(() => import("./Components/Hero"));
const LatestCrop = lazy(() => import("./Components/LatestCrop"));
const HowItWorks = lazy(() => import("./Components/HowItWorks"));
const AgroNews = lazy(() => import("./Components/AgroNews"));
const PartnerShips = lazy(() => import("./Components/PartnerShips"));
const OurMissionImpact = lazy(() => import("./Components/OurMissionImpact"));

function App() {
  /* ─── Track window scroll ─── */
  const { scrollY } = useScroll();

  /* ─── Responsive Slide Distance State ─── */
  const [slideDistance, setSlideDistance] = useState(800); // default fallback

  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 768px): transition over 50vh for a lighter feel
      // Desktop (>= 768px): transition over full 100vh for cinematic feel
      const isMobile = window.innerWidth < 768;
      setSlideDistance(isMobile ? window.innerHeight * 0.5 : window.innerHeight);
    };

    // Initial calculation
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Hero fades out and scales down smoothly across the dynamically calculated slide distance */
  const heroOpacity = useTransform(scrollY, [0, slideDistance], [1, 0]);
  const heroScale = useTransform(scrollY, [0, slideDistance], [1, 0.95]);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        {/* ═══════════════════════════════════════
            HERO — pinned behind the content layer
           ═══════════════════════════════════════ */}
        <div className="relative">
          {/* Sticky hero: pinned during the scroll reveal.
              min-h-[100dvh] ensures it behaves gracefully on mobile with address bars
              without aggressively clipping content if it happens to be slightly taller.
              On desktop, it locks to h-screen. */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="sticky top-0 z-0 min-h-[100dvh] lg:h-screen w-full lg:overflow-hidden will-change-transform"
          >
            <Hero />
          </motion.div>

          {/* Spacer forces the user to scroll while the Hero remains pinned.
              Mobile: 50vh scroll | Desktop: 100vh scroll */}
          <div className="h-[50vh] md:h-[100vh]" aria-hidden="true" />
        </div>

        {/* ═══════════════════════════════════════
            CONTENT LAYER — slides up over the hero
           ═══════════════════════════════════════ */}
        <div className="relative z-10 -mt-[50vh] md:-mt-[100vh]">
          {/* Rounded-top panel with subtle shadow for layered depth */}
          <div
            className="rounded-t-[2rem] sm:rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.25)] bg-[var(--color-bg,#ffffff)] dark:bg-[#0c0e13] overflow-hidden"
          >
            <div className="*:py-10 md:*:py-20">
              <LatestCrop />
              <HowItWorks />
              <AgroNews />
              <PartnerShips />
              <OurMissionImpact />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;