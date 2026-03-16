
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../services/baseUrl';
import './Card.css';

function Card({ p }) {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item._id === p._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        _id: p._id,
        name: p.name,
        price: p.price,
        img: p.img,
        category: p.category,
        quantity: 1,
        maxStock: p.stock
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ تمت إضافة ${p.name} إلى السلة`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleDetails = () => {
    navigate(`/details/${p._id}`);  
  };

  const imageUrl = p.img 
    ? `${baseUrl}/${p.img.replace(/\\/g, '/')}` 
    : '/default-product.jpg';

  return (
    <div className='product-card'>
      <div className="product-image" onClick={handleDetails}>
        <img
          src={imageUrl}
          alt={p.name || 'منتج'}
          onError={(e) => { e.target.src = '/default-product.jpg'; }}
        />
      </div>
      
      <div className="product-info">
        <h3 onClick={handleDetails} style={{ cursor: 'pointer' }}>
          {p.name || 'بدون اسم'}
        </h3>
        
        <p className="product-category">{p.category || 'غير مصنف'}</p>
        <p className="price">{p.price || 0} دينار</p>
        
        <div className="card-actions">
          <button 
            className="details-btn"
            onClick={handleDetails}
          >
            🔍 تفاصيل
          </button>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={p.stock <= 0}
          >
            🛒 {p.stock > 0 ? 'أضف للسلة' : 'غير متوفر'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;