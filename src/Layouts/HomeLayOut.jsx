import React, { Suspense } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useNavigation } from "react-router";
import Loader from "../Components/Loader";
import ScrollToTop from "../Components/ScrollToTop";

const HomeLayOut = () => {
  const navigation = useNavigation();
  return (
    <div>
      <ScrollToTop />
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Suspense fallback={<Loader />}>
          {navigation.state === "loading" ? <Loader /> : <Outlet />}
        </Suspense>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayOut;