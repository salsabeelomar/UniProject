const { MongoClient } = require("mongodb");
class DbConnection {
  database;
  #allCollections = ["users", "products", "favorite", "carts"];
  constructor() {
    this.#setupCollection();
  }

  connectDb() {
    try {
      const connection = new MongoClient(process.env.DATABASE_URL);
      this.database = connection.db("Brand");
    } catch (err) {
      console.log(err);
    }
  }

  async #setupCollection() {
    try {
      this.connectDb();
      const collections = await this.database.listCollections().toArray();
      if (collections.length < 4) {
        collections.map((ele) => {
          if (this.#allCollections.includes(ele.name))
            this.#allCollections.splice(
              this.#allCollections.indexOf(ele.name),
              1
            );
        });
        this.#allCollections.map((ele) => {
          this.database
            .createCollection(ele)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
const { database } = new DbConnection();
module.exports = database;
