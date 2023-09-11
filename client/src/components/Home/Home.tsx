
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div className="main-content">
      <Router>
        <Routes>
          {/* <Route path="/" element={<ProductList />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<RegisterCustomer />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </Router>
      
    </div>
  );
 
}

export default Home;
