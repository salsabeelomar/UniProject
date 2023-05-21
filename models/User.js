const { ObjectId } = require("mongodb");
const dbConnection = require("../db");
const { userSchema } = require("../validations/collectionSchemes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("../helpers/CustomError");

class User {
  constructor() {
    dbConnection.connectDB(this.#addUserSchema);
  }
  async #addUserSchema(database) {
    await database.command(userSchema);
  }

  static #generateToken(user) {
    // const payload = {
    //   sub: user._id,
    //   iat: Date.now(),
    // };
    // console.log(payload, "ooo");

    return jwt.sign(user, process.env.SECRET_KEY);
  }
  async getUserById(id) {
    return dbConnection.connectDB(async (database) => {
      try {
        const user = await database
          .collection("users")
          .findOne(
            { _id: new ObjectId(id) },
            { projection: { name: 1, email: 1 } }
          );
        return user;
      } catch (error) {
        return new CustomError(404, "user not found");
      }
    });
  }
  async signUp(userData) {
    return dbConnection.connectDB(async (database) => {
      try {
        const existingUser = await database.collection("users").findOne({
          email: userData.email,
        });
        if (existingUser) {
          return new CustomError(409, "Email is already taken");
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const inserted = await database
          .collection("users")
          .insertOne({ ...userData, password: hashedPassword });

        const insertedUser = {
          id: inserted.insertedId,
          name: userData.name,
          email: userData.email,
        };

        return {
          statusCode: 201,
          data: {
            ...insertedUser,
            token: User.#generateToken(insertedUser),
          },
        };
      } catch (error) {
        return new CustomError(400, "Bad Request");
      }
    });
  }

  async signIn(userData) {
    return dbConnection.connectDB(async (database) => {
      try {
        const user = await database
          .collection("users")
          .findOne({ email: userData.email });

        if (!user) {
          return new CustomError(404, "User not found");
        }
        const isPasswordValid = await bcrypt.compare(
          userData.password,
          user.password
        );
        if (!isPasswordValid) {
          return new CustomError(401, " invalid credentials");
        }
        return {
          statusCode: 200,
          data: {
            name: user.name,
            email: user.email,
            token: User.#generateToken(user),
          },
        };
      } catch (error) {
        console.log(error, "sssssssssssssssssssssss");
        throw new CustomError(500, "Internal Server Error");
      }
    });
  }
}

const userModel = new User();
module.exports = userModel;
