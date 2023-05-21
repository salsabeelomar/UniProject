const cartModel = require("../models/Cart");
const CustomError = require("../helpers/CustomError");
class Cart {
  async getCartItems(req, res, next) {
    cartModel
      .getCartItems(req.user._id)
      .then((data) => res.json(data))
      .catch((err) =>
        next(new CustomError(500, err.message && "Internal Server Error"))
      );
  }
  async addToCart(req, res, next) {
    // {cartItem : { price :150  , productId: ,quantity :15 }}
    cartModel
      .addToCart(req.user._id, req.body.cartItem)
      .then((data) => res.json(data))
      .catch((err) =>
        next(new CustomError(500, err.message && "Internal Server Error"))
      );
  }
  // async updateCartItems(req, res) {
  //   const addCb = async (database) => {
  //     try {
  //       const cartItems = await database.collection("carts").updateOne(
  //         { _id: new ObjectId("645fcc9eec0cbbc36aa45bee") },
  //         {
  //           $set: {
  //             cartItems: [
  //               {
  //                 productId: new ObjectId("645d0f1ba31fa452093a5fa8"),
  //                 quantity: 7,
  //                 price: 700,
  //               },
  //             ],
  //           },
  //         }
  //       );
  //       console.log(cartItems);
  //       res.json({ cartItems });
  //     } catch (error) {
  //       // if (error.code==121)
  //       console.log(error);
  //       res.json(error);
  //     }
  //   };
  //   dbConnection.connectDB(addCb);
  // }

  async deleteCartItems(req, res, next) {
    cartModel
      .deleteCartItems(req.user._id, req.body.productId)
      .then((data) => res.json(data))
      .catch((err) =>
        next(new CustomError(500, err.message && "Internal Server Error"))
      );
  }
}
const cart = new Cart();
module.exports = cart;
