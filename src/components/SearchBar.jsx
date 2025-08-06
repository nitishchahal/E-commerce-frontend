import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import search_icon from '../assets/search_icon.png';
import cross_icon from '../assets/cross_icon.png';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-blue-50 text-center p-3 sm:p-4">
      <div className="inline-flex items-center border border-blue-300 px-6 py-2 rounded-full bg-white shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-2 bg-transparent outline-none placeholder:text-sm placeholder:text-gray-500 w-40 sm:w-60 md:w-80"
          placeholder="Search for items..."
        />
        <img src={search_icon} alt="search" className="w-4 h-4 ml-2 opacity-80" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={cross_icon}
        alt="close"
        className="w-4 h-4 ml-4 inline cursor-pointer hover:scale-110 transition-transform"
        title="Close Search"
      />
    </div>
  ) : null;
};

export default SearchBar;
