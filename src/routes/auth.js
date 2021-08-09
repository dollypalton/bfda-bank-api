const { Router } = require("express");
const auth = require("../controllers/auth");
// const authCustomer = require("../middleware/auth");

const authRoute = Router();

authRoute.post("/signup", auth.signUp);
authRoute.get("/signin", auth.signIn);

module.exports = authRoute;
