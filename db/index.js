const { MongoClient } = require("mongodb");
class DbConnection {
  constructor() {
    this.#setupCollection();
  }
  connectDB(cb) {
    return MongoClient.connect(process.env.DATABASE_URL)
      .then(async (client) => {
        const database = client.db("Brand");
        const result = await cb(database);
        client.close();
        return result;
      })
      .catch((err) => console.log(err));
  }

  #allCollections = ["users", "products", "favorites", "carts"];
  #setupCollection() {
    this.connectDB(async (database) => {
      const collections = await database.listCollections().toArray();
      if (collections.length < 4) {
        collections.map((ele) => {
          if (this.#allCollections.includes(ele.name))
            this.#allCollections.splice(
              this.#allCollections.indexOf(ele.name),
              1
            );
          return ele;
        });
        this.#allCollections.forEach((ele) =>
          this.connectDB((database) => database.createCollection(ele))
        );
      }
    });
  }
}
const dbConnection = new DbConnection();
module.exports = dbConnection;
