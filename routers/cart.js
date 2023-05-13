const {Router} = require('express');
const cartController = require('../controllers/Cart.js');
const router = Router();

router.get('/',cartController.getCartItems);
router.patch('/updateitems',cartController.updateCartItems);
router.post('/additems',cartController.addToCart);
router.delete('/deleteitems',cartController.deleteCartItems);

module.exports = router;