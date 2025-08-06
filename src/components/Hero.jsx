import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col sm:flex-row border border-gray-200 shadow-md rounded-xl overflow-hidden">
        
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-12 px-6">
          <div className="text-gray-800">
            {/* Top Line and Label */}
            <div className="flex items-center gap-2 mb-2">
              <p className="w-8 md:w-11 h-[2px] bg-blue-600"></p>
              <p className="font-medium text-sm md:text-base text-blue-600 tracking-wide">
                OUR BESTSELLERS
              </p>
            </div>

            {/* Heading */}
            <h1 className="tagesschrift-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-gray-800 font-semibold">
              Latest Collection
            </h1>

            {/* CTA Section */}
            <div className="flex items-center gap-2 mt-4">
              <p className="font-semibold text-sm md:text-base text-emerald-500 hover:text-emerald-600 transition">
                SHOP NOW
              </p>
              <p className="w-8 md:w-11 h-[1px] bg-emerald-500"></p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full sm:w-1/2 object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
