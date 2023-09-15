import "./Header.css"
import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
 

function Header() {
  // const { login } = useContext(CustomerContext)
  const navigate = useNavigate();

  const navigateToRegisterForm = () => {
    // Use the navigate function to navigate to the "/registerform" route
    navigate('/registerform');
  };
  const navigateToLogin = () => {
    // Use the navigate function to navigate to the "/registerform" route
    navigate('/login');
  };

  const navigateToCart = () => {
    // Use the navigate function to navigate to the "/registerform" route
    navigate('/cart');
  };

  return (
    <div className="header-content">
        <h2 className="title">BokSafari</h2>
        <div className="buttons-div">
        <button onClick={navigateToRegisterForm}>Registrera</button>
        <button onClick={navigateToLogin}>Logga in</button>
        <div onClick={navigateToCart}><BsCart3/></div>
        </div>
        
    </div>
  )
}

export default Header