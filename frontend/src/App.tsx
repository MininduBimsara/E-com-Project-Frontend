import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import NavBar from "./Components/Common/NavBar";
import Home from "./Pages/Common/HomePage";
import About from "./Pages/Common/About";
import Products from "./Pages/Common/ProductPage";
// import AuthModal from "./Pages/Common/AuthForm";

function App() {


  return (
    <>
      {/* <NavBar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/auth" element={<AuthModal />} /> */}
          {/* 
          <Route path="/categories" element={<Categories />} />
          
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App
