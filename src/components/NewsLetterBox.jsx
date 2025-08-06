import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center py-10 bg-white">
      <p className="text-3xl font-bold text-gray-800">Subscribe now & get 20% off</p>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Sign up for our newsletter and stay updated on the latest arrivals, exclusive offers, and more!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mt-6 w-full sm:w-3/5 md:w-1/2 mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md transition duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
