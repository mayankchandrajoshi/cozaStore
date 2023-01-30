//Making Error MiddleWare
const error = (err, req, res, next) => {
  
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // MongoDb Errors
  if(err.name=="CastError"){
    err.message="Resource not found.Invalid "+err.path;
    err.statusCode=400;
  }

  // Mongoose duplicate key error
  if(err.code==11000){
    err.message=`Duplicate ${Object.keys(err.keyValue)} entered`;
    err.statusCode=400;
  }

   // Wrong JWT error
   if (err.name === "JsonWebTokenError") {
    err.message = `Json Web Token is invalid, Try again `;
    err.statusCode=400;
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    err.message = `Json Web Token is Expired, Try again `;
    err.statuscode=400;
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
};

module.exports = error;