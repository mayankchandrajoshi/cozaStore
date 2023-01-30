const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type:String,
        required : true,
    },
    desc: {
        type:String,
        required :true,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    tags : {
        type:Array,
    },
    category : {
        type:Array,
        required:true
    },
    noOfComments : {
        type: Number,
        default:0,
    },
    comments : [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref: "user",
                required: true,
            },
            comment: {
                type: String,
                required:[true,"Comment is required"],
                maxLength : [140,'comment cannot exceed 60 characters'],
            },
        }
    ],
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt : {
        type:Date,
        default : Date.now,
    }
})

module.exports = mongoose.model('blog',blogSchema);