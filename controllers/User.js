const userModel = require("../models/User");
const CustomError = require("../helpers/CustomError");


class User {
  async signUp(req, res, next) {
    const { name, email, password } = req.body;
    userModel
      .signUp({ name, email, password })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(new CustomError(500, err.message && "Internal Server Error"));
      });
  }
  async signIn(req, res, next) {
    const { email, password } = req.body;
    userModel
      .signIn({ email, password })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(new CustomError(500, err.message && "Internal Server Error"));
      });
  }
}

const user = new User();
module.exports = user;
