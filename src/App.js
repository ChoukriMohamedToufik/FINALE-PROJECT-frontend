import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// الصفحات
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Details from './pages/Details';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import About from './pages/About';

// الحماية
import PrivateRoutes from './pages/privateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import AdminRoutes from './pages/AdminRoutes';  // ✅ استيراد AdminRoutes

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/register' element={<PublicRoutes><Signup /></PublicRoutes>} />
        
        {/* ✅ Dashboard الآن فقط للـ admin */}
        <Route path='/dashboard' element={<AdminRoutes><Dashboard /></AdminRoutes>} />
        
        <Route path='/details/:id' element={<Details />} />
        <Route path='/edit/:id' element={<PrivateRoutes><EditProduct /></PrivateRoutes>} />
        
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;