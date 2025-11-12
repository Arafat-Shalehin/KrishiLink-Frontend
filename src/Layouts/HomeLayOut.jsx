import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useNavigation } from "react-router";
import Loader from "../Components/Loader";

const HomeLayOut = () => {
  const navigation = useNavigation();
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>{navigation.state === "loading" ? <Loader /> : <Outlet />}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayOut;
