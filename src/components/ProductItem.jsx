import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

// Reusable component for the glowing icon on hover
const ArrowIcon = () => (
  <div className="absolute bottom-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 animate-pulse">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  </div>
);

// Main ProductItem component
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imageUrl = Array.isArray(image) && image.length > 0
    ? image[0]
    : 'https://via.placeholder.com/150';

  return (
    <Link
      to={`/product/${id}`}
      className="block group relative p-5 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg 
                 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-500 ease-in-out transform hover:-translate-y-2"
    >
      <div className="overflow-hidden rounded-lg w-full aspect-w-4 aspect-h-3 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start pt-2">
        <div className="flex-1">
          <p className="text-gray-200 font-semibold group-hover:text-cyan-400 transition-colors duration-300 text-base tracking-wider">
            {name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-cyan-400 font-bold text-lg font-mono mt-1">
            <span className="text-sm font-normal text-gray-400">{currency}</span>
            {price.toFixed(2)}
          </p>
        </div>
      </div>
      <ArrowIcon />
    </Link>
  );
};

export default ProductItem;