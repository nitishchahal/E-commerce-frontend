import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image?.[0] || assets.placeholder_image);

        // Filter and shuffle related products
        const filteredProducts = products.filter(
          (item) => item.category === product.category && item._id !== productId
        );
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      }
    }
  }, [productId, products]);

 

  if (!productData) return <div className='text-center py-20 text-gray-500 animate-pulse'>Loading product...</div>;

  const productVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className='px-4 md:px-10 lg:px-20 py-10 transition-opacity ease-in duration-500'
      initial='hidden'
      animate='visible'
      variants={productVariants}
    >
      <div className='flex flex-col lg:flex-row gap-10 md:gap-20'>
        {/* Images Section */}
        <motion.div
          className='flex-1 flex flex-col-reverse lg:flex-row gap-4'
          variants={itemVariants}
        >
          {/* Thumbnails */}
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 lg:w-32 w-full'>
            {productData.image?.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                onClick={() => setImage(img)}
                alt={`thumbnail-${idx}`}
                className={`h-24 w-24 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 transform hover:scale-105
                  ${img === image ? 'border-red-600 ring-4 ring-red-300' : 'border-gray-300 hover:border-blue-500'}`}
                whileHover={{ scale: 1.1, rotate: 2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              />
            ))}
          </div>
          {/* Main Image */}
          <motion.div
            className='flex-1 flex justify-center items-center max-h-[600px] bg-gray-100 rounded-xl shadow-xl'
            variants={itemVariants}
          >
            <motion.img
              key={image}
              src={image}
              alt='Product'
              className='w-full max-h-[600px] object-contain rounded-xl transition-all duration-500'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Product Info Section */}
        <motion.div className='flex-1 flex flex-col gap-5' variants={itemVariants}>
          <h1 className='text-4xl font-extrabold text-gray-900'>{productData.name}</h1>
          <div className='flex items-center gap-1'>
            {Array(Math.floor(4)).fill(0).map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className='w-5' />
            ))}
            <img src={assets.star_dull_icon} alt="star" className='w-5' />
            <p className='text-sm text-gray-600'>(122 reviews)</p>
          </div>
          <p className='text-4xl font-bold text-blue-800 animate-pulse'>
            {currency}{productData.price}
          </p>
          <p className='text-gray-700 text-base leading-relaxed'>
            {productData.description}
          </p>

          {/* Sizes */}
          <div className='my-6'>
            <p className='font-medium mb-3 text-lg text-gray-800'>Select Size:</p>
            <div className='flex gap-3 flex-wrap'>
              {productData.sizes?.length > 0 ? (
                productData.sizes.map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSize(item)}
                    className={`px-5 py-3 text-sm rounded-full border-2 font-semibold transition-all duration-300
                      ${item === size
                        ? 'bg-red-600 text-white border-red-600 shadow-lg scale-110'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:scale-105'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.button>
                ))
              ) : (
                <p className='text-base text-gray-400'>Size options not available</p>
              )}
            </div>
          </div>
          {/* CTA */}
          <motion.button
            onClick={() => addToCart(productData._id, size)}
            className='bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 active:scale-95 w-fit'
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            ADD TO CART
          </motion.button>
          <hr className='mt-8 border-t-2 border-gray-200' />
          <div className='text-base text-gray-500 space-y-2 mt-4'>
            <p>✅ 100% Original product</p>
            <p>💰 Cash on delivery available</p>
            <p>🔄 Easy return and exchange within 7 days</p>
          </div>
        </motion.div>
      </div>
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <>
          <hr className='my-16 border-t-2 border-gray-200' />
          <motion.div
            className='text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className='text-4xl font-extrabold text-gray-900 mb-10'>Related Products</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((item) => (
                <motion.div
                  key={item._id}
                  className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4'>
                      <h3 className='font-semibold text-gray-800 truncate'>{item.name}</h3>
                      <p className='mt-2 text-2xl font-bold text-blue-700'>{currency}{item.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Product;