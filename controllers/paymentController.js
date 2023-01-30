const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require('../utils/errorHandler');
const Razorpay = require('razorpay');
const crypto = require("crypto");
const orderModel = require("../models/orderModel");
const refundModel = require("../models/refundModel");

exports.getPaymentApiKey = (req,res) =>{
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
}

exports.createOrderId = catchAsyncErrors(async (req,res,next)=>{
    const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY })

    const options = {
        amount: Number(req.body.amount*100),  
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    await refundModel.create({_id:order.id,user:req.user._id});

    res.status(200).json({
        success: true,
        order,
    });
})

exports.paymentVerification=catchAsyncErrors(async (req, res) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        await orderModel.findByIdAndUpdate(orderId,{payment:{
            paymentId:razorpay_payment_id,
            orderId:razorpay_order_id,
            status:'done'
        }});
        await refundModel.findOneAndDelete({_id:razorpay_order_id,user:req.user._id});  
        return res.status(200).json({ message: "Order Placed Successfully" });
    } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
    }
});

exports.deleteMyRefund = catchAsyncErrors(async(req,res,next)=>{
    const refund = await refundModel.findOneAndDelete({_id:req.params.id,user:req.user._id});
    if(!refund){
        return next(new ErrorHandler("Refund not found", 404));
    }
    res.status(200).json({
        success:true
    })
})

exports.deleteRefund = catchAsyncErrors(async(req,res,next)=>{
    const refund = await refundModel.findOneAndDelete({_id:req.params.id});
    if(!refund){
        return next(new ErrorHandler("Refund not found", 404));
    }
    res.status(200).json({
        success:true
    })
})