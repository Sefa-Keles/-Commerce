import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from './pages/Products';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
