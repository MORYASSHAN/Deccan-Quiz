import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


const Layout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
