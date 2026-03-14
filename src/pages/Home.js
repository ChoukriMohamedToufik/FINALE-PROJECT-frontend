// pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import Cardlist from '../components/Cardlist/Cardlist';
import { GetProducts } from '../services/productServices';
import './Home.css';
import backgroundVideo from '../assets/videos/199827-911378618_medium.mp4';

function Home() {
  const productlist = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    GetProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="home-container">
      {/* فيديو الخلفية */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      <div className="content-overlay">
        <Navbar />
        <div className="hero-section">
          <h1>CMT Tech</h1>
          <p>Your PC Hardware Store</p>
        </div>
        <div className="products-section">
          <h2>Products</h2>
          <Cardlist productlist={productlist} />
        </div>
      </div>
    </div>
  );
}

export default Home;