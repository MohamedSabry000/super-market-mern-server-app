const Product = require("../models/Product");
const { catchAsync } = require("../utils/utils");
module.exports = {
  getAllProducts: catchAsync(async (req, res) => {
    const products = await User.find();
    res.json({
      status: "success",
      data: products,
    });
  }),
  createProduct: async (req, res) => {
    console.log("createProduct");
  },
  getProduct: async (req, res) => {
    console.log("get a product");
  },
  updateProduct: async (req, res) => {
    console.log("updateProduct");
  },
  deleteProduct: async (req, res) => {
    console.log("deleteProduct");
  },
};
