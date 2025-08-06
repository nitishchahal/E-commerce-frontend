import React from 'react';
import exchange from '../assets/exchange_icon.png';
import quality from '../assets/quality_icon.png';
import support from '../assets/support_img.png';

const OurPolicy = () => {
  return (
    <section className='bg-blue-50 py-10 lg:py-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center'>
        
        {/* Exchange Policy */}
        <div className='flex-1'>
          <img src={exchange} alt="Exchange Icon" className='w-14 mb-4 mx-auto' />
          <h3 className='text-lg font-bold text-red-600'>EASY EXCHANGE POLICY</h3>
          <p className='text-gray-700 mt-2 w-11/12 mx-auto text-sm md:text-base'>
            We offer a hassle-free exchange policy to ensure you are completely satisfied with your purchase.
          </p>
        </div>

        {/* Quality Assurance */}
        <div className='flex-1'>
          <img src={quality} alt="Quality Icon" className='w-14 mb-4 mx-auto' />
          <h3 className='text-lg font-bold text-blue-600'>100% QUALITY ASSURANCE</h3>
          <p className='text-gray-700 mt-2 w-11/12 mx-auto text-sm md:text-base'>
            We guarantee the quality of our products, ensuring you receive only the best.
          </p>
        </div>

        {/* Customer Support */}
        <div className='flex-1'>
          <img src={support} alt="Support Icon" className='w-14 mb-4 mx-auto' />
          <h3 className='text-lg font-bold text-red-600'>24/7 CUSTOMER SUPPORT</h3>
          <p className='text-gray-700 mt-2 w-11/12 mx-auto text-sm md:text-base'>
            Our dedicated support team is available 24/7 to assist you with any queries or concerns.
          </p>
        </div>

      </div>
    </section>
  );
};

export default OurPolicy;
