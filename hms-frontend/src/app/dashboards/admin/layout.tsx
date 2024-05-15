'use client'
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/Sidebar';
import { ThemeProvider } from 'next-themes';
import './globals.css'; // Import global CSS for admin section

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">
          <body className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <SideBar />
            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
};  

export default AdminLayout;