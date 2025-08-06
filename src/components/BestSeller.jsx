import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      const bestProduct = products.filter((item) => item.bestseller === true);
      setBestSellers(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-12 px-4 md:px-8">
      {/* Section Title */}
      <div className="text-center py-6">
        <h2 className="text-4xl font-bold">
          <span className="text-red-600">BEST</span>{' '}
          <span className="text-blue-600">SELLER</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our top-rated, most loved products by customers. Handpicked and trusted by many.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
