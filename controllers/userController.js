const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    if(!req.body.avatar||req.body.avatar==="null"){
      return next(new ErrorHandler("Please enter valid photo",400));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await userModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.url,
      },
    });
    sendToken(user, 201, res);
  });
  
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    if (!email || !password) return next(new ErrorHandler("Please Enter email and password"), 400);

    const user=await userModel.findOne({email}).select("+password");
    if(!user)return next(new ErrorHandler("Please Enter valid email and password"),400);

    const comparePassword=await user.comparePassword(password);
    if(!comparePassword)return next(new ErrorHandler("Please Enter valid email and password"),400);
    
    sendToken(user, 200, res);
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
  

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIt is only valid for next 15minutes. \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `CozaStore Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

  const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
      return next(
      new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
      )
      );
  }

  if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match confirm password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


exports.getUserDetails = (req, res, next) => {
  if(!req.user) return next(new ErrorHandler("Please Login to access this resource",400));
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await userModel.findById(req.user._id).select("+password");

  const comparePassword = await user.comparePassword(oldPassword);

  if (!comparePassword) {
      return next(new ErrorHandler("Please Enter correct old Password", 401));
  }
  if (!newPassword || !confirmPassword) {
      return next(
      new ErrorHandler("Please Enter password and confirm Password", 400)
      );
  }

  if (newPassword != confirmPassword) {
      return next(new ErrorHandler("Password and Confirm password doesnt match", 400));
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user details
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
      name: req.body.name,
      email: req.body.email,
  };

  if (req.body.avatar !== "") {
      const user = await userModel.findById(req.user._id);
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
      });
      newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await userModel.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
  });
});
