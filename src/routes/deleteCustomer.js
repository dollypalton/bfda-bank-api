const { Router } = require("express");
const deleteCustomer = require("../controllers/deleteCustomer");

const deleteCustomerRoute = Router();

deleteCustomerRoute.delete("/deletecustomer", deleteCustomer);

module.exports = deleteCustomerRoute;
