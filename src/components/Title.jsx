import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-center gap-4 mb-6'>
      <p className='text-base sm:text-lg tracking-wide text-blue-900'>
        {text1}{' '}
        <span className='text-red-600 font-semibold'>{text2}</span>
      </p>
      <div className='w-12 sm:w-16 h-[2px] bg-gradient-to-r from-red-500 via-blue-600 to-blue-900 rounded-full'></div>
    </div>
  );
};

export default Title;
