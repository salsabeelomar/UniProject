const { Router } = require("express");
const productRouter = require("./product.js");
const cartRouter = require("./cart.js");
const favoriteRouter = require("./favorite.js");
const authRouter = require("./auth.js");
const authMiddleware = require("../middlewares/auth.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", authMiddleware, cartRouter);
router.use("/favorite", authMiddleware, favoriteRouter);

module.exports = router;
