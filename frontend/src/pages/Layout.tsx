import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isHome = window.location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Header />
      {isHome && <Banner />}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:py-12 md:px-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
