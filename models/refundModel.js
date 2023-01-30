const mongoose = require("mongoose")

const refundSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    user :{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports = mongoose.model("refund",refundSchema);