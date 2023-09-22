import {useState, useEffect} from "react"
import "./Confirmation.css"

function Confirmation() {

const [ isPaymentVerified, setIsPaymentVerified] = useState(false)

useEffect ( () => {
  const sessionId = localStorage.getItem("session-id") 
  const verifyPayment = async () => {
    const response = await fetch("http://localhost:3000/api/checkout/verify-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sessionId}),
    }); 
    if (!response.ok) {
      throw new Error("Något gick fel med anropet till servern.");
    }
    const {verified} = await response.json()
    if(verified) {
      setIsPaymentVerified(true)
      localStorage.removeItem("session-id")
      localStorage.removeItem("cart")

    } else {

      setIsPaymentVerified(false)

    }
  
  }
  verifyPayment()
}, [])



  return (
    isPaymentVerified ? <div className="confirmation-div">
      <h3>Tack för ditt köp, </h3> 
       <h3> välkommen åter!</h3>
    </div>: <h3>Något gick fel</h3>
    
  )
}

export default Confirmation
//Sida för att meddela att köpet är genomfört
//Funktion för handlePayment, innehållande ett fetch-anrop se Fredriks exempel från 4/9

// function Confirmation() {
//   return (
//     // <div onClick= {handlePayment}>tack för ditt köp</div>
// //   )
// }

// export default Confirmation