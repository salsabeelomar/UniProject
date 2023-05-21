const Joi = require("joi");

var regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function validateLogin(user) {
  const LoginSchema = Joi.object({
    email: Joi.string().email().min(8).required(),
    password: Joi.string().min(8).max(16).pattern(regularExpression).required(),
  });

  return Joi.validate(user, LoginSchema);
}
module.exports = validateLogin;
