import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from "react-router"

const HomeLayOut = () => {
    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className='min-h-screen'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayOut;