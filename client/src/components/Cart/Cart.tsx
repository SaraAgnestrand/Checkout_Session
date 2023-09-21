
import {useEffect, useState } from "react"
import "./Cart.css"
interface ICartItem {
            id: string
            quantity: number
        }

        
function Cart(){
    const [cart, setCart] = useState<ICartItem[]>([])
    useEffect(() => {
        if(localStorage.getItem("cart")) {
            const cartFromStorage = JSON.parse(localStorage.getItem("cart")!)
            setCart(cartFromStorage)
        } else {
            setCart([])
        }
    },[])
    
    async function handlePayment() {

        const items = cart.map(item => ({
            price: item.id,
            quantity: item.quantity,

          }));

          console.log("Items to be sent to server:", items);

        const response = await fetch("http://localhost:3000/api/checkout/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart),
        })
        if(!response.ok) {
            return;
        }
        const { url } = await response.json()
        window.location = url;
    }
    return (
        <div className="cart-div">
            <h1>Kundkorg:</h1>
            {cart.map((item) => (
            <div className="cart-card" key={item.id}>
                <h3>Antal: {item.quantity}</h3>
            </div>
            ))}
            <button onClick={handlePayment}>Gå till kassa</button>
        </div>
  )
}


//   );
export default Cart