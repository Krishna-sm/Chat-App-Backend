const httpStatus = require("http-status");
const { userModel } = require("../models");
const ApiError = require("../utils/ApiError");
const EmailService = require("./Email.service");
const TokenService = require("./token.service");
const cloudnary = require("../utils/cloudnary");
const AuthPassword = require("../config/password");
// const multer = require('../utils/multer');

const otpMethod = (digit) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < digit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

class AuthService {
  static checkEmailExistanceService = async (body) => {
    try {
      const requestOtp = otpMethod(6);
      const user = await userModel.findOne({ email: body.email });
      if (user) {
        if (user.isEmailVerified && user.isDocumentUpload) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Already Exist User");
        } else {
          await userModel.findByIdAndUpdate(user._id, {
            otp: requestOtp,
          });
          EmailService.checkEmailMessage(body.email, requestOtp);
          const token = await TokenService.generateEMailCheckToken(
            user._id,
            requestOtp
          );
          return {
            msg: "Otp send your email address",
            token,
          };
        }
      }

      const u = await userModel.create({
        email: body.email,
        otp: requestOtp,
        password: AuthPassword.default_password,
      });

      EmailService.checkEmailMessage(body.email, requestOtp);
      const token = await TokenService.generateEMailCheckToken(
        u._id,
        requestOtp
      );
      return {
        msg: "Otp send your email address",
        token,
      };
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  };

  static verifyEmailWIthTokenAndOtp = async (body) => {
    try {
      const { otp, token } = body;
      const verified = await TokenService.VerifyEMailCheckToken(token, otp);
      const user = await userModel.findById(verified?.userId);
      if (user?.otp === "") {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Otp Expired try next time "
        );
      }
      await userModel.findByIdAndUpdate(verified?.userId, {
        isEmailVerified: true,
        otp: "",
      });
      const tokens = await TokenService.generateuploadDocumentToken(
        verified?.userId
      );

      return {
        msg: "otp verified successfully",
        token: tokens,
      };
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, "invalid Otp");
    }
  };

  static uploadProfileAndAccountCreate = async (body, file) => {
    try {
      const { name, mobile, token } = body;
      const verified = await TokenService.VerifyuploadDocumentToken(token);
      const user = await userModel.findById(verified?.userId);
      if (user) {
        if (user.isEmailVerified && user.isDocumentUpload) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Document Already Uploaded"
          );
        }
      }
      const result = await cloudnary.uploader.upload(file.path);
      await userModel.findByIdAndUpdate(user._id, {
        name: name,
        mobile: mobile,
        isDocumentUpload: true,
        resume: {
          cloudnary_id: result.public_id,
          url: result.secure_url,
        },
      });

      await EmailService.ThankuMessage(user.email, name);

      return {
        msg: "thanku for join , we will contact sortly",
      };
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  };

  static loginService = async(body)=>{
    try {
        const {email,password} = body;
        // make a check when admin approve and send the mail of user id and password
        const user =await userModel.findOne({email,isEmailVerified:true,isDocumentUpload:true});
        if(!user)
        {
      throw new ApiError(httpStatus.NOT_FOUND, "No User Found");
        }

        const isMatch = await  user.comparePassword(password);
        if(!isMatch)
        {
      throw new ApiError(httpStatus.NOT_FOUND, "InValid Credentials");
        }

        // token to login the user
        const token  = await TokenService.loginToken(user._id);
        return {
          msg:"login success",
          token
        }

    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
  static profileService = async(userId)=>{
    try {
       
      const user =await userModel.findById(userId).select("name email role mobile");
      if(!user)
      {
          throw new ApiError(httpStatus.NOT_FOUND,"User Not Found");
      }
        return {
          msg:"fetch success",
          user
        }

    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }


  static ForgetPasswordService = async(body)=>{
    try {
       
      const user =await userModel.findOne({email:body.email});
      if(!user)
      {
          throw new ApiError(httpStatus.NOT_FOUND,"User Not Found");
      }
      const pass= await user.encryptPassword(AuthPassword.new_password);

      await userModel.findByIdAndUpdate(user._id,{
        password:pass
      });

      await EmailService.ForgetPasswordMessage(body.email,user.name,AuthPassword.new_password);
        return {
          msg:"password send on your email address"
        }

    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
}

module.exports = AuthService;
