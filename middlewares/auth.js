const jwt = require("jsonwebtoken");
const authController = require("../controllers/User.js");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    throw new Error("Unauthorized");
  }
  const token = authorization.split("Bearer ")[1];
  const secret = "my_secret_key";
  const options = {
    expiresIn: "1h",
  };
  const decoded = jwt.verify(token, secret, options);
  if (!decoded) {
    throw new Error("Unauthorized");
  }
  req.user = await authController.getUserById(decoded.sub);
  next();
};
module.exports = authMiddleware;
