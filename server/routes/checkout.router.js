const express = require("express")
const { checkout } = require("../controllers/checkout.controller")
const checkoutRouter = express.Router()


checkoutRouter.post("/create-checkout-session", checkout)


module.exports = checkoutRouter;