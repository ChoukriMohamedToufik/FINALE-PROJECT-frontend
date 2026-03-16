
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import Cardlist from '../components/Cardlist/Cardlist';
import { GetProducts } from '../services/productServices';
import './Home.css';
import backgroundVideo from '../assets/videos/199827-911378618_medium.mp4';

function Home() {
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

      {/* المحتوى فوق الفيديو */}
      <div className="content-overlay">
        <Navbar />
        <div className="hero-section">
          <h1>CMT Tech</h1>
          <p>Your PC Hardware Store</p>
        </div>
        <Cardlist />
      </div>
    </div>
  );
}

export default Home;