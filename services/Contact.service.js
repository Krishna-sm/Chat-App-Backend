const httpStatus = require("http-status");
const { ContactModel } = require("../models");
const ApiError = require("../utils/ApiError");

class ContactService {
  static createContactService = async (body) => {
    try {
      const { name, email, msg, mobile } = body;
      await ContactModel.create({
        name,
        email,
        msg,
        mobile,
      });
      return {
        msg: "success",
      };
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
}

module.exports = ContactService;
