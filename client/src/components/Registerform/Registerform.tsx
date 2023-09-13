import { useState, useContext } from "react"
import { CustomerContext } from "../../context/CustomerContext"


function Registerform() {  
  const {registerCustomer} = useContext(CustomerContext)
  const [ name, setName] = useState("")
  const [ email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
  <div>
    <h1>Registrera ny användare</h1>
    <input value= {name} onChange={ (e)=>setName(e.target.value)}type="text" placeholder="Namn" required></input>
    <input value= {email} onChange={ (e)=>setEmail(e.target.value)} type="text" placeholder="Email" required></input>
    <input value= {password} onChange={ (e)=>setPassword(e.target.value)}type="password" placeholder="Password" required></input>
    <button onClick={()=>registerCustomer({name, email, password})}>Registrera</button>
  </div>
  )
}

export default Registerform