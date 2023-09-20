import { useState, useContext } from "react"
import { CustomerContext } from "../../context/CustomerContext"
import "./Login.css"


function Login() {
const {login} = useContext(CustomerContext)
const [ email, setEmail] = useState("")
const [password, setPassword] = useState("")


  return (
  <div className="login-form">
    <h2>Logga in</h2>
    <input value= {email} onChange={ (e)=>setEmail(e.target.value)} type="text" placeholder="Email"required></input>
    <input value= {password} onChange={ (e)=>setPassword(e.target.value)}type="password" placeholder="Password" required></input>
    <button onClick={()=>login({email, password})}>Logga in</button>
  </div>
  )
}

export default Login