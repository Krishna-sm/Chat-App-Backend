const httpStatus = require("http-status");
const {  AuthService } = require("../services")
const catchAsync = require("../utils/catchAsync");
const checkEmailExistance = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.checkEmailExistanceService(req.body);
    res.status(httpStatus.CREATED).send(res_obj);
})

const VerifiedEmailWithOtp = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.verifyEmailWIthTokenAndOtp(req.body);
    res.status(httpStatus.OK).send(res_obj);
})

const uploadDocument = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.uploadProfileAndAccountCreate(req?.body,req?.file);
    res.status(httpStatus.OK).send(res_obj);
})
const loginController = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.loginService(req?.body);
    res.status(httpStatus.OK).send(res_obj);
})
const ProfileController = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.profileService(req?.user);
    res.status(httpStatus.OK).send(res_obj);
})
const ForgetPassword = catchAsync(async(req,res)=>{
    const res_obj = await AuthService.ForgetPasswordService(req?.body);
    res.status(httpStatus.OK).send(res_obj);
})
module.exports={
    checkEmailExistance,
    VerifiedEmailWithOtp,
    uploadDocument,
    loginController,
    ProfileController,
    ForgetPassword
}