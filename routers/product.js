const {Router} = require('express')
const productController = require('../controllers/Product.js')
const router = Router()
router.post('/addproduct',productController.addProduct);
router.patch('/updateproduct',productController.updateProduct);
router.get('/',productController.getProducts);

module.exports = router