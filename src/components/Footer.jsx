import React from "react";
import cover from "../assets/cover.png";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm bg-blue-50 p-8 text-gray-700">
        <div>
          <img src={cover} alt="Logo" className="w-40 mb-5" />
          <p className="text-gray-600 w-full md:w-2/3">
            Welcome to our store! We’re dedicated to providing high-quality, stylish products that combine comfort and affordability. Shop confidently and elevate your everyday lifestyle.
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-blue-800">COMPANY</p>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-red-600 transition">Home</li>
            <li className="cursor-pointer hover:text-red-600 transition">About Us</li>
            <li className="cursor-pointer hover:text-red-600 transition">Delivery</li>
            <li className="cursor-pointer hover:text-red-600 transition">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-blue-800">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-red-600 transition">+1-962-296-4940</li>
            <li className="cursor-pointer hover:text-red-600 transition">nittysharma@gmail.com</li>
            <li className="cursor-pointer hover:text-red-600 transition">Ludhiana, Punjab</li>
            <li className="cursor-pointer hover:text-red-600 transition">Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-t border-blue-200 w-full" />
        <p className="text-center text-gray-500 text-sm py-5">
          © 2023 JK08edits. All rights reserved. | Designed by{" "}
          <span className="text-blue-800 font-semibold">Nitish Choudhary</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
