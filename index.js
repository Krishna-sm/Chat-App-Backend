require('colors')
require('dotenv').config()
const app = require('./app');
const { connectDB } = require('./config/db');
// connect db
app.listen(process.env.PORT,()=>{
    console.log(`the app is listen at the port ${process.env.PORT}`.bgCyan.white)
})

connectDB()
















