import React from 'react';

const Cart = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Cart</h2>
        <p className="text-gray-600 mb-6">
          Review the items in your cart before proceeding to checkout. You can update quantities or remove items.
        </p>

        <div className="border rounded-lg p-4 bg-gray-50">
          {/* Placeholder for cart items */}
          <p className="text-gray-500 italic">Your cart is currently empty.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
