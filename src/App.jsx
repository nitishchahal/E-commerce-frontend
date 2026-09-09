import { ToastContainer } from 'react-toastify';
import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from "./pages/Home"; import About from "./pages/About"; import Collection from "./pages/Collection"; import Contact from "./pages/Contact"; import Cart from "./pages/Cart"; import Product from "./pages/Product"; import Login from "./pages/Login"; import PlaceOrder from "./pages/PlaceOrder"; import Orders from "./pages/Orders"; import Register from "./pages/Register"; import Profile from "./pages/Profile"; import Wishlist from "./pages/Wishlist";
import NavBar from './components/NavBar'; import Footer from './components/Footer'; import SearchBar from './components/SearchBar'; import { ShopContext } from './context/ShopContext'; import ScrollToTop from './ScrolltoTop';

const APP = () => {
  const location = useLocation(); const { user } = useContext(ShopContext);
  const hideLayout = ["/login", "/register"].includes(location.pathname);
  const ProtectedRoute = ({ children }) => user ? children : <Navigate to="/login" replace />;
  const AuthRoute = ({ children }) => user ? <Navigate to="/" replace /> : children;
  return <><ToastContainer position="top-center" autoClose={2000} hideProgressBar /><ScrollToTop />{!hideLayout && <NavBar />}{!hideLayout && <SearchBar />}
    <main className={!hideLayout ? 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' : ''}><Routes>
      <Route path='/' element={<Home />} /><Route path='/about' element={<About />} /><Route path='/contact' element={<Contact />} /><Route path='/collection' element={<Collection />} /><Route path='/cart' element={<Cart />} /><Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} /><Route path='/product/:productId' element={<Product />} />
      <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} /><Route path='/register' element={<AuthRoute><Register /></AuthRoute>} /><Route path='/placeorder' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} /><Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} /><Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='*' element={<div className="min-h-screen flex items-center justify-center"><h1 className='text-3xl'>404 Not Found</h1></div>} />
    </Routes></main>{!hideLayout && <Footer />}</>;
};
export default APP;