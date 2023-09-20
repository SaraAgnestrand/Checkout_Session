import { useState, useContext } from "react"
import { CustomerContext } from "../../context/CustomerContext"
import "./Registerform.css"


function Registerform() {  
  const {registerCustomer} = useContext(CustomerContext)
  const [ name, setName] = useState("")
  const [ email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
  <div className="form-container">
    <h2>Ny kund</h2>
    <input value= {name} onChange={ (e)=>setName(e.target.value)}type="text" placeholder="Namn" required></input>
    <input value= {email} onChange={ (e)=>setEmail(e.target.value)} type="text" placeholder="Email" required></input>
    <input value= {password} onChange={ (e)=>setPassword(e.target.value)}type="password" placeholder="Password" required></input>
    <button onClick={()=>registerCustomer({name, email, password})}>Registrera</button>
  </div>
  )
}

export default Registerform