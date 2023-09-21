import { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { CustomerContext } from "../../context/CustomerContext"

interface ICartItem {
  id: string;
  quantity: number;
}

function Cart() {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const customerContext = useContext(CustomerContext); 

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const cartFromStorage = JSON.parse(localStorage.getItem("cart")!);
      setCart(cartFromStorage);
    } else {
      setCart([]);
    }
  }, []);

  async function handlePayment() {
    if (!customerContext || !customerContext.loggedinCustomer) {
      // Kontrollera om användaren är inloggad innan de går till kassan
      alert("Du måste vara inloggad för att gå till kassan.");
      return;
    }

    const items = cart.map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    console.log("Items to be sent to server:", items);

    const response = await fetch("http://localhost:3000/api/checkout/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      return;
    }
    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId)
    window.location = url;
    console.log("Redirecting to checkout:", url);
  }

  return (
    <div className="cart-div">
      <h1>Kundkorg:</h1>
      {cart.map((item) => (
        <div className="cart-card" key={item.id}>
          <h3>Antal: {item.quantity}</h3>
        </div>
      ))}
      <p>För att kunna handla måste du vara inloggad.</p>
      <button onClick={handlePayment}>Gå till kassa</button>
    </div>
  );
}

export default Cart;
