import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/krishisamarth.logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-15 w-20" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-grow">
            <NavLink
              exact
              to="/"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </NavLink>
            {/* <NavLink
              to="/services"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </NavLink> */}
            <NavLink
              to="/chat"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat
            </NavLink>
            <NavLink
              to="/marketplace"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/login"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              activeClassName="active-link"
              className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </NavLink>
          </div>

          {/* Hamburger menu for mobile screens */}
          <div className="md:hidden relative">
            <button
              type="button"
              className="text-white hover:text-white focus:outline-none focus:text-white"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            {isOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                <div className="px-2 py-2 space-y-1 sm:px-3">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    About
                  </NavLink>
                  {/* <NavLink
                    to="/services"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Services
                  </NavLink> */}
                  <NavLink
                    to="/chat"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Chat
                  </NavLink>
                  <NavLink
                    to="/marketplace"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Marketplace
                  </NavLink>
                  <NavLink
                    to="/login"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    activeClassName="active-link"
                    className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign up
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
