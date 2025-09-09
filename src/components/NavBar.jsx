import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'; // Ensure this path is correct

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch  , getCartCount} = useContext(ShopContext);

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.cover} alt="Logo" className="w-36 sm:w-40" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-gray-700 font-medium text-sm">
        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
          <NavLink
            key={item}
            to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer gap-1 transition-all duration-200 ${
                isActive
                  ? 'text-blue-800 underline underline-offset-4'
                  : 'hover:text-blue-600'
              }`
            }
          >
            <p>{item}</p>
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex gap-5 items-center">
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch(true)}
          alt="Search"
          className="w-5 h-5 cursor-pointer"
        />
        <div className="relative group">
          <img src={assets.profile_icon} alt="Profile" className="w-5 h-5 cursor-pointer" />
          <div className="absolute top-6 right-0 hidden group-hover:block bg-gray-50 shadow-md rounded-lg p-4 w-40 z-10">
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <p className="cursor-pointer hover:text-red-600">My Profile</p>
              <p className="cursor-pointer hover:text-red-600">Orders</p>
              <p className="cursor-pointer hover:text-red-600">Log Out</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart" className="w-5 h-5 cursor-pointer" />
          <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold">
            {getCartCount() || 0}
          </div>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-5 h-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full backdrop-blur-sm bg-white/80 transition-all z-40 shadow-lg duration-300 ${
          visible ? 'w-3/4 max-w-xs' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-700 font-medium h-full">
          <div
            className="flex items-center gap-4 p-4 border-b"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Close"
              className="h-4 rotate-180 cursor-pointer"
            />
            <p className="text-blue-600 font-semibold">Close</p>
          </div>

          {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
            <NavLink
              key={item}
              to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b transition-all duration-200 ${
                  isActive
                    ? 'text-blue-800 underline underline-offset-4'
                    : 'hover:text-blue-600'
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
