import { useEffect } from "react";

const SplashDismiss = () => {
  useEffect(() => {
    if (typeof window.hideSplashScreen === "function") {
      window.hideSplashScreen();
    }
  }, []);

  return null;
};

export default SplashDismiss;
