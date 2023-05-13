const { Router } = require("express");
const productRouter = require('./product.js');
const cartRouter = require('./cart.js');
const favoriteRouter = require('./favorite.js');

const router = Router();

router.use("/product",productRouter);
router.use('/cart',cartRouter);
router.use('/favorite',favoriteRouter);

module.exports = router;
