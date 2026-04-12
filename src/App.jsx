import React, { lazy, Suspense } from "react";
import Loader from "./Components/Loader";

const Hero = lazy(() => import("./Components/Hero"));
const LatestCrop = lazy(() => import("./Components/LatestCrop"));
const HowItWorks = lazy(() => import("./Components/HowItWorks"));
const AgroNews = lazy(() => import("./Components/AgroNews"));
const PartnerShips = lazy(() => import("./Components/PartnerShips"));
const OurMissionImpact = lazy(() => import("./Components/OurMissionImpact"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="*:py-10 md:*:py-20">
        <Hero />
        <LatestCrop />
        <HowItWorks />
        <AgroNews />
        <PartnerShips />
        <OurMissionImpact />
      </div>
    </Suspense>
  );
}

export default App;