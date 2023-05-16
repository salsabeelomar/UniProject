const { ObjectId } = require("mongodb");
const dbConnection = require("../db");
const { userSchema } = require("../validations/collectionSchemes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class User {
  constructor() {
    dbConnection.connectDB(this.#addUserSchema);
  }
  async #addUserSchema(database) {
    await database.command(userSchema);
  }

  static generateToken(user) {
    const payload = {
      sub: user._id,
      iat: Date.now(),
    };
    const secret = "my_secret_key";
    const options = {
      expiresIn: "1h",
    };
    return jwt.sign(payload, secret, options);
  }
  async getUserById(id) {
    const addCb = async (database) => {
      try {
        const user = await database
          .collection("users")
          .findOne({ _id: new ObjectId(id) });
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
        console.log("User does not exists");
      }
    };
    return dbConnection.connectDB(addCb);
  }

  async signUp(req, res) {
    const { name, email, password } = req.body;

    const addCb = async (database) => {
      try {
        const existingUser = await database.collection("users").findOne({
          email,
        });
        if (existingUser) {
          throw new Error("Email is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
          name,
          email,
        };
        await database
          .collection("users")
          .insertOne({ ...user, password: hashedPassword });
        res.send({
          statusCode: 200,
          user: {
            name,
            email,
            token: User.generateToken(user),
          },
        });
      } catch (error) {
        res.send({
          statusCode: 400,
          message: "User is already exists",
        });
      }
    };
    dbConnection.connectDB(addCb);
  }

  async signIn(req, res) {
    const addCb = async (database) => {
      try {
        const { email, password } = req.body;
        const user = await database.collection("users").findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }
        res.send({
          statusCode: 200,
          user: {
            name: user.name,
            email: user.email,
            token: User.generateToken(user),
          },
        });
      } catch (error) {
        console.log(error);
        res.send({
          statusCode: 400,
          message: "Email or Password does not match",
        });
      }
    };
    dbConnection.connectDB(addCb);
  }
}

const user = new User();
module.exports = user;
