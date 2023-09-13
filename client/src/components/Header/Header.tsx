import "./Header.css"
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

  return (
    <div className="header-content">
        <h2 className="title">Header</h2>
        <div className="buttons-div">
        <button onClick={navigateToRegisterForm}>Registrera</button>
        <button onClick={navigateToLogin}>Logga in</button>
        </div>
        
    </div>
  )
}

export default Header