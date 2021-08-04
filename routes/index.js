const { Router } = require("express")
const deleteCustomer = require("../controllers/deleteCustomer")
const userBalance = require("../controllers/userBalance")
const auth = require("./auth")

const pageRoute = Router()

pageRoute.use("/", auth)
pageRoute.use("/", userBalance)
pageRoute.use("/", deleteCustomer)

module.exports = pageRoute