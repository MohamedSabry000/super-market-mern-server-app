const Product = require("../models/Product");
const { catchAsync } = require("../utils/utils");

module.exports = {
  findProductByID: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    req.productId = id;
    const product = await Product.findById(id);
    if (product === null) {
      return next({ status: "failure", message: "product not found" });
    }
    req.product = product;
    next();
  }),
  getProductById: catchAsync(async (req, res) => {
    res.json({
      status: "success",
      data: req.product,
    });
  }),
  getAllProduct: catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    let products = Product.find(JSON.parse(query));

    if (req.query.page !== undefined) {
      const limit = req.query.limit;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }
    if (req.query.sort != undefined && req.query.orderby != undefined) {
      const sortObject = {};
      sortObject[req.query.sort] = req.query.orderby === "asc" ? 1 : -1;
      products.sort(sortObject);
    }
    res.json({
      status: "success",
      data: await products,
    });
  }),

  createProduct: catchAsync(async (req, res, next) => {
    const { title, description, price, owner, avatar, tag } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      owner,
      tag,
      avatar,
    });
    res.json({ status: "success", data: product });
  }),
  uploadAvatar: catchAsync(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.productId,
      { avatar: req.file.path },
      { new: true }
    );
    res.json({ status: "success", data: product });
  }),

  updateProduct: catchAsync(async (req, res) => {
    const { id } = req.params;
    req.productId = id;
    const product = await Product.findByIdAndUpdate(req.productId, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      data: product,
    });
  }),

  deleteProduct: catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(404).json();
  }),
};
