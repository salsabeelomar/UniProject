const CustomError = require("./CustomError");

const errorHandler = (cb) => {
  return async (req, res, next) => {
    try {
      cb(req, res, next);
    } catch (error) {
      if (error.statusCode) {
        next(error);
      } else {
        next(new CustomError(500, "Internal server Error"));
      }
    }
  };
};
module.exports = errorHandler;
