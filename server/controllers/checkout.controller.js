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
        res.status(200).json({ url: session.url })
    } catch (error) {
        console.log("hej")
        console.log(error);
        res.status(400).json("Det gick inte så bra")
    }
}

 

module.exports = { checkout }