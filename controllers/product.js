const Product = require("../models/Product");
const { catchAsync } = require("../utils/utils");

module.exports = {
  getAllProduct: catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    let products = Product.find(JSON.parse(query));
    console.log(req.query.price);
    console.log(query);
    console.log(products);

    if (req.query.page !== undefined) {
      const limit = req.query.limit;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }
    if (req.query.sort != undefined && req.query.orderby != undefined) {
      const sortObject = {};
      sortObject[req.querysort] = req.query.orderby === "asc" ? 1 : -1;
      products.sort(sortObject);
    }
    res.json({
      status: "success",
      data: await products,
    });
  }),

  createProduct: catchAsync(async (req, res) => {
    const { title, description, price, owner, avatar, tag } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      owner,
      avatar,
      tag,
    });
    res.json({
      status: "success",
      data: product,
    });
  }),
  uploadAvatar: async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.product,
      { avatar: req.file.path },
      { new: true }
    );
    res.json({ status: "success", data: product });
  },

  updateProduct: catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      status: "success",
      data: product,
    });
  }),

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(404).json();
  },
};
