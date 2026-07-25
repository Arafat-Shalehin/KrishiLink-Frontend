import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Loader from "./Components/Loader";
import SplashDismiss from "./Components/SplashDismiss";

const Hero = lazy(() => import("./Components/Hero"));
const LatestCrop = lazy(() => import("./Components/LatestCrop"));
const HowItWorks = lazy(() => import("./Components/HowItWorks"));
const AgroNews = lazy(() => import("./Components/AgroNews"));
const PartnerShips = lazy(() => import("./Components/PartnerShips"));
const OurMissionImpact = lazy(() => import("./Components/OurMissionImpact"));

function App() {
  /* ─── Track window scroll ─── */
  const { scrollY } = useScroll();

  /* ─── Responsive Slide Distance & Timing ─── */
  const [slideDistance, setSlideDistance] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Always use full viewport height — guarantees content layer
      // slides entirely from bottom to top before normal scroll resumes
      setSlideDistance(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Hero fade uses delayed 3-point keyframes so it stays visible
     until the content layer has physically covered most of it.
     Mobile: stays at 100% opacity until 70% covered, then fades.
     Desktop: starts a gentle fade at 50%, completes at 100%. */
  const heroOpacity = useTransform(
    scrollY,
    isMobile
      ? [0, slideDistance * 0.7, slideDistance]
      : [0, slideDistance * 0.5, slideDistance],
    isMobile
      ? [1, 1, 0]
      : [1, 0.8, 0]
  );

  /* Subtler scale on mobile for controlled, restrained motion */
  const heroScale = useTransform(
    scrollY,
    [0, slideDistance],
    isMobile ? [1, 0.98] : [1, 0.95]
  );

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

          {/* Spacer: always 100dvh — guarantees the content layer
              traverses the full viewport before sticky pinning ends. */}
          <div className="h-[100dvh]" aria-hidden="true" />
        </div>

        {/* ═══════════════════════════════════════
            CONTENT LAYER — slides up over the hero
           ═══════════════════════════════════════ */}
        <div className="relative z-10 -mt-[100dvh]">
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
        <SplashDismiss />
      </div>
    </Suspense>
  );
}

export default App;