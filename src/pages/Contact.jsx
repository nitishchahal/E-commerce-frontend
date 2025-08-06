import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-8 md:px-16 text-gray-800">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Get in Touch With Us</h2>

      {/* Section 1: Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <FaPhone className="text-2xl text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <FaEnvelope className="text-2xl text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Email</h3>
          <p>support@yourstore.com</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <FaMapMarkerAlt className="text-2xl text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg mb-1">Office</h3>
          <p>Vikramshila Parisar, Indore, Madhya Pradesh, India</p>
        </div>
      </div>

      {/* Section 2: Contact Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Send us a Message</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="p-3 rounded-lg border border-gray-300 w-full" />
          <input type="email" placeholder="Email Address" className="p-3 rounded-lg border border-gray-300 w-full" />
          <input type="text" placeholder="Phone Number" className="p-3 rounded-lg border border-gray-300 w-full" />
          <input type="text" placeholder="Subject" className="p-3 rounded-lg border border-gray-300 w-full" />
          <textarea placeholder="Your Message" className="p-3 rounded-lg border border-gray-300 w-full md:col-span-2" rows="5"></textarea>
          <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all">Submit</button>
        </form>
      </div>

      {/* Section 3: Google Map Embed */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Our Location</h3>
        <div className="rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="map"
            className="w-full h-[300px] md:h-[400px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0633420987245!2d75.8602828753105!3d22.7252857278649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fdbd2b81b4d3%3A0xeeb6a316fd4cd0ba!2sVikramshila%20Parisar%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1699876543210!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Section 4: Social Media & Support */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Follow Us on Social Media</h3>
        <div className="flex justify-center gap-6 text-blue-600 text-2xl mb-6">
          <FaFacebook className="hover:text-blue-800 transition" />
          <FaInstagram className="hover:text-pink-500 transition" />
          <FaTwitter className="hover:text-sky-500 transition" />
        </div>
        <p>For urgent support, contact our 24/7 helpline at <span className="font-semibold">+91 98765 43210</span>.</p>
      </div>
    </div>
  );
};

export default ContactSection;
