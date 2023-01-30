const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      color:{
        type:String,
        required:true,
      },
      size:{
        type:String,
        required:true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true,
      },
    },
  ],
  shippingInfo: {
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    area : {
      type:String,
      required:true,
    },
    house : {
      type:String,
      required:true
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  payment: {
    paymentId:{
      type:String,
    },
    orderId: {
      type:String
    },
    status: {
      type:String,
      default:"pending"
    }
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema)