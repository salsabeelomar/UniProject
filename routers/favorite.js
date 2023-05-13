const {Router} = require('express');
const favoriteController = require('../controllers/Favorite.js');
const router = Router();

router.get('/',favoriteController.getFavoriteItems);
router.post('/addfavorite',favoriteController.addToFavorite);
router.delete('/deletefavorite',favoriteController.deleteFavoriteItems);

module.exports = router;