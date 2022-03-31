const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      unique: [true, "Product title is duplicate"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    tag: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
