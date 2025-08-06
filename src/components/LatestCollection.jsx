import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      const sorted = [...products]
        .sort((a, b) => b.date - a.date)
        .slice(0, 10);
      setLatestProducts(sorted);
    }
  }, [products]);

  return (
    <div className="my-10 bg-white">
      {/* Section Title */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-red-600">
          <Title text1="LATEST" text2="COLLECTION" />
        </h2>
        <p className="w-3/4 mx-auto mt-2 text-sm sm:text-base text-gray-600">
          Explore our latest collection — a perfect blend of style, comfort, and quality.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className="hover:shadow-md hover:ring-2 hover:ring-blue-600 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
