class Favorite {
  async addToFavorite(req, res) {}
  async updateFavoriteItems(req, res) {}
  async removeFavoriteItems(req, res) {}
}

const favorite = new Favorite();
module.exports = favorite;
