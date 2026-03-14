// components/Cardlist/Cardlist.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { searchLocal, filterByCategoryLocal, resetFilters } from '../../redux/product';
import './Cardlist.css';

function Cardlist() {
  const dispatch = useDispatch();
  
  const { filteredProducts, categories, selectedCategory } = useSelector(
    (state) => state.product
  );
  
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(searchLocal(value));
  };

  const handleCategoryChange = (e) => {
    dispatch(filterByCategoryLocal(e.target.value));
  };

  const handleReset = () => {
    setSearchInput('');
    dispatch(resetFilters());
  };

  return (
    <div className="products-container">
      
      <div className="search-bar-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="> البحث عن منتج..."
          value={searchInput}
          onChange={handleSearch}
          className="search-input"
        />
        
        <select 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="all">📋 كل الفئات</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleReset} className="reset-btn">
          ⟲ إعادة تعيين
        </button>
      </div>

      <div className="results-info">
        <span>⚡ {filteredProducts?.length || 0} منتج متاح</span>
      </div>

      <div className="products-grid">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <Card key={p._id} p={p} />)
        ) : (
          <div className="no-products">
            <span> لا توجد منتجات مطابقة للبحث</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cardlist;