const { ObjectId } = require("mongodb");
const dbConnection = require("../db");
const { cartSchema } = require("../validations/collectionSchemes");
const productModel = require("./Product");
const CustomError = require("../helpers/CustomError");
class Cart {
  constructor() {
    dbConnection.connectDB(this.#addCartSchema);
  }
  async #addCartSchema(database) {
    await database.command(cartSchema);
  }
  async getCartItems(userId) {
    dbConnection.connectDB(async (database) => {
      try {
        const cartItems = await database
          .collection("carts")
          .find({ userId })
          .toArray();
        const cart = [];
        for (let i = 0; i < cartItems[0].cartItems.length; i++) {
          const item = await productModel.getProductById(
            cartItems[0].favoriteItems[i]
          );
          cart.push(item);
        }
        return {
          statusCode: 200,
          data: cartItems,
        };
      } catch (err) {
        return new CustomError(400, err);
      }
    });
  }
  async addToCart(userId, cartItem) {
    return dbConnection.connectDB(async (database) => {
      try {
        const user = await database.collection("carts").findOne({ userId });
        const carPro = await productModel.getProductById(
          new ObjectId(cartItem.productId)
        );
        if (!user && carPro) {
          await database.collection("carts").insertOne({
            userId,
            cartItems: [
              {
                ...cartItem,
                productId: new ObjectId(cartItem.productId),
              },
            ],
          });
        } else if (carPro) {
          await database.collection("carts").updateOne(
            { userId },
            {
              $push: {
                cartItems: {
                  ...cartItem,
                  productId: new ObjectId(cartItem.productId),
                },
              },
            }
          );
        }
        return {
          statusCode: 201,
          message: "Product added From cart List successfully",
          data: carPro,
        };
      } catch (error) {
        if (error.code == 121) {
          return new CustomError(121, error);
        }
        return new CustomError(400, " bad Request");
      }
    });
  }

  async deleteCartItems(userId, productId) {
    return dbConnection.connectDB(async (database) => {
      try {
        await database.collection("carts").updateOne(
          { userId },
          {
            $pull: {
              cartItems: {
                productId: new ObjectId(productId),
              },
            },
          }
        );
        return {
          statusCode: 200,
          message: "Product Deleted From Favorite List successfully",
        };
      } catch (error) {
        return new CustomError(400, error);
      }
    });
  }
}

const cartModel = new Cart();
module.exports = cartModel;
