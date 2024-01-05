const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // adding images
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id; //to get the id of which user has created the item (basically createdBy)

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all the products data to display
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 5; //how many products to show
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // in filtering of front-end part pagination was same as resultPerPage even though the filtered products were less and extra page was showing

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Products - Admin
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
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

  // Images Array
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];
    // upload new images link
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne(); // delete the product

  res.status(200).json({
    success: true,
    message: "Product Deleted Succesfully",
  });
});

// Create / Update Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // find Product
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // update
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    // create
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  // find Product
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  // find Product
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  //reviews to be kept
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString() //review of id
  );

  //new avg of ratings
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  //new ratings 
  let ratings = 0;
  
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  
  // new number of reviews
  const numberOfReviews = reviews.length;


  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
