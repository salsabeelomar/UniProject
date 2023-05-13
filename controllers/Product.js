const { ObjectId } = require("mongodb");
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
    const addCb = async (database) => {
      try {
        // const data = req.body;
        const productItem = await database.collection("products").insertOne({
          vendorId: new ObjectId("64569f28585e9e4efb795f8d"),
          name: "Tshirt",
          description: "kkkkkkk",
          stock: 15,
          price: 150,
          size: ["m", "l"],
          images: ["imaage.png"],
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
    const addCb = async (database)=>{
      try {
        const productItem = await database.collection("products").updateOne(
          { _id: new ObjectId("645f7395244439d6c7c68322")},
          {
            $set: {
              name: "Red T-shirt",
              description: "High High quality",
            },
          }
        );
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
  async getProducts(req, res) {
    const addCb = async (database) => {
      try {
        const productItem = await database.collection("products").find({}).toArray();
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
}

const product = new Product();
module.exports = product;
