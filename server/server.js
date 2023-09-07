require("dotenv").config();
const express = require ("express")
const cors = require ("cors")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const customerRouter = require("./routes/customers.router")

const app = express();

//Middlewares
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use("/customers", customerRouter);




app.listen(3000, () => console.log("Server is up and running.."));