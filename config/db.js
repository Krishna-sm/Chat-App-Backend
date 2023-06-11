const mongoose = require('mongoose');


exports.connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`The db is connect with ${mongoose.connection.host}`);
}