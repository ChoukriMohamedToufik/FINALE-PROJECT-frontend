import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../services/baseUrl';
import './Card.css';

function Card({ p }) {
  const navigate = useNavigate();

  // ✅ تأكد من وجود p و p.img قبل الاستعمال
  const imageUrl = p && p.img
    ? `${baseUrl}/${p.img.replace(/\\/g, '/')}`
    : '/default-product.jpg';

  return (
    <div className='product-card'>
      <div className="product-image">
        <img
          src={imageUrl}
          alt={p?.name || 'منتج'}
          onError={(e) => {
            e.target.src = '/default-product.jpg';
          }}
        />
      </div>
      <div className="product-info">
        <h3>{p?.name || 'بدون اسم'}</h3>
        <p className="price">{p?.price || 0} دينار</p>
        <div className="card-actions">
          <button onClick={() => navigate(`/details/${p?._id}`)}>
            تفاصيل
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;