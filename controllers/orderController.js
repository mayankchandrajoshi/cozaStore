const catchAsyncErrors = require("../utils/catchAsyncErrors");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const { startSession } = require('mongoose')

const cron = require("node-cron")

cron.schedule("*/15 * * * *",async function() {
    try {
        const orders = await orderModel.find({"payment.status":"pending",createdAt:{ $lt: Date.now()-30*60000 }});
        
        for(const order of orders){
            for (const orderItem of order.orderItems) {
                const product = await productModel.findById(orderItem.product);
                product.size[orderItem.size][orderItem.color]+=orderItem.quantity;
                product.quantity += orderItem.quantity;
                product.sold -= orderItem.quantity;
                await productModel.findByIdAndUpdate(orderItem.product,{quantity:product.quantity,size:product.size,sold:product.sold});
            };
            await order.remove();
        }
    } catch (error) {

    }
});

exports.createOrder = async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
    } = req.body;

    const session = await startSession();
    try {
        session.startTransaction()
        for (const orderItem of orderItems) {
            const product = await productModel.findById(orderItem.product,null,{session});
            product.size[orderItem.size][orderItem.color]-=orderItem.quantity;
            product.quantity -= orderItem.quantity;
            product.sold += orderItem.quantity;
            await productModel.findByIdAndUpdate(orderItem.product,{quantity:product.quantity,size:product.size,sold:product.sold},{runValidators: true,session});
        };
        
        const order = await orderModel.create([{
            shippingInfo,
            orderItems,
            itemsPrice,
            shippingPrice,
            user: req.user._id,
        }],{session}); 

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
        await session.abortTransaction()
        session.endSession()
        res.status(400).json({
            success:false,
            message:"Order not created"
        })
    }
};

exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders = await orderModel.find();

    res.status(200).json({
        success: true,
        orders
    });
})

exports.myOrders= catchAsyncErrors(async(req,res,next)=>{
    const orderPerPage = 10;
    let orders = await orderModel.find({user:req.user._id,"payment.status":"done"}).sort("createdAt");
    const totalOrdersCount = orders.length;
    orders = await orderModel.find({user:req.user._id,"payment.status":"done"}).sort({"createdAt":-1}).skip(orderPerPage*(req.query.page-1)).limit(orderPerPage);
    
    res.status(200).json({
        success:true,
        orders,
        totalOrdersCount,
        orderPerPage
    })
})

exports.getOrderDetails = catchAsyncErrors(async(req,res,next)=>{
    const order = await orderModel.findOne({_id:req.params.id,user:req.user._id});

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
})

exports.getOrderDetailsAdmin = catchAsyncErrors(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
})

exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
})

exports.deleteMyOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await orderModel.findOne({_id:req.params.id,user:req.user._id,"payment.status":"pending"});
    
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    for (const orderItem of order.orderItems) {
        const product = await productModel.findById(orderItem.product);
        product.size[orderItem.size][orderItem.color]+=orderItem.quantity;
        product.quantity += orderItem.quantity;
        product.sold -= orderItem.quantity;
        await productModel.findByIdAndUpdate(orderItem.product,{quantity:product.quantity,size:product.size,sold:product.sold});
    };

    await order.remove();

    res.status(200).json({
        success: true,
    });
})