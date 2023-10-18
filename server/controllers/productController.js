const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  req.body.user = req.user.id //to get the id of which user has created the item (basically createdBy)

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all the products data to display
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5; //results to show per page now taken as 5

  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// get single product/ details of it
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update product - Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product by the reference of the id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.deleteOne(); // delete the product

  res.status(200).json({
    success: true,
    message: "Product Deleted Succesfully",
  });
});
