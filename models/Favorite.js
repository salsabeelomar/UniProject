const { ObjectId } = require("mongodb");
const dbConnection = require("../db");
const { favoriteSchema } = require("../validations/collectionSchemes");
const CustomError = require("../helpers/CustomError");
const productModel = require("./Product");
class Favorite {
  constructor() {
    dbConnection.connectDB(this.#addFavouriteSchema);
  }
  async #addFavouriteSchema(database) {
    await database.command(favoriteSchema);
  }
  async getFavoriteItems(userId) {
    return dbConnection.connectDB(async (database) => {
      try {
        const favorites = await database
          .collection("favorites")
          .find({ userId }, { favoriteItems: 1, _id: 0 })
          .toArray();
        const fav = [];

        for (let i = 0; i < favorites[0].favoriteItems.length; i++) {
          const item = await productModel.getProductById(
            favorites[0].favoriteItems[i]
          );
          fav.push(item);
        }

        return {
          statusCode: 200,
          data: fav,
        };
      } catch (err) {
        return new CustomError(400, err);
      }
    });
  }
  async addToFavorite(userId, productId) {
    return dbConnection.connectDB(async (database) => {
      try {
        const userFav = await database
          .collection("favorites")
          .findOne({ userId });

        const favPro = await productModel.getProductById(
          new ObjectId(productId)
        );
        if (userFav && favPro) {
          await database.collection("favorites").updateOne(
            {
              userId,
            },
            { $push: { favoriteItems: new ObjectId(productId) } }
          );
        } else if (favPro) {
          await database.collection("favorites").insertOne({
            userId,
            favoriteItems: [new ObjectId(productId)],
          });

          return {
            statusCode: 201,
            message: "Product added From Favorite List successfully",
            data: favPro,
          };
        } else {
          return {
            statusCode: 404,
            message: "Product not Found",
          };
        }
      } catch (err) {
        return new CustomError(400, err);
      }
    });
  }

  async deleteFavoriteItems(userId, productId) {
    return dbConnection.connectDB(async (database) => {
      try {
        await database.collection("favorites").updateOne(
          {
            userId,
          },
          { $pull: { favoriteItems: new ObjectId(productId) } }
        );
        return {
          statusCode: 201,
          message: "Product Deleted From Favorite List successfully",
        };
      } catch (err) {
        return new CustomError(400, err);
      }
    });
  }
}

const favoriteModel = new Favorite();
module.exports = favoriteModel;
