import React from 'react'

function home() {
  return (
    <div className= "main">
      <div className='headerContainer'>
        <h1 className='title'>Bookstore</h1>
        <p>Logga in</p>
        <p>Kundkorg</p>
      </div>
      <div className='productsContainer'>
        <ol>
          <li>
            <img src="" alt="" />
            <title></title>
            <p>Beskrivning</p>
            <p>pris</p>
            <button>Köp</button>
          </li>
        </ol>
      </div>
      <div className='footer'>
        <p>by Sara</p>
      </div>
    </div>
  )
}

export default home
//Sida som ska visa alla produkter
// function  button () {
//   return (
//     <div> 
//         <button>GE MIG PENGAR</buttom> 
//     </div>
//   )
// }

// export default  button 