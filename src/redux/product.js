// redux/product.js
import { createSlice } from '@reduxjs/toolkit';

const productslice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: {},
    filteredProducts: [],
    categories: [],
    searchTerm: '',
    selectedCategory: 'all'
  },
  reducers: {
    getproducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      
      // ✅ استخراج الفئات من المنتجات (يزيل التكرار والفارغ)
      const cats = action.payload
        .map(p => p.category)
        .filter(c => c && c.trim() !== '');
      
      // إزالة التكرار
      state.categories = [...new Set(cats)];
      
      console.log('Categories loaded:', state.categories); // للتأكد
    },
    
    getoneproduct: (state, action) => {
      state.product = action.payload;
    },
    
    searchLocal: (state, action) => {
      const term = action.payload.toLowerCase();
      state.searchTerm = term;
      
      let filtered = [...state.products];
      
      if (term) {
        filtered = filtered.filter(p => 
          p.name?.toLowerCase().includes(term)
        );
      }
      
      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(p => 
          p.category === state.selectedCategory
        );
      }
      
      state.filteredProducts = filtered;
    },
    
    filterByCategoryLocal: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      
      let filtered = [...state.products];
      
      if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
      }
      
      if (state.searchTerm) {
        filtered = filtered.filter(p => 
          p.name?.toLowerCase().includes(state.searchTerm)
        );
      }
      
      state.filteredProducts = filtered;
    },
    
    resetFilters: (state) => {
      state.filteredProducts = state.products;
      state.searchTerm = '';
      state.selectedCategory = 'all';
    }
  }
});

export const { 
  getproducts, 
  getoneproduct, 
  searchLocal,
  filterByCategoryLocal,
  resetFilters 
} = productslice.actions;

export default productslice.reducer;