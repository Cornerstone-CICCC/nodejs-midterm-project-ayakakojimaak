import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="flex items-center space-x-2">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight">Title</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-gray-300 transition-colors duration-200">
              Dashboard
            </Link>
            <Link to="/signin" className="hover:text-gray-300 transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-gray-300 transition-colors duration-200">
              Sign Up
            </Link>
          </nav>

          {/* mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
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

        {/* mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 bg-gray-800 rounded-md shadow-lg">
            <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200">
              Home
            </Link>
            <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200">
              Dashboard
            </Link>
            <Link to="/signin" className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/signup" className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
