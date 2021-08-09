const { Router } = require("express");
const deleteCustomer = require("./deleteCustomer");
const userBalance = require("./userBalance");
const auth = require("./auth");
const checkAuthorization = require("../middleware/checkAuthorization");

const pageRoute = Router();

pageRoute.use("/", auth);
pageRoute.use("/", checkAuthorization, userBalance);
pageRoute.use("/", checkAuthorization, deleteCustomer);

module.exports = pageRoute;
