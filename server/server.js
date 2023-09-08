require("dotenv").config();
const express = require ("express")
const cors = require ("cors")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const customerRouter = require("./routes/customers.router")
//const cookieSession = require("cookie-session");

const app = express();

//Middlewares 
app.use(
    cors({
        origin: "*",
    })
);


//Kod från ett tidigare projekt. Hur ska denna cookie se ut?
// app.use(cookieSession({
//     secret: "s3cr3t",
//     maxAge: 1000 * 10,
//     httpOnly: false
// }));


app.use(express.json());
app.use("/api/customers", customerRouter);


app.listen(3000, () => console.log("Server is up and running.."));