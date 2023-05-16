const { ObjectId } = require("mongodb");
const dbConnection = require("../db");
const { favoriteSchema } = require("../validations/collectionSchemes");
class Favorite {
  constructor() {
    dbConnection.connectDB(this.#addFavouriteSchema);
  }
  async #addFavouriteSchema(database) {
    await database.command(favoriteSchema);
  }
  async getFavoriteItems(req, res) {
    console.log(" req.user._id ", req.user._id);
    const addCb = async (database) => {
      try {
        const favoriteItems = await database
          .collection("favorites")
          .find({ userId: req.user._id }, { favoriteItems: 1, _id: 0 })
          .toArray();
        console.log(favoriteItems);
        res.json(favoriteItems);
      } catch (err) {
        res.json({
          // message: "Internal Server Error",
          error: err,
        });
      }
    };
    dbConnection.connectDB(addCb);
  }
  async addToFavorite(req, res) {
    const addCb = async (database) => {
      try {
        const favoriteItem = await database.collection("favorites").insertOne({
          userId: req.user._id,
          favoriteItems: [
            new ObjectId("645d0cfdf12295c31d17a056"),
            new ObjectId("645d0f1ba31fa6d2093a5fa8"),
          ],
        });
        console.log(favoriteItem);
        res.json(favoriteItem);
      } catch (err) {
        console.log(err);
        res.json({
          error: err,
        });
      }
    };
    dbConnection.connectDB(addCb);
  }

  async deleteFavoriteItems(req, res) {
    const addCb = async (database) => {
      try {
        const favoriteItem = await database.collection("favorites").deleteOne({
          _id: new ObjectId("645d0f1ba31ftt52093a5fa8"),
        });
        console.log(favoriteItem);
        res.json(favoriteItem);
      } catch (err) {
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    };
    dbConnection.connectDB(addCb);
  }
}

const favorite = new Favorite();
module.exports = favorite;
