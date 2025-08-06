import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imageUrl =
    image && image.length > 0
      ? image[0]
      : 'https://via.placeholder.com/150';

  return (
    <Link to={`/product/${id}`} className="block group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <div className="overflow-hidden rounded-lg w-full h-52 sm:h-60 md:h-64">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <p className="text-blue-800 font-semibold group-hover:text-red-600 transition duration-200 text-sm sm:text-base">{name}</p>
        <p className="text-red-700 font-bold text-sm sm:text-base">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
