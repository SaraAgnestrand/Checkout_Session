const express = require("express")
const customerRouter = express.Router()
const { register } = require("../controllers/customers.controller")

customerRouter.post("/register", register)


module.exports = customerRouter