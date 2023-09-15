const express = require("express")
const productRouter = express.Router()
const { getAllProducts } = require("../controllers/products.controller")

productRouter.get("/", getAllProducts)

// productRouter.get("/products", (req, res) => {
//     console.log("inne i router")  
// })

module.exports = productRouter;