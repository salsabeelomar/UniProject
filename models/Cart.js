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
  async addToCart(req, res) {
    const addCb = async (database) => {
      try {
        const cartItems = await database.collection("carts").insertOne({
          userId: new ObjectId("64569f28585e9e55fb795f8d"),
          cartItems: [
            {
              productId: new ObjectId("645d0f1ba31fa452093a5fa8"),
              quantity: 3,
              price: 100,
            },
          ],
        });
        console.log(cartItems);
        res.json({ cartItems });
      } catch (error) {
        // if (error.code==121)
        console.log(error);
        res.json(error);
      }
    };
    dbConnection.connectDB(addCb);
  }
  async updateCartItems(req, res) {
    const addCb = async (database) => {
      try {
        const cartItems = await database.collection("carts").updateOne(
          { _id: new ObjectId("645fcc9eec0cbbc36aa45bee") },
          {
            $set: {
              cartItems: [
                {
                  productId: new ObjectId("645d0f1ba31fa452093a5fa8"),
                  quantity: 7,
                  price: 700,
                },
              ],
            },
          }
        );
        console.log(cartItems);
        res.json({ cartItems });
      } catch (error) {
        // if (error.code==121)
        console.log(error);
        res.json(error);
      }
    };
    dbConnection.connectDB(addCb);
  }
  async deleteCartItems(req, res) {
    const addCb = async (database) => {
      const cartItems = await database
        .collection("carts")
        .deleteOne({ _id: new ObjectId("645fd14733e22e01d97065d7") });
      res.json({ cartItems });
      if (cartItems.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    };
    dbConnection.connectDB(addCb);
  }
}

const cartModel = new Cart();
module.exports = cartModel;
