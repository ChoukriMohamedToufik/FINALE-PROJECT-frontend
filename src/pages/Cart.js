
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { baseUrl } from '../services/baseUrl';  // ✅ المسار الصحيح
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب السلة من localStorage
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    };

    loadCart();

    // الاستماع لتحديثات السلة
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('cart');
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // تحديث الكمية
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // حذف منتج من السلة
  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // حساب المجموع
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // حساب عدد القطع
  const calculateItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="loading-spinner">جاري التحميل...</div>
      </div>
    );
  }

  // سلة فارغة
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="empty-cart-container">
          <div className="empty-cart-icon">
            <span>🛒</span>
          </div>
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

  // سلة فيها منتجات
  return (
    <div className="cart-page">
      <Navbar />
      
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">سلة التسوق</h1>
          <span className="cart-count">({calculateItemsCount()} قطع)</span>
        </div>

        <div className="cart-content">
          {/* قائمة المنتجات */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const imageUrl = item.img 
                ? `${baseUrl}/${item.img.replace(/\\/g, '/')}` 
                : '/default-product.jpg';

              return (
                <div key={item._id} className="cart-item">
                  <div 
                    className="item-image"
                    onClick={() => navigate(`/details/${item._id}`)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={item.name}
                      onError={(e) => { e.target.src = '/default-product.jpg'; }}
                    />
                  </div>

                  <div className="item-details">
                    <h3 
                      className="item-name"
                      onClick={() => navigate(`/details/${item._id}`)}
                    >
                      {item.name}
                    </h3>
                    <p className="item-category">{item.category || 'غير مصنف'}</p>
                    <p className="item-price">{item.price} دينار</p>
                  </div>

                  <div className="item-actions">
                    <div className="item-quantity">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="quantity-btn"
                        disabled={item.quantity >= item.maxStock}
                      >+</button>
                    </div>

                    <div className="item-total">
                      {item.price * item.quantity} دينار
                    </div>

                    <button 
                      onClick={() => removeItem(item._id)}
                      className="remove-item-btn"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ملخص الطلب */}
          <div className="cart-summary">
            <h2>ملخص الطلب</h2>

            <div className="summary-row">
              <span>عدد القطع:</span>
              <span>{calculateItemsCount()}</span>
            </div>

            <div className="summary-row">
              <span>المجموع الفرعي:</span>
              <span>{calculateTotal()} دينار</span>
            </div>

            <div className="summary-row">
              <span>الشحن:</span>
              <span>مجاني</span>
            </div>

            <div className="summary-row total">
              <span>الإجمالي:</span>
              <span>{calculateTotal()} دينار</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={() => alert('سيتم إضافة صفحة الدفع قريباً')}
            >
              ⚡ إتمام الشراء
            </button>

            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              🗑️ تفريغ السلة
            </button>

            <button 
              className="continue-shopping-link"
              onClick={() => navigate('/')}
            >
              ← متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;