import './App.css';
import Home from './pages/Home'; 
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Details from './pages/Details';
import EditProduct from './pages/EditProduct';
import PrivateRoutes from './pages/privateRoutes';
import PublicRoutes from './pages/PublicRoutes';



function App() {

 
 
  
  return (
    <div className="App">
     <Routes>
      <Route  path='/' element={<Home/>} />
      
      <Route  path='/login' element={<PublicRoutes><Login/></PublicRoutes>} />
      <Route  path='/register' element={<PublicRoutes><Signup/></PublicRoutes>} />

      <Route  path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>} />
      <Route   path='/details/:id' element={<PrivateRoutes><Details/></PrivateRoutes>}/>
      <Route   path='/edit/:id' element={<PrivateRoutes><EditProduct/></PrivateRoutes>}/>
     </Routes>
    </div>
  );
}

export default App;
