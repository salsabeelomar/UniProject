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
    // const { id } = req.params;
    const addCb = async (database) => {
      try {
        const favoriteItems = await database
          .collection("favorites")
          .find({})
          .toArray();
        console.log(favoriteItems);
        res.json(favoriteItems);
      } catch (err) {
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    };
    dbConnection.connectDB(addCb);
  }
  async addToFavorite(req, res) {
    const addCb = async (database) => {
      try {
        const favoriteItem = await database.collection("favorites").insertOne({
          userId: new ObjectId("645d0f1ba3a8"),
          favoriteItems: [new ObjectId("645d0f1a3aty")],
        });
        console.log(favoriteItem);
        res.json(favoriteItem);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
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
