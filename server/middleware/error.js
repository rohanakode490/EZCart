const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // if wrong id / short id is given
  if (err.name === "CastError") {
    const message = `Resource not found.\n Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
