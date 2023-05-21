const Joi = require("joi");

var regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function validateSignup(user) {
  const SignupSchema = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().min(8).required(),
    password: Joi.string().min(8).max(16).pattern(regularExpression).required(),
    RePassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  return Joi.validate(user, SignupSchema);

}

module.exports = validateSignup;
