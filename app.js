const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const ApiError = require('./utils/ApiError');
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middleware/error");
const MainRoute= require('./routes/v1');



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(morgan('dev'))



// routes
app.use('/chat-app-service/v1',MainRoute)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);



module.exports =app