const { Router } = require("express");
const auth = require("../controllers/auth");

const authRoute = Router();

authRoute.post("/signup", auth.signUp);
authRoute.post("/signin", auth.signIn);

module.exports = authRoute;
