import { useState, useEffect } from "react";
import { BsCart3 } from 'react-icons/bs';
// import { NavLink } from "react-router-dom";
import { ICart } from "../Home/Home";
import { useNavigate } from 'react-router-dom';
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
      console.log('Okänd destination');
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



//Längre version med useNavigate, utan en handleNavigate funktion. 
  // const navigateToRegisterForm = () => {
  //   // Use the navigate function to navigate to the "/registerform" route
  //   navigate('/registerform');
  // };
  // const navigateToLogin = () => {
  //   // Use the navigate function to navigate to the "/registerform" route
  //   navigate('/login');
  // };

  // const navigateToCart = () => {
  //   // Use the navigate function to navigate to the "/registerform" route
  //   navigate('/cart');
  // };
  // const navigateToHome = () => {
  //   // Use the navigate function to navigate to the "/registerform" route
  //   navigate('/');
  // };
//    return (
//     <div className="header-content">
//         <h2 className="title"onClick={navigateToHome}>Bookstore</h2>
//         <div className="buttons-div">
//           <div className="two-buttons-div">
//             <button onClick={navigateToRegisterForm}>Registrera</button>
//             <button onClick={navigateToLogin}>Logga in</button>
//           </div>
//           <div className="cart-icon"onClick={navigateToCart}><BsCart3/>
//             <p className="cart-number">0</p>
//           </div>
//         </div>
//     </div>
        
//   )
// }


//Testat med NavLink men då blev stylingen helt fel så återgick till att använda useNavigate
  // return (
  //   <div className="header-content">
  //     <div className="title">
  //       <NavLink to="/"> {/* Ändra '/' till den faktiska URL:en för startsidan */}
  //         <h2>Bookstore</h2>
  //       </NavLink>
  //     </div>
  //     <div className="button-div">
  //       <div className="two-buttons-div">
  //         <NavLink to="/login">Logga in</NavLink>
  //         <NavLink to="/registerform">Registrera</NavLink>
  //       </div>
  //       <div className="cart-icon">
  //         <NavLink to="/cart">
  //           <BsCart3 />
  //           <p className='cart-number'>0</p>
  //         </NavLink>
  //       </div>
  //     </div>
  //   </div>
  //   )