import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Basket from './pages/Basket';
import PrivateRoutes from './pages/PrivateRoutes';
import Error404 from './pages/Error404';
import PrivateAdmin from './pages/PrivateAdmin';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/product/:product_id" element={<ProductDetail/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/basket" element={<Basket/>}/>
            <Route path='*' element={<Error404/>}/>
            <Route element={<PrivateRoutes/>}>
              <Route path='/profile' element={<Profile/>}/> 
              <Route path='/admin/*' element={<PrivateAdmin><Admin admin={true}/></PrivateAdmin>}/>{/*I wrapped it with PrivateAdmin so that a user who is a "user" cannot access the admin page*/}
              {/*With admin/* we don't have to pull the URL using a hook. /* means adding a url linked to it.*/}
            </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
