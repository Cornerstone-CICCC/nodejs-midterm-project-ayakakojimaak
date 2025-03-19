import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full py-4 md:py-12 px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
