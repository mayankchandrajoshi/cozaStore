const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    product: {
        type:mongoose.Schema.ObjectId,
        ref:"product",
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    rating:{
        type:Number,
        required:[true,"Rating is required"]
    },
    comment:{
        type:String,
        required:[true,"Comment is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('productReview',reviewSchema);