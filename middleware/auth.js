const userModel = require("../models/userModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const jwt=require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decodedData.id);
    next();
});

exports.isAuthorized= (...roles) => (req,res,next) => {

    if(!roles.includes(req.user.role)) return next(new ErrorHandler('You are not allowed to access this resource',400));
    
    next();
};
