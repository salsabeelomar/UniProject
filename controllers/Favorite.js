const favoriteModel = require("../models/Favorite");

class Favorite {
  async getFavoriteItems(req, res, next) {
    favoriteModel
      .getFavoriteItems(req.user._id)
      .then((data) => res.json(data))
      .catch((err) => next(500, err.message && "Internal Server Error"));
  }
  async addToFavorite(req, res, next) {
    favoriteModel
      .addToFavorite(req.user._id, req.body.productId)
      .then((data) => res.json(data))
      .catch((err) => next(500, err.message && "Internal Server Error"));
  }

  async deleteFavoriteItems(req, res, next) {
    favoriteModel
      .addToFavorite(req.user._id, req.body.productId)
      .then((data) => res.json(data))
      .catch((err) => next(500, err.message && "Internal Server Error"));
  }
}

const favorite = new Favorite();
module.exports = favorite;
