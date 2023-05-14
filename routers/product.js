const { Router } = require("express");
const productController = require("../controllers/Product.js");
const authMiddleware = require("../middlewares/middleware.js");
const router = Router();

router.post("/addproduct", authMiddleware, productController.addProduct);
router.patch("/updateproduct", authMiddleware, productController.updateProduct);
router.get("/", productController.getProducts);

module.exports = router;
