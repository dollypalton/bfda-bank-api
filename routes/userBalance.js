const { Router } = require("express")
const userBalance = require("../controllers/userBalance")

const userBalanceRoute = Router()

userBalanceRoute.post("/userbalance", userBalance)


module.exports = userBalanceRoute