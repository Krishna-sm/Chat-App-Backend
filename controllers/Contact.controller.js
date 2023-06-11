const httpStatus = require("http-status");
const { ContactService } = require("../services")
const catchAsync = require("../utils/catchAsync");
const saveContactDetails = catchAsync(async(req,res)=>{
    const res_obj = await ContactService.createContactService(req.body);
    res.status(httpStatus.CREATED).send(res_obj);
})

module.exports={
    saveContactDetails
}