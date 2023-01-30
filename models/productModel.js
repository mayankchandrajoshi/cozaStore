const  mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a product name"],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, "Please Enter a product description"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: 8,
    },
    quantity : {
        type:Number,
        maxLength: [4, "Stock cannot exceed 4 digits"],
        min:[0,"Stock cannot be less than zero"],
        default:0,
    },
    material : {
        type:String,
        required : true
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          _id: false,
        },
    ],
    category: {
        type: Array,
        required: [true, "Please enter product category"],
    },
    size : {
        type:Object,
        required:true,
        validate : {
            validator:function(sizes){
                for (const [size, colors] of Object.entries(sizes)) {
                    for (const [color, stock] of Object.entries(colors)) {
                        if(stock<0) return false;
                    }
                }
                return true;
            },
            message: props => 'Quantity cannot be less than 0'
        }
    },
    color : {
        type:Array,
        required: [true,'Please Enter Product Color']
    },
    tags : {
        type: Array
    },
    numofReviews: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    sold : {
        type:Number,
        default : 0
    },
    soldBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    meta : {
        originalPrice:{
            type:Number,
            required:true,
        },
        discount : {
            type:Number,
            required:true,
            default:0
        }
    }
})

module.exports = mongoose.model('product',productSchema);