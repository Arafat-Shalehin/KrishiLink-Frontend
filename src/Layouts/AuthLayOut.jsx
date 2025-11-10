import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Navbar from '../Components/Navbar';

const AuthLayout = () => {
    return (
        <div className='min-h-screen'>
            <header>
                <Navbar/>
            </header>
            <main className='w-11/12 mx-auto py-6'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;