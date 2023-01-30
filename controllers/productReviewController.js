const productReviewModel = require("../models/productReviewModel");
const productModel = require("../models/productModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")

exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {productId,rating,comment}= req.body;

    const product=await productModel.findById(productId);

    if(!product)return next(new ErrorHandler("Product not found",400));

    // Getting User's previous Review 
    const previousReview=await productReviewModel.findOne({product:productId,user:req.user._id});

    // Creating new Review
    const productReview =await productReviewModel.create({product:productId,user:req.user._id,rating,comment});

    // Deleteing user's previous review
    if(previousReview){
        await previousReview.remove();
    }

    // Getting All Reviews
    const productReviews = await productReviewModel.find({product:productId});

    let totalRating = 0;
    productReviews.forEach((review)=>{
        totalRating += review.rating;
    })

    product.numofReviews=productReviews.length;
    product.rating = (totalRating/productReviews.length).toFixed(1);

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success:true,
        productReview
    });
})

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product=await productModel.findById(req.params.id);

    if(!product)return next(new ErrorHandler("Product not found",400));

    const productReviews = await productReviewModel.find({product:req.params.id}).populate("user").sort({"createdAt": -1});

    res.status(200).json({
        success:true,
        productReviews,
    })
})

exports.getProductReview = catchAsyncErrors(async (req,res,next) => {

    const product=await productModel.findById(req.params.id);

    if(!product)return next(new ErrorHandler("Product not found",400));

    const productReview =await productReviewModel.findOne({product:req.params.id,user:req.user._id});
    if(!productReview) return next(new ErrorHandler("Product Review not found",400));

    res.status(200).json({
        success:true,
        productReview
    });
})