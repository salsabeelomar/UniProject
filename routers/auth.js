const { Router } = require("express");
const authController = require("../controllers/User.js");
const authMiddleware = require("../middlewares/middleware.js");
const router = Router();

console.log(authController);
router.post("/login", authController.signIn);
router.post("/signup", authController.signUp);
router.post("/", authMiddleware);
module.exports = router;
