const jwt = require("jsonwebtoken");

// to remove customer, we have to take the token of the signed in user to check if the person is signed in else catch error, if the person is an admin
// if the person the customer exists and then delete, else
// try to remove quote from secret

const checkAuthorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Access Denied, No Token found!" });
  }
  const splitToken = token.split(" ")[1];
  const decodedToken = jwt.verify(splitToken, "RANDOM_TOKEN_SECRET");

  try {
    if (decodedToken.role !== "admin")
      return res.status(401).json({
        message: "user is not an admin",
      });
  } catch (err) {
    res.status(401).json({ message: "Invalid token!" });
  }

  return next();
};

module.exports = checkAuthorization;
