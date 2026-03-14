// pages/Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="empty-cart-container">
          <h1 className="empty-cart-title">CMT Tech</h1>
          <h2 className="empty-cart-subtitle">السلة فارغة</h2>
          <p className="empty-cart-message">لم تقم بإضافة أي منتجات بعد</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            استمر في التسوق ←
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1 className="cart-title">سلة التسوق</h1>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.price} دينار × {item.quantity}</p>
              <p>المجموع: {item.price * item.quantity} دينار</p>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h2>الإجمالي: {calculateTotal()} دينار</h2>
          <button className="checkout-btn">إتمام الشراء</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;