import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";

const statusClass = (status) => ({
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
}[String(status || "").toLowerCase()] || "bg-gray-100 text-gray-700");

const Orders = () => {
  const { orders, customerLoading, currency } = useContext(ShopContext);

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-5xl mx-auto mb-10">
        <p className="text-xs tracking-[0.3em] text-gray-500 mb-2">YOUR ORDERS</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Order History</h2>
        <p className="text-gray-600 mt-3">Track purchases and review your delivery status.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        {customerLoading ? (
          <div className="py-16 text-center text-gray-500">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-md">
            <FiPackage className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800">No orders yet</p>
            <p className="text-gray-500 mt-2">Your completed checkout history will appear here.</p>
            <Link to="/collection" className="inline-block mt-6 px-6 py-2 bg-black text-white rounded-full text-sm">Start Shopping →</Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.article key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap justify-between gap-3 mb-5">
                  <div>
                    <p className="font-semibold text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <span className={"h-fit text-xs px-3 py-1 rounded-full capitalize " + statusClass(order.status)}>{order.status}</span>
                </div>

                <div className="space-y-3">
                  {(order.order_items || []).map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.product_image ? <img src={item.product_image} alt={item.product_name} className="w-16 h-16 rounded-lg object-cover" /> : <div className="w-16 h-16 rounded-lg bg-gray-100" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-medium truncate">{item.product_name}</p>
                        <p className="text-gray-500 text-sm">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{currency}{Number(item.line_total).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-between gap-3 mt-5 border-t pt-4 text-sm">
                  <span className="text-gray-500 capitalize">Payment: {order.payment_method}</span>
                  <span className="font-bold text-gray-900">Total {currency}{Number(order.total).toFixed(2)}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
