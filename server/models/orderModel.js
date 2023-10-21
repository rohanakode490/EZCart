const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please enter the address of delivery location"],
    },
    city: {
      type: String,
      required: [true, "Please enter your city name"],
    },
    state: {
      type: String,
      required: [true, "Please enter your state name"],
    },
    country: {
      type: String,
      required: [true, "Please enter your country name"],
    },
    pincode: {
      type: Number,
      required: [true, "Please enter your pincode"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please enter your pincode"],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, "Please enter product Description"],
      },
      price: {
        type: Number,
        required: [true, "Please enter your pincode"],
      },
      quantity: {
        type: Number,
        required: [true, "Please enter your pincode"],
      },
      image: {
        type: String,
        required: [true, "Please enter your pincode"],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
