import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/index.js";
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <h2>This is a Home Component</h2>
}

export default App;
