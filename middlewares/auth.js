const jwt = require("jsonwebtoken");
const authController = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization) {
  //   throw new Error("Unauthorized");
  // }
  // const token = authorization.split("Bearer ")[1];

  const options = {
    expiresIn: "10h",
  };
  const decoded = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5YjU5MzQ2YzdiYmY4MjA2OGEyYTMiLCJuYW1lIjoiZGEiLCJlbWFpbCI6Im9tYXJzYWxzYW5lZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRPOUowVHZTcmREMDZ6M0FRc2NLWTJ1NVRzbXAwLk5zSm9WZmhQUDdBUXJDSVNYRTJIdWlmeSIsImlhdCI6MTY4NDY1OTcyM30.Bp4LuZ-fsNSk18xGf88GpQo14gpCKj03bXE5926yRcc",
    process.env.SECRET_KEY,
    options
  );
  if (!decoded) {
    throw new Error("Unauthorized");
  }
  req.user = await authController.getUserById(decoded._id);
  next();
};
module.exports = authMiddleware;
