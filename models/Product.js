const dbConnection = require("../db");
const CustomError = require("../helpers/CustomError");
const { productSchema } = require("../validations/collectionSchemes");
class Product {
  constructor() {
    dbConnection.connectDB(this.#addProductSchema);
  }
  async #addProductSchema(database) {
    await database.command(productSchema);
  }
  async addProduct(productItem, vendorId) {
    return dbConnection.connectDB(async (database) => {
      try {
        const newProduct = await database.collection("products").insertOne({
          vendorId,
          ...productItem,
        });
        console.log("newProduct", newProduct);
        return {
          statusCode: 201,
          data: {
            product: { id: newProduct.insertedId, ...productItem },
          },
        };
      } catch (error) {
        console.log(
          error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties
        );
        if (error.code === 121)
          return new CustomError(
            121,
            ` DB Error is missing ${error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties}`
          );
        //   return error.errInfo.details.schemaRulesNotSatisfied;
        // throw new CustomError(500, " Internal Server Error");
      }
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

const productModel = new Product();
module.exports = productModel;
