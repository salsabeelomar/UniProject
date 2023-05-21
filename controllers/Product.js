
const CustomError = require("../helpers/CustomError");
const productModel = require("../models/Product");
class Product {

  async addProduct(req, res, next) {
    const { name, description, stock, price, size, images } = req.body;
    productModel
      .addProduct(
        { name, description, stock, price, size, images },
        req.user._id
      )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(new CustomError(500, err.message && "Internal Server Error"));
      });
  }

  async updateProduct(req, res, next) {
    const { _id, name, description } = req.body;
    productModel
      .updateProduct({ _id, name, description })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        next(new CustomError(500, error.message && "Internal Server Error"));
      });
  }
  async getProducts(req, res, next) {
    productModel
      .getProducts()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        next(new CustomError(500, error.message && "Internal Server Error"));
      });
  }
  async getByNameProducts(req, res, next) {
    productModel
      .getByNameProducts(req.query.name)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        next(new CustomError(500, error.message && "Internal Server Error"));
      });
  }
}

const product = new Product();
module.exports = product;
