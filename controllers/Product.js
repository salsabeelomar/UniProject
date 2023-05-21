const dbConnection = require("../db");
const CustomError = require("../helpers/CustomError");
const productModel = require("../models/Product");
const { productSchema } = require("../validations/collectionSchemes");
class Product {
  constructor() {
    dbConnection.connectDB(this.#addProductSchema);
  }
  async #addProductSchema(database) {
    await database.command(productSchema);
  }
  async addProduct(req, res, next) {
    const { name, description, stock, price, size, images } = req.body;

    productModel
      .addProduct(
        { name, description, stock, price, size, images },
        req.user._id
      )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(new CustomError(500, err.message && "Internal Server Error"));
      });
  }

  async updateProduct(req, res) {
    const { _id, name, description } = req.body;
    const addCb = async (database) => {
      try {
        const productItem = await database.collection("products").updateOne(
          { _id },
          {
            $set: {
              name,
              description,
            },
          }
        );
        res.json({ productItem });
      } catch (error) {
        // if (error.code==121)
        console.log(error);
        res.json(error);
      }
    };
    dbConnection.connectDB(addCb);
  }
  async getProducts(req, res) {
    const addCb = async (database) => {
      try {
        const productItem = await database
          .collection("products")
          .find({})
          .toArray();
        res.json({ productItem });
      } catch (error) {
        // if (error.code==121)
        console.log(error);
        res.json(error);
      }
    };
    dbConnection.connectDB(addCb);
  }
}

const product = new Product();
module.exports = product;
