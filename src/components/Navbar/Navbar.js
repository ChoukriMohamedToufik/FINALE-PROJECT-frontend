// components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout, emptyError } from '../../redux/user';
import './nav.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // تحديث عدد السلة
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // تأثير التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleNavigation = (path) => {
    dispatch(emptyError());
    navigate(`/${path}`);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate('/');
  };

  const token = localStorage.getItem('token');

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* اللوجو */}
        <div className="navbar-logo" onClick={() => handleNavigation('')}>
          <span className="logo-text">CMT</span>
          <span className="logo-highlight">Tech</span>
        </div>

        {/* زر القائمة للجوال */}
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`menu-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`menu-bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`menu-bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* روابط النافبار */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="nav-link" 
            onClick={() => handleNavigation('')}
          >
            <span className="nav-icon">🏠</span>
            الرئيسية
          </button>

          <button 
            className="nav-link" 
            onClick={() => handleNavigation('dashboard')}
          >
            <span className="nav-icon">📊</span>
            لوحة التحكم
          </button>

          {/* أيقونة السلة مع العداد */}
          <button 
            className="nav-link cart-link" 
            onClick={() => handleNavigation('cart')}
          >
            <span className="nav-icon">🛒</span>
            السلة
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {!token ? (
            <>
              <button 
                className="nav-link signup-btn" 
                onClick={() => handleNavigation('register')}
              >
                <span className="nav-icon">📝</span>
                تسجيل
              </button>
              <button 
                className="nav-link login-btn" 
                onClick={() => handleNavigation('login')}
              >
                <span className="nav-icon">🔐</span>
                دخول
              </button>
            </>
          ) : (
            <button 
              className="nav-link logout-btn" 
              onClick={handleLogout}
            >
              <span className="nav-icon">🚪</span>
              خروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;