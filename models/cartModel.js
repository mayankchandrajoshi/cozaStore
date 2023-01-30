const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"user",
    },
    name: {
        type: String,
        required: true,
    },
    itemSize : {
        type : String,
        required : true
    },
    itemColor : {
        type :String,
        required : true
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
})

module.exports = mongoose.model('cart',cartSchema);