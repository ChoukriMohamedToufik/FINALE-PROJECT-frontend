// pages/Details.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { GetoneProduct } from '../services/productServices';
import { baseUrl } from '../services/baseUrl';
import Navbar from '../components/Navbar/Navbar';
import './Details.css';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await GetoneProduct(id, dispatch);
      setLoading(false);
    };
    fetchProduct();
  }, [id, dispatch]);

  // معالجة إضافة للسلة
  const handleAddToCart = () => {
    // جلب السلة من localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // التحقق إذا المنتج موجود
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      // إذا موجود، نزيد الكمية
      existingItem.quantity += quantity;
    } else {
      // إذا لا، نضيفه
      cart.push({
        ...product,
        quantity: quantity
      });
    }
    
    // حفظ في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // إشعار للمستخدم
    alert('✅ تمت إضافة المنتج إلى السلة');
  };

  // معالجة الشراء المباشر
  const handleBuyNow = () => {
    handleAddToCart(); // نضيف للسلة أولاً
    navigate('/checkout'); // نوجه لصفحة الدفع (إذا كانت موجودة)
  };

  if (loading) {
    return (
      <div className="details-container">
        <Navbar />
        <div className="loading-spinner">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-container">
        <Navbar />
        <div className="error-message">المنتج غير موجود</div>
      </div>
    );
  }

  // تجهيز رابط الصورة
  const imageUrl = product.img 
    ? `${baseUrl}/${product.img.replace(/\\/g, '/')}` 
    : '/default-product.jpg';

  return (
    <div className="details-page">
      <Navbar />
      
      <div className="details-container">
        {/* مسار التنقل (Breadcrumb) */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>الرئيسية</span> / 
          <span onClick={() => navigate(`/category/${product.category}`)}>{product.category}</span> / 
          <span>{product.name}</span>
        </div>

        <div className="product-details-wrapper">
          {/* قسم الصور */}
          <div className="product-images-section">
            <div className="main-image">
              <img src={imageUrl} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              <img src={imageUrl} alt={product.name} />
              <img src={imageUrl} alt={product.name} />
              <img src={imageUrl} alt={product.name} />
            </div>
          </div>

          {/* قسم المعلومات */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              {[1,2,3,4,5].map(star => (
                <span key={star} className={`star ${star <= (product.rating || 4) ? 'filled' : ''}`}>★</span>
              ))}
              <span className="rating-count">({product.nbr_commande || 0} تقييم)</span>
            </div>

            <div className="product-price">
              <span className="current-price">{product.price} دينار</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice} دينار</span>
              )}
            </div>

            <div className="product-availability">
              {product.stock > 0 ? (
                <span className="in-stock">✅ متوفر - {product.stock} قطعة</span>
              ) : (
                <span className="out-of-stock">❌ غير متوفر</span>
              )}
            </div>

            <div className="product-description">
              <h3>الوصف:</h3>
              <p>{product.description}</p>
            </div>

            {product.specifications && (
              <div className="product-specifications">
                <h3>المواصفات:</h3>
                <ul>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* قسم الكمية والأزرار */}
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >-</button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >+</button>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  🛒 أضف إلى السلة
                </button>
                
                <button 
                  className="btn-buy-now"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  ⚡ اشتري الآن
                </button>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="product-meta">
              <p>🏷️ الفئة: {product.category || 'غير مصنف'}</p>
              <p>📦 SKU: {product._id.slice(-6).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;