import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Registerform from "../Registerform/Registerform";
import Login from "../Login/Login"
import Header from '../Header/Header';
import Cart from '../Cart/Cart';
import Confirmation from '../Confirmation/Confirmation';
import CustomerProvider from '../../context/CustomerContext';
import "./Main.css"

function Main() {
  return (
    
    <Router>
      <div className="main-content">
      <CustomerProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerform" element={<Registerform />} /> 
        <Route path="/cart"element={<Cart/>}/>
         <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      </CustomerProvider>
      </div>
    </Router>
    
  
);
 
}

export default Main