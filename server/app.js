const express = require("express");
const app = express();

app.use(express.json());
// Routes
const product = require("./routes/productRoute");
const errorMiddleware = require("./middleware/error");


app.use("/api/v1", product);

// middleware for error
app.use(errorMiddleware);

module.exports = app;
