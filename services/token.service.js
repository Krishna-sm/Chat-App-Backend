const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const JWTtokens = require("../config/jwt");
const emailCheckSign = JWTtokens.emailCheckSign;
const uploadDocumentSign = JWTtokens.uploadDocumentSign;
const loginSIgn = JWTtokens.loginSIgn;

class TokenService {
  static generateEMailCheckToken = async (user, otp) => {
    const token = await jwt.sign({ userId: user }, `${emailCheckSign}+${otp}`, {
      expiresIn: "300s",
    });
    return token;
  };

  static VerifyEMailCheckToken = async (token, otp) => {
    try {
      const verified = await jwt.verify(token, `${emailCheckSign}+${otp}`);
      return verified;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return new ApiError(httpStatus.BAD_REQUEST, `Token expired`);
      }
      throw new ApiError(httpStatus.BAD_REQUEST, `${error.message}`);
    }
  };

  static generateuploadDocumentToken = async (user) => {
    const token = await jwt.sign({ userId: user }, uploadDocumentSign, {
      expiresIn: "1000s",
    });
    return token;
  };
  static VerifyuploadDocumentToken = async (token) => {
    try {
      const verified = await jwt.verify(token, uploadDocumentSign);
      return verified;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return new ApiError(httpStatus.BAD_REQUEST, `Token expired`);
      }
      throw new ApiError(httpStatus.BAD_REQUEST, `${error.message}`);
    }
  };
  static loginToken = async (user)=>{
    const token = await jwt.sign({ userId: user }, loginSIgn, {
      expiresIn: "5d",
    });
    return token;
  }
}

module.exports = TokenService;
