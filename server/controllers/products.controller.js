const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


async function getAllProducts(req, res){
  console.log("inne i funktionen")
 try{
  const products = await stripe.products.list({
      expand: ["data.default_price"]
    });
       res.status(200).json(products);
  }catch(error){
res.status(400).json(error);
console.log(error.message);
  }
}

module.exports = { getAllProducts  } 
