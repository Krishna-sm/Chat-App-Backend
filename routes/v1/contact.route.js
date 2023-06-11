const express= require("express");
const validate = require("../../middleware/validate");
const { ContactValidation } = require("../../validations/contact.validation");
const { saveContactDetails } = require("../../controllers/Contact.controller");
const router = express.Router()


router.route('/')
.post(validate(ContactValidation.contactSchema),saveContactDetails)

module.exports = router;