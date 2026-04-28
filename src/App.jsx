import { ToastContainer } from 'react-toastify';
import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Profile from "./pages/Profile"; // ✅ ADDED

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ShopContext } from './context/ShopContext';
import ScrollToTop from './ScrolltoTop';

const APP = () => {
  const location = useLocation();
  const { user } = useContext(ShopContext);

  // 🧠 hide layout on auth pages
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  // 🔐 Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // 🚫 Auth Route (prevent access if logged in)
  const AuthRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <ScrollToTop />

      {/* 🧠 NAVBAR */}
      {!hideLayout && <NavBar />}

      {/* 🧠 SEARCH */}
      {!hideLayout && <SearchBar />}

      {/* 🧠 MAIN */}
      <div className={`${!hideLayout ? 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' : ''}`}>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<Product />} />

          {/* 🔐 AUTH */}
          <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
          <Route path='/register' element={<AuthRoute><Register /></AuthRoute>} />

          {/* 🔐 PROTECTED */}
          <Route path='/placeorder' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* ✅ ADDED */}

          {/* ❌ 404 */}
          <Route
            path='*'
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className='text-3xl'>404 Not Found</h1>
              </div>
            }
          />

        </Routes>
      </div>

      {/* 🧠 FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
};

export default APP;