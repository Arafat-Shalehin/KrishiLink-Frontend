import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";
import SplashDismiss from "../Components/SplashDismiss";

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="min-h-screen">
      <ScrollToTop/>
      <header>
        <Navbar />
      </header>
      <main>
        {navigation.state === "loading" ? (
          <Loader />
        ) : (
          <>
            <Outlet />
            <SplashDismiss />
          </>
        )}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
