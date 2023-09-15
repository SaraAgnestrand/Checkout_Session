const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


console.log("utanför funktionen")
async function getAllProducts(req, res){
  console.log("inne i funktionen")
 try{
  console.log("Före produkterna")
  const products = await stripe.products.list({
      limit: 10,
    });
      console.log("hej hej")
      console.log(products);
       res.status(200).json(products);
  }catch(error){
res.status(400).json(error);
console.log(error.message);
  }
}

// async function getAllProducts(req, res){
//     console.log("inne i funktionen")
//    try{
//     console.log("Före produkterna")
//     const products = await stripe.products.list({
//         limit: 3,
//       });
//         console.log("hej hej")
//         console.log(products);
//          res.status(200);
//     }catch(error){
//  res.status(400);
//  console.log(error.message);
//     }
// }
module.exports = { getAllProducts  } 


//function addToCart
//function createOrder???