const express = require("express");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routers");
const CustomError = require("./helpers/CustomError");

class App {
  app;
  constructor() {
    this.#initMiddleware();
  }
  #initMiddleware() {
    this.app = express();
    this.app.use([
      cors(),
      compression(),
      express.urlencoded({ extended: false }),
      express.json(),
      cookieParser(),
    ]);
    this.app.use("/api/v1", router);
    this.app.use((req, res, next, err) => {
      throw new CustomError(500, "Internal");
    });
  }
}

const { app } = new App();
module.exports = app;
