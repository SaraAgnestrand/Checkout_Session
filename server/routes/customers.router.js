const express = require("express")
const customerRouter = express.Router()
const { register, login } = require("../controllers/customers.controller")



customerRouter.post("/register", register)
customerRouter.post("/login", login)




module.exports = customerRouter