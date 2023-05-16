const jwt = require("jsonwebtoken");
const authController = require("../controllers/User.js");

const authMiddleware = async (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization) {
  //   throw new Error("Unauthorized");
  // }
  // const token = authorization.split("Bearer ")[1];
 
  const secret = "my_secret_key";
  const options = {
    expiresIn: "10h",
  };
  const decoded = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDYzMTZiOGJhOGU4YWEzN2YyZTJkOTgiLCJpYXQiOjE2ODQyMTU0ODEwOTEsImV4cCI6MTY4NDIxNTQ4NDY5MX0.7qoFe91ILGJAmGjxXWNyB7w55AuJwDgLmfRYwoaAuQo",
    secret,
    options
  );
  if (!decoded) {
    throw new Error("Unauthorized");
  }
  req.user = await authController.getUserById(decoded.sub);
  next();
};
module.exports = authMiddleware;
