import React from 'react';

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Orders</h2>
        <p className="text-gray-600 mb-6">
          Track your recent purchases and order history. Stay updated with the latest delivery status.
        </p>

        <div className="border rounded-lg p-4 bg-gray-50">
          {/* Placeholder for orders */}
          <p className="text-gray-500 italic">No recent orders found.</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
