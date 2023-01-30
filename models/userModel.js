const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [3, "Name cannot be less than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  address : {
    type:String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Hash password before saving user document
userSchema.pre("save", async function (next) {
  // Skip is password is not modified
  if (!this.isModified("password")) {
    next();
    return;
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// JWT Token
userSchema.methods.getJWTToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
