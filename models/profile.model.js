const mongoose = require("mongoose");

const schema =  new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
            unique:true
        },
        avatar:{
            type:String,
            default:"https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"

        },
        address:{
            type:String,
            default:""
        }
},{
    timestamps:true
})

const model = mongoose.model("profile",schema);

module.exports = model;