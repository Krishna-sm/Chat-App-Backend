const mongoose  = require("mongoose")
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    isContact:{
        type:Boolean,
        default: false
    }
},{
    timestamps:true
})

const model = mongoose.model("contact",contactSchema);

module.exports = model