const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Upload Image
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "Avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken(); //the field resetPasswordToken is now saved to database yet

  // saved to database
  await user.save({ validateBeforeSave: false });

  // const resetPasswordURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  // TEMPORARY - CHANGE THE TOKEN
  const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  // message to be sent to the email of the user
  const message = `Your password reset token is: - \n\n ${resetPasswordURL} \n\n If you have not request this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `EZCart Password Recovery`,
      message,
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

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating Hashed Token
  const resetPasswordToken = crypto
    .createHash("sha256") //sha265 is a method to hash
    .update(req.params.token) //update the resetTokem(in req.params.token) and hash it
    .digest("hex");

  // find the hashed token in the DB
  const user = await User.findOne({
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
    return next(new ErrorHandler("Password Does not match", 400));
  }

  // password changed
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user Detail - only if the user is logged in
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.UpdatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const PasswordMatched = await user.comparePassword(req.body.oldPassword); //function comparePassword defined in model/user.js

  if (!PasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Add new image url to the database
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    // deleting image from cloud
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    // Upload Image
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// get all users - ADMIN
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get single users - ADMIN
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role - BY ADMIN
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User Role - BY ADMIN
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  //TO DELETE PROFILE PHOTO LATER........

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with ${req.params.id}`, 400)
    );
  }

  // deleting image from cloud
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
