import React from "react";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

const Orders = () => {
  // 🧠 demo data (replace with real API later)
  const orders = [];

  return (
    <section className="min-h-screen px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-gray-50">

      {/* 🧠 HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">
          YOUR ORDERS
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Order History
        </h2>
        <p className="text-gray-600 mt-3">
          Track your purchases and stay updated with delivery status.
        </p>
      </div>

      {/* 📦 CONTENT */}
      <div className="max-w-5xl mx-auto">

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-10 text-center shadow-md"
          >
            <FiPackage className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800">
              No orders yet
            </p>
            <p className="text-gray-500 mt-2">
              Looks like you haven’t placed any orders yet.
            </p>

            <a
              href="/collection"
              className="inline-block mt-6 px-6 py-2 bg-black text-white rounded-full text-sm hover:scale-105 transition"
            >
              Start Shopping →
            </a>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex justify-between items-center mb-4">
                  <p className="font-semibold text-gray-900">
                    Order #{order.id}
                  </p>

                  {/* 🧠 STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">
                          {item.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Placed on {order.date}
                  </p>

                  <p className="font-bold text-gray-900">
                    ₹{order.total}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;