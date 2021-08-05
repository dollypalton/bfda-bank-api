const { Router } = require("express");
const deleteCustomer = require("./deleteCustomer");
const userBalance = require("./userBalance");
const auth = require("./auth");

const pageRoute = Router();

pageRoute.use("/", auth);
pageRoute.use("/", userBalance);
pageRoute.use("/", deleteCustomer);

module.exports = pageRoute;
