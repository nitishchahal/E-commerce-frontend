

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';


const APP = () => {
  return (
     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '> 
    <NavBar />
    <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='*' element={<h1 className='text-3xl'>404 Not Found</h1>} />
      </Routes>
    <Footer/>
    </div>
   
  );
}

export default APP;
