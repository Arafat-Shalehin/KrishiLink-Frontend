import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <div className="min-h-screen">
      <ScrollToTop/>
      <header>
        <Navbar />
      </header>
      <main className="w-11/12 mx-auto py-6">
        {navigation.state === "loading" ? <Loader /> : <Outlet></Outlet>}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default AuthLayout;
