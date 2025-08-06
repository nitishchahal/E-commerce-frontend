import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || assets.placeholder_image);
      }
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size && productData.sizes?.length > 0) {
      alert('Please select a size!');
      return;
    }
    addToCart(productData, size);
    alert('Product added to cart!');
  };

  if (!productData) return <div className='text-center py-20 text-gray-500 animate-pulse'>Loading product...</div>;

  return (
    <div className='border-t pt-10 transition-opacity ease-in duration-500'>
      <div className='flex flex-col sm:flex-row gap-10'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-4'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-[20%] w-full'>
            {productData.image?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setImage(img)}
                alt={`thumbnail-${idx}`}
                className={`h-24 w-24 object-cover rounded-md cursor-pointer border-2 transition-all duration-200
                  ${img === image ? 'border-blue-600 ring-2 ring-red-500' : 'border-gray-300 hover:border-blue-500'}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='flex-1 flex justify-center items-center max-h-[500px]'>
            <img
              key={image}
              src={image}
              alt='Product'
              className='w-full max-h-[500px] object-contain rounded-xl shadow-xl transition-all duration-300'
            />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 flex flex-col gap-5'>
          <h1 className='text-3xl font-semibold text-gray-900'>{productData.name}</h1>

          <div className='flex items-center gap-1'>
            {Array(4).fill(0).map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className='w-4' />
            ))}
            <img src={assets.star_dull_icon} alt="star" className='w-4' />
            <p className='text-sm text-gray-600'>(122 reviews)</p>
          </div>

          <p className='text-3xl font-bold text-blue-800'>
            {currency}{productData.price}
          </p>

          <p className='text-gray-600 text-sm leading-relaxed md:w-4/5'>
            {productData.description}
          </p>

          {/* Sizes */}
          <div className='my-6'>
            <p className='font-medium mb-2'>Select Size:</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes?.length > 0 ? (
                productData.sizes.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(item)}
                    className={`px-4 py-2 text-sm rounded-md border font-medium transition
                      ${item === size
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className='text-sm text-gray-400'>Size options not available</p>
              )}
            </div>
          </div>

          {/* CTA */}
          <button className='bg-blue-700 text-white font-semibold py-3 px-6 rounded hover:bg-blue-800 transition active:scale-95 w-fit'>
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 space-y-1 mt-4'>
            <p>✅ 100% Original product</p>
            <p>💰 Cash on delivery available</p>
            <p>🔄 Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
