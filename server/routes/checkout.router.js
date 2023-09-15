const express = require("express")
const { checkout } = require("../controllers/checkout.controller")
const checkoutRouter = express.Router()

checkoutRouter.get("/checkout", checkout)

 

module.exports = checkoutRouter;