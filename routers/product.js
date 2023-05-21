const { Router } = require("express");
const productController = require("../controllers/Product.js");
const authMiddleware = require("../middlewares/auth.js");
const errorHandler = require("../helpers/errorHandler.js");
const router = Router();

router.post(
  "/add-product",
  authMiddleware,
  errorHandler(productController.addProduct)
);
router.patch(
  "/update-product",
  authMiddleware,
  errorHandler(productController.updateProduct)
);
router.get("/", errorHandler(productController.getProducts));
router.get("/search", errorHandler(productController.getByNameProducts));

module.exports = router;
