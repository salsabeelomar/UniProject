const express = require("express");
require("dotenv").config();
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");

class App {
  constructor() {
    this.app = express();
    this.#initMiddleware();
  }
  #initMiddleware() {
    this.app.use([
      cors(),
      compression(),
      express.urlencoded({ extended: false }),
      express.json(),
      cookieParser(),
    ]);
  }
}
const { app } = new App();
module.export = app;
