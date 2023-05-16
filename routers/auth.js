const { Router } = require("express");
const authController = require("../controllers/User.js");
const authMiddleware = require("../middlewares/auth.js");
const router = Router();

router.post("/login", authController.signIn);
router.post("/signup", authController.signUp);
router.post("/", authMiddleware);
module.exports = router;
