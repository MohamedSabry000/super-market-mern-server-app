const Product = require("../models/Product");
const { catchAsync } = require("../utils/utils");
module.exports = {
  getAllProduct: catchAsync(async (req, res) => {
    const products = await User.find();
    res.json({
      status: "success",
      data: products,
    });
  }),
  createProduct: async (req, res) => {
    console.log("createProduct");
  },
  updateProduct: async (req, res) => {
    console.log("updateProduct");
  },
  updateProduct: async (req, res) => {
    console.log("updateProduct");
  },
  deleteProduct: async (req, res) => {
    console.log("deleteProduct");
  },
};
