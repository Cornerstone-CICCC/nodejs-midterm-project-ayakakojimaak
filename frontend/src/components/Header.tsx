import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-stone-200 text-white">
      <div className="container max-w-7xl mx-auto w-full p-2 md:px-10 md:py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/bitters.svg" alt="BITTERS Liquor Co." style={{ height: "40px" }} />
            </div>
          </Link>
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-5 items-center text-stone-800">
              <Link to="/carts" className="hover:opacity-80 transition-colors duration-200">
                <FaShoppingCart />
              </Link>
              <Link to="/favorites" className="hover:opacity-80 transition-colors duration-200">
                <FaHeart />
              </Link>
              <Link to="/signin" className="hover:opacity-80 transition-colors duration-200">
                Login
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-stone-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 text-stone-800">
            <Link to="/" className="block px-4 py-2 text-sm hover:opacity-80">
              Home
            </Link>
            <Link to="/signin" className="block px-4 py-2 text-sm hover:opacity-80 flex items-center gap-2">
              Login
            </Link>
            <Link to="/signup" className="block px-4 py-2 text-sm hover:opacity-80">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
