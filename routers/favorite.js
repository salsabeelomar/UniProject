const { Router } = require("express");
const favoriteController = require("../controllers/Favorite.js");
const errorHandler = require("../helpers/errorHandler.js");
const router = Router();

router.get("/", errorHandler(favoriteController.getFavoriteItems));
router.post("/add-favorite", errorHandler(favoriteController.addToFavorite));
router.delete("/", errorHandler(favoriteController.deleteFavoriteItems));

module.exports = router;
