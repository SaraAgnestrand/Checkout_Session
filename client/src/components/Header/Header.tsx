import { useState, useEffect, useContext } from "react";
import { BsCart3 } from 'react-icons/bs';
import { ICart } from "../Home/Home";
import { useNavigate } from 'react-router-dom';
//import { CustomerContext } from "../../context/CustomerContext"
import "./Header.css"



function Header() {
    // Skapa en state för att lagra antalet produkter i kundvagnen
    const [cartCount, setCartCount] = useState<number>(0);

    // Hämta kundvagnsdata från localStorage och uppdatera cartCount när komponenten mountas
    useEffect(() => {
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]") as ICart[];
      const totalCount = cartDataFromLocalStorage.reduce((count, item) => count + item.quantity, 0);
      setCartCount(totalCount);
    }, []);
  
  const navigate = useNavigate();

  // const navigate = useNavigate();
  const handleNavigation = (destination: string) => {
    if (destination === 'registerform') {
      navigate('/registerform');
    } else if (destination === 'login') {
      navigate('/login');
    } else if (destination === 'cart') {
      navigate('/cart');
    } else if (destination === 'home') {
      navigate('/');
    } else {
      // Om inget matchande val hittas
      console.log('Sidan finns inte.');
    }
  };

  return (
    <div className="header-content">
        <h2 className="title"onClick={() => handleNavigation('home')}>Bookstore</h2>
        <div className="buttons-div">
          <div className="two-buttons-div">
            <button onClick={() => handleNavigation('registerform')}>Registrera</button>
            <button onClick={() => handleNavigation('login')}>Logga in</button>
          </div>
          <div className="cart-icon"onClick={() => handleNavigation('cart')}><BsCart3/>
            <p className="cart-number">{cartCount}</p>
          </div>
        </div>
    </div>  
  )
}

export default Header
