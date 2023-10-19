const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should at least 8 characters"],
    select: false,
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// encrypting password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT tokens
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Passwords
UserSchema.methods.comparePassword = async function (InputPassword) {
  return await bcrypt.compare(InputPassword, this.password);
};

// Reset password token
UserSchema.methods.getResetPasswordToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex"); //Convert bytes to string

  // Hashing and adding resetPasswordToken to user Schema
  this.resetPasswordToken = crypto
    .createHash("sha256") //sha265 is a method to hash
    .update(resetToken) //update the resetTokem and hash it
    .digest("hex"); //digest() creates a buffer similar to randomBytes() (on line 67) and "hex" to convert it to string

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //giving 15 min to rest

  return resetToken; //sending this to the user email to reset the password
};

module.exports = mongoose.model("User", UserSchema);
