const productModel = require("../models/productModel");
const catchAsyncErrors = require('../utils/catchAsyncErrors')
const cloudinary = require("cloudinary")
const productApiFeatures = require("../utils/productApiFeatures");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const {name,desc,price,category,tags,size,material,discount} = req.body;

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }
    
    let quantity = 0;
    const productColors = [];
    
    for (const [key, colors] of Object.entries(size)) {
        for (const [color, stock] of Object.entries(colors)) {
            quantity+=stock;
            productColors.push(color);
        }
    }
    
    const productData={ name,desc,price:(price-((price*discount)/100)).toFixed(0),quantity,material,category,images:imagesLinks,size,color:[...new Set(productColors)],tags,soldBy:req.user._id,meta:{
        originalPrice:price,
        discount
    } };
    const product = await productModel.create(productData);

    res.status(200).json(product);
});

exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{

    const resultPerPage=8;
    const apiFilter = new productApiFeatures(productModel.find(),req.query).search().filter();
    let products = await apiFilter.query;

    const productCount=products.length;

    apiFilter.pagination(resultPerPage);
    products=await apiFilter.query.clone();

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage
    });
})

exports.getSingleProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await productModel.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    res.status(200).json({
        success: true,
        product,
    });
})

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    const { name,desc,price,material,category,tags,size,discount } = req.body;
    
    const newProductData ={
        name,desc,price:(price-((price*discount)/100)).toFixed(0),material,category,size,tags,meta:{
            originalPrice:price,
            discount 
        }
    }

    let quantity = 0;
    const productColors = [];
    for (const [key, colors] of Object.entries(size)) {
        for (const [color, stock] of Object.entries(colors)) {
            quantity+=stock;
            productColors.push(color);
        }
    }

    newProductData.quantity=quantity;
    newProductData.color=[...new Set(productColors)];

    if(req.body.images!=undefined){     
        const product = await productModel.findById(req.params.id);

        for(const image of product.images){
            await cloudinary.v2.uploader.destroy(image.public_id);
        }

        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        newProductData.images=imagesLinks;
    }
    
    const product = await productModel.findByIdAndUpdate(req.params.id,newProductData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
      if (product == null) return next(new ErrorHandler("Product not found", 404));
    
      res.status(200).json({
        success: true
      });
})

exports.deleteProduct  = catchAsyncErrors(async(req,res,next)=>{
    const product = await productModel.findById(req.params.id);

    if (product == null) return next(new ErrorHandler("Product not found", 404));

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({
        success: true,
        product,
    });
})