const catchAsyncErrors=controller=>(req,res,next) => {
    Promise.resolve(controller(req,res,next)).catch((err)=>{
        next(err);
    });
}

module.exports=catchAsyncErrors;