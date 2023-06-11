const express= require('express');
const router= express.Router();
const validate = require("../../middleware/validate");
const { AuthValidation } = require('../../validations/auth.validation');
const AuthController = require('../../controllers/Auth.controller');
const multer = require('../../utils/multer');
const { verifyJwt } = require('../../middleware/token');


router
.route('/check-email')
.post(validate(AuthValidation.emailSchema),AuthController.checkEmailExistance)



router
.route('/verify-email-otp')
.post(validate(AuthValidation.topVerifySchema),AuthController.VerifiedEmailWithOtp)



router
.route('/upload-document')
.post(multer.single("resume"),validate(AuthValidation.uploadDocumentSchema),AuthController.uploadDocument)


router
.route('/login')
.post(validate(AuthValidation.loginSchema),AuthController.loginController)

router
.route('/profile')
.get(verifyJwt,AuthController.ProfileController)


router
.route('/forget-password')
.get(validate(AuthValidation.emailSchema),AuthController.ForgetPassword)






module.exports = router;




/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Route for Chat App
 */


