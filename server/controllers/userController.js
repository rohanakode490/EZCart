const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sampleid",
      url: "sampleurl",
    },
  });

  sendToken(user, 200, res);
});

// Login Functionality
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // if the information is not filled
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const PasswordMatched = await user.comparePassword(password); //function comparePassword defined in model/user.js

  if (!PasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout Functionality
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out Successfully",
  });
});

// Password Reset / Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return new ErrorHandler("User not found", 404);
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken(); //the field resetPasswordToken is now saved to database yet

  // saved to database
  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset${resetToken}`;

  // message to be sent to the email of the user
  const message = `Your password reset token is: - \n\n ${resetPasswordURL} \n\n If you have not request this email then, please ignore this email.`;

  try {
    await sendEmail({
      email:user.email,
      subject:`EZCart Password Recovery`,
      message
    });

    res.status(200).json({
      message: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
