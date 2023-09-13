
function Registerform() {
  return (
  <div>
    <h1>Registrera ny användare</h1>
    <input type="text" placeholder="Namn" required></input>
    <input type="text" placeholder="Email" required></input>
    <input type="password" placeholder="Password" required></input>
    <button>Registrera</button>
  </div>
  )
}

export default Registerform