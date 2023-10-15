const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`MongoDb connected with server`);
    })
};

module.exports = connectDB;
