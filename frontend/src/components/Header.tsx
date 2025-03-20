import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = useAuthStore();
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
              {username ? (
                <Link to="/profile" className="hover:opacity-80 transition-colors duration-200">
                  {username}
                </Link>
              ) : (
                <Link to="/signin" className="hover:opacity-80 transition-colors duration-200">
                  Sign In
                </Link>
              )}
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
            <Link to="/carts" className="block px-4 py-2 text-sm hover:opacity-80">
              Cart
            </Link>
            <Link to="/favorites" className="block px-4 py-2 text-sm hover:opacity-80">
              Favorites
            </Link>
            {username ? (
              <Link to="/profile" className="block px-4 py-2 text-sm hover:opacity-80">
                Profile
              </Link>
            ) : (
              <Link to="/signin" className="block px-4 py-2 text-sm hover:opacity-80">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
