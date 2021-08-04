const { Router } = require("express")
const deleteCustomer = require("../controllers/deleteCustomer")

const deleteCustomerRoute = Router()

deleteCustomerRoute.post("/deletecustomer", deleteCustomer)


module.exports = deleteCustomerRoute