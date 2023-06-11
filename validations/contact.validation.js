const joi = require("joi");
class ContactValidation {
  static contactSchema = {
    body: joi.object().keys({
      name: joi.string().required(),
      email: joi.string().required(),
      mobile: joi.string().required().min(10),
      msg: joi.string().required(),
    }),
  };


}

module.exports = {
  ContactValidation,
};
