const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const CLIENT_URL = "http://localhost:5173"

async function checkout (req, res) {
    try {
        console.log(req.body)
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map(item => { 
                return {
                    price: item.id,   
                    quantity: item.quantity,
                }
            }),
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
            allow_promotion_codes: true
        });
        res.status(200).json({ url: session.url, sessionId: session.id  })
    } catch (error) {
        console.log(error);
        res.status(400).json("Det gick inte så bra")
    }
}


async function verify(req, res) {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
         if(session.payment_status != "paid") {
             return res.status(400).json({ verified: false });
         }
 
         const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
 
         const order = {
             created: session.created,
             customer: session.customer_details.name,
             email: session.customer_details.email,
             products: line_items.data.map(item => {
                 return {
                     product: item.description,
                     quantity: item.quantity,
                     price: item.price.unit_amount/100,
                 }
             })
         }

         console.log("ORDER", order)
 
         // HÄR SKA VI SPARA ORDERN OCH SKICKA DEN VIDARE TIL JSON
 
        res.status(200).json({ verified: true });
 
  
 
    } catch (error) {
 
        console.log(error.message);
 
        res.status(500).json({ error: "Ett fel uppstod vid behandling av ordern." });
 
    }
}

// async function verify(req, res){
//     try{
//     //retrieve session from stripe
//     const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);//expanda eller (populate)
//     if (!session.payment_status !="paid"){
//         return res.status(400).json({ verified: false })
//     }

//     const line_items= await stripe.checkout.sessions.listLineItems(req.body.sessionId)

//     const order = {
//         created: session.created,
//         customer: session.customer_details.name,
//         email: session.customer_details.email,
//         products: line_items.data.map(item => {
//             return {
//                 product: item.description,
//                 quantity: item.quantity,
//                 price: item.price.unit_amount /100 * item.quantity,
//             }
//         })
//     };
//         console.log("ORDER", order);

//     res.status(200).json({verified:true});
//     }catch (error){
//         console.log(error.message); 
//     }
// }


module.exports = { checkout, verify }