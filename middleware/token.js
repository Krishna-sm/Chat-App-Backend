const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const JWTtokens = require("../config/jwt");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req?.headers["authorization"];
    if (token) {
      if (!token.startsWith("Bearer ")) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Token");
      }
    }
    const authToken = token?.split(" ")[1];
    const verified = await jwt.verify(authToken, JWTtokens.loginSIgn);
    // console.log("verified",verified)
    req.user = await verified.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(httpStatus.BAD_REQUEST, `Token expired`);
    }
   next(error);
  }
};


module.exports ={
    verifyJwt
}