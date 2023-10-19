// Creating Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken(); //function getJWTToken defined in model/user.js

  // cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // in milliseconds
    ),
    htttpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
