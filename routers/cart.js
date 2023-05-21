const { Router } = require("express");
const cartController = require("../controllers/Cart.js");
const errorHandler = require("../helpers/errorHandler.js");
const router = Router();

router.get("/", errorHandler(cartController.getCartItems));
router.patch("/update-items", errorHandler(cartController.updateCartItems));
router.post("/add-items", errorHandler(cartController.addToCart));
router.delete("/delete-items", errorHandler(cartController.deleteCartItems));

module.exports = router;
