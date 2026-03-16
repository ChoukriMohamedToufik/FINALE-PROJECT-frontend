
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
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  //  useEffect واحد داخل الدالة
  useEffect(() => {
    console.log('📌 ID من الرابط:', id);

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const result = await GetoneProduct(id, dispatch);
        console.log('✅ نتيجة جلب المنتج:', result);
      } catch (error) {
        console.log('❌ خطأ في جلب المنتج:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id, dispatch]);

  //  تحديد لون الصفحة حسب الفئة
  const getBrandColor = () => {
    const category = product?.category || '';
    if (category.includes('AMD')) return '#ed1c24';
    if (category.includes('NVIDIA')) return '#76b900';
    if (category.includes('Intel')) return '#0071c5';
    return '#667eea';
  };

  const brandColor = getBrandColor();

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        category: product.category,
        quantity: quantity,
        maxStock: product.stock
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ تمت إضافة ${quantity} قطعة من ${product.name} إلى السلة`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="details-page">
        <Navbar />
        <div className="loading-spinner">جاري التحميل...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-page">
        <Navbar />
        <div className="error-message">المنتج غير موجود</div>
      </div>
    );
  }

  const imageUrl = product.img 
    ? `${baseUrl}/${product.img.replace(/\\/g, '/')}` 
    : '/default-product.jpg';

  const pageClass = product.category?.includes('AMD') ? 'amd-theme' : 
                    product.category?.includes('NVIDIA') ? 'nvidia-theme' :
                    product.category?.includes('Intel') ? 'intel-theme' : 'default-theme';

  return (
    <div className={`details-page ${pageClass}`} style={{ '--brand-color': brandColor }}>
      <Navbar />
      
      <div className="details-container">
        {/* مسار التنقل */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>الرئيسية</span>
          <span className="separator">/</span>
          <span onClick={() => navigate(`/category/${product.category}`)}>
            {product.category || 'منتجات'}
          </span>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-details-wrapper">
          {/* قسم الصورة */}
          <div className="product-images">
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
            
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              {product.stock > 0 ? (
                <span className="in-stock">✅ متوفر - {product.stock} قطعة</span>
              ) : (
                <span className="out-of-stock">❌ غير متوفر</span>
              )}
            </div>

            <div className="product-price">
              <span className="current-price">{product.price} دينار</span>
            </div>

            <div className="product-description">
              <h3>الوصف:</h3>
              <p>{product.description}</p>
            </div>

            {/* اختيار الكمية والأزرار */}
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
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  style={{ background: `linear-gradient(135deg, ${brandColor}dd, ${brandColor}99)` }}
                >
                  🛒 أضف إلى السلة
                </button>
                
                <button 
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  style={{ background: `linear-gradient(135deg, ${brandColor}, ${brandColor}dd)` }}
                >
                  ⚡ اشتري الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;