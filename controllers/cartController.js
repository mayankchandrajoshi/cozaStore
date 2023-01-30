const cartModel = require("../models/cartModel");
const catchAsyncErrors  = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler")

exports.createCartItem = catchAsyncErrors(async (req,res,next) => {
    const {name,quantity,image,productId,itemSize,itemColor} = req.body;

    const CartItem = await cartModel.findOne({product:productId,user:req.user._id,itemSize,itemColor});

    if(CartItem) return next(new ErrorHandler("Cart Item with same Size and Color already exists",400));

    const cartItem = await cartModel.create({user:req.user._id,name,quantity,image,product:productId,itemSize,itemColor});

    res.status(201).json({
        success:true,
        cartItem
    })
})

exports.getCartItems = catchAsyncErrors(async (req,res,next) => {
    const cartItems = await cartModel.find({user:req.user._id}).populate("product");

    res.status(200).json({
        success:true,
        cartItems
    })
})

exports.updateCartItems = catchAsyncErrors(async (req,res,next) => {
    const { newQuantity,cartItemId} = req.body;
    const cartItem =  await cartModel.findOneAndUpdate({user:req.user._id,_id:cartItemId},{quantity:newQuantity}, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if(!cartItem)return next(new ErrorHandler("Cart Item not Found",400));

    res.status(200).json({
        success:true,
    })
})

exports.deleteCartItem  = catchAsyncErrors(async (req,res,next) => {
    const {cartItemId} = req.body;
    const cartItem = await cartModel.findOneAndDelete({user:req.user._id,_id:cartItemId});
    if(!cartItem)return next(new ErrorHandler("Cart Item not Found",400));

    res.status(200).json({
        success:true
    })
})

exports.deleteAllCartItems = catchAsyncErrors(async(req,res,next)=>{
    await cartModel.deleteMany({user:req.user._id});
    res.status(200).json({
        success:true,
    })
})