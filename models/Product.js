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
        return {
          statusCode: 201,
          data: {
            product: { id: newProduct.insertedId, ...productItem },
          },
        };
      } catch (error) {
        if (error.code === 121)
          return new CustomError(
            121,
            ` DB Error is missing ${error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties}`
          );

        throw new CustomError(500, " Internal Server Error");
      }
    });
  }
  async updateProduct(editedProduct) {
    const { _id, name, description } = editedProduct;
    return dbConnection.connectDB(async (database) => {
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
        return {
          statusCode: 200,
          data: {
            product: productItem,
          },
        };
      } catch (error) {
        if (error.code == 121)
          return new CustomError(
            121,
            ` DB Error is missing ${error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties}`
          );
        throw new CustomError(500, " Internal Server Error");
      }
    });
  }
  async getProducts() {
    return dbConnection.connectDB(async (database) => {
      try {
        const productItem = await database
          .collection("products")
          .find({})
          .toArray();
        return {
          statusCode: 200,
          data: {
            product: productItem,
          },
        };
      } catch (error) {
        throw new CustomError(400, "bad Request ");
      }
    });
  }
  async getByNameProducts(name) {
    return dbConnection.connectDB(async (database) => {
      try {
        const productItem = await database
          .collection("products")
          .find({ name: new RegExp(name, "i") })
          .toArray();
        return {
          statusCode: 200,
          data: {
            product: productItem,
          },
        };
      } catch (error) {
        if (error.code == 121)
          return new CustomError(
            121,
            ` DB Error is missing ${error.errInfo.details.schemaRulesNotSatisfied[0].missingProperties}`
          );
        throw new CustomError(404, "No Result ");
      }
    });
  }
  async getProductById(productId) {
    return dbConnection.connectDB(async (database) => {
      try {
        const productItem = await database
          .collection("products")
          .findOne({ _id: productId });
        return productItem;
      } catch (error) {
        throw new CustomError(400, "bad Request ");
      }
    });
  }
}

const productModel = new Product();
module.exports = productModel;
