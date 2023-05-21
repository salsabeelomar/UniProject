const Joi = require("joi");

function validateProduct(product) {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    size: Joi.array().items(Joi.string()).required(),
    images: Joi.array().items(Joi.image()).required(),
  });
  return Joi.validate(product, productSchema);
}
module.exports = validateProduct;
