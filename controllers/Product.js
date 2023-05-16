const dbConnection = require("../db");
const { productSchema } = require("../validations/collectionSchemes");
class Product {
  constructor() {
    dbConnection.connectDB(this.#addProductSchema);
  }
  async #addProductSchema(database) {
    await database.command(productSchema);
  }
  async addProduct(req, res) {
    const { name, description, stock, price, size, images } = req.body;
    const addCb = async (database) => {
      try {
        const productItem = await database.collection("products").insertOne({
          vendorId: req.user._id,
          name,
          description,
          stock,
          price,
          size,
          images,
        });
        console.log(productItem);
        res.json({ productItem });
      } catch (error) {
        // if (error.code==121)
        console.log(error);
        res.json(error);
      }
    };
    dbConnection.connectDB(addCb);
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
