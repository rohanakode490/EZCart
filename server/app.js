const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');

// config
dotenv.config();


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	legacyHeaders: false, 
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
