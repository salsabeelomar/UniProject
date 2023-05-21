const { Router } = require("express");
const authController = require("../controllers/User.js");
const authMiddleware = require("../middlewares/auth.js");
const errorHandler = require("../helpers/errorHandler.js");
const router = Router();

router.post("/login", errorHandler(authController.signIn));
router.post("/signup", errorHandler(authController.signUp));
router.post("/", authMiddleware);
module.exports = router;
