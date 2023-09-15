import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Registerform from "../Registerform/Registerform";
import Login from "../Login/Login"
import Header from '../Header/Header';
import Cart from '../Cart/Cart';
import Confirmation from '../Confirmation/Confirmation';
import "./Main.css"

function Main() {
  return (
    <div className="main-content">
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerform" element={<Registerform />} /> 
        <Route path="/cart"element={<Cart/>}/>
         <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      
    </Router>
    
  </div>
);
 
}

export default Main