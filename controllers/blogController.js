const blogModel = require('../models/blogModel'); 
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const cloudinary = require("cloudinary");
const ErrorHandler = require('../utils/errorHandler');
const blogApiFeatures  = require("../utils/blogApiFeatures")

exports.createBlog=catchAsyncErrors(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "blogs",
    });

    const {title,desc,tags,category} = req.body;
    
    const blog = await blogModel.create({
        title,desc,tags,createdBy:req.user._id,category,
        image: {
            public_id : myCloud.public_id,
            url: myCloud.url
        }
    })

    res.status(201).json({
        success:true,
        blog
    });
})

exports.getAllBlogs = catchAsyncErrors(async(req,res,next)=>{
    const blogsPerPage=3;
    const apiFilter = new blogApiFeatures(blogModel.find().populate("createdBy"), req.query).search().filter();
    let blogs = await apiFilter.query;

    const blogsCount=blogs.length;

    apiFilter.pagination(blogsPerPage);
    blogs=await apiFilter.query.clone();

    res.status(200).json({
        success:true,
        blogsCount,
        blogsPerPage,
        blogs
    });
})

exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await blogModel.findById(req.params.id).populate(["createdBy","comments.user"]);
    if (!blog) return next(new ErrorHandler("Blog not found", 404));
  
    res.status(200).json({
      success: true,
      blog,
    });
});

exports.updateBlog = catchAsyncErrors(async(req,res,next)=>{
    const {title,desc,tags,category,image} = req.body;

    const newBlogData={
        title,desc,tags,category
    }

    const previousBlog = await blogModel.findOne({_id:req.params.id,createdBy:req.user._id});
    if (previousBlog == null) return next(new ErrorHandler("Blog not found", 404));
    
    if(image!=undefined){
        const imageId = previousBlog.image.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "blogs"
        });

        newBlogData.image={
            public_id : myCloud.public_id,
            url: myCloud.url
        }
    }

    const blog = await blogModel.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},newBlogData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(200).json({
    success: true,
    blog,
    });
})


exports.deleteBlog = catchAsyncErrors(async(req,res,next)=>{
    const blog = await blogModel.findOneAndDelete({_id:req.params.id,createdBy:req.user._id});

    if (blog == null) return next(new ErrorHandler("Blog not found", 404));

    // Cloudinary images 
    const imageId = blog.image.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json({
      success: true
    });
})

exports.createBlogComment = catchAsyncErrors(async (req,res,next)=>{
    const { comment } = req.body;
    const userComment={
        user:req.user._id,
        name:req.user.name,
        comment
    }

    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("blog not found", 404));
    }

    const CommentCount=blog.noOfComments;
    blog.comments=blog.comments.filter((com)=>com.user.toString()!=req.user._id.toString());

    if(CommentCount===blog.comments.length) blog.noOfComments=blog.noOfComments+1;

    blog.comments.push(userComment);
    await blog.save({ validateBeforeSave: true });

    res.status(200).json({
        success:true,
    })
})

exports.getBlogComments = catchAsyncErrors(async (req, res, next) => {
    let blog = await blogModel.findById(req.params.id).populate("comments.user");

    if (!blog) {
      return next(new ErrorHandler("blog not found", 404));
    }
  
    res.status(200).json({
      success: true,
      comments: blog.comments,
    });
});

exports.getBlogComment = catchAsyncErrors(async(req,res,next)=>{
    const comments = await blogModel.findOne({_id:req.params.id,comment:{$elemMatch:{user:req.user._id}}}).select(["comments"]);
    if(!comments) return next(new ErrorHandler("Blog comment not found",404));

    res.status(200).json({
        success:true,
        comment:comments.comments.filter(comment=>comment.user.toString()===req.user._id.toString())[0],
    })
})