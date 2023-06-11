const joi = require("joi");
class AuthValidation {
  static emailSchema = {
    body: joi.object().keys({
      email: joi.string().email().required("email is required")
    }),
  };

  static topVerifySchema = {
    body: joi.object().keys({
      otp: joi.string().required("otp is required"),
      token: joi.string().required("Token is required"),
    }),
  };

  static uploadDocumentSchema = {
    body: joi.object().keys({
      name: joi.string().required("Name is required"),
      token: joi.string().required("Token is required"),
      mobile: joi.string().required("Mobile is required")
    }),
  };
  static loginSchema = {
    body: joi.object().keys({
      email: joi.string().email().required("Email is required"),
      password: joi.string().required("Password is required")
    }),
  };

}

module.exports = {
    AuthValidation,
};
