const Product = require("../models/Product");
const { catchAsync } = require("../utils/utils");

module.exports = {
  // Get single Product
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
  /**********/
  getProductById: catchAsync(async (req, res) => {
    res.json({
      status: "success",
      data: req.product,
    });
  }),
  // Get Product by user id
  getUserProducts: catchAsync(async (req, res) => {
    const ownerId = req.id;
    console.log("ownerId ::: ", ownerId);
    const products = await Product.find({ 'owner': ownerId });

    if (req.query.page !== undefined) {
      const limit = req.query.limit || 10;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }

    console.log(products);
    res.json({
      status: "success",
      data: products,
    });
  }),
  // Get all products by category
  getProductsByCategory: catchAsync(async (req, res) => {
    // const ownerId = req.id;
    // console.log("Key ::: ", req.query);
    const { key } = req.query;
    console.log("tag ::: ", key);
    const products = await Product.find({ 'tag': { $regex: '.*' + key + '.*' } });

    if (req.query.page !== undefined) {
      const limit = req.query.limit || 10;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }

    console.log(products);
    res.json({
      status: "success",
      data: products,
    });
  }),
  // Get all products by category related to user
  getOwnedProductsByCategory: catchAsync(async (req, res) => {
    const ownerId = req.id;
    // console.log("ownerId ::: ", req.query);
    const { key } = req.query;
    // console.log("tag ::: ", key);
    console.log("ownerId ::: ", ownerId);
    const products = await Product.find({ 'tag': { $regex: '.*' + key + '.*' }, 'owner': ownerId });
    
    if (req.query.page !== undefined) {
      const limit = req.query.limit || 10;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }

    console.log(products);
    res.json({
      status: "success",
      data: products,
    });
  }),
  // Get all products
  getAllProduct: catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    console.log("Query: ", query);
    let products = Product.find(JSON.parse(query));

    if (req.query.page !== undefined) {
      const limit = req.query.limit || 10;
      products.skip((+req.query.page - 1) * limit);
      products.limit(limit);
    }
    if (req.query.sort != undefined && req.query.orderby != undefined) {
      const sortObject = {};
      sortObject[req.query.sort] = req.query.orderby === "asc" ? 1 : -1;
      products.sort(sortObject);
    }
    console.log(req.query.sort);
    res.json({
      status: "success",
      data: await products,
    });
  }),
  // Create Product
  createProduct: catchAsync(async (req, res, next) => {
    console.log("create Product");
    console.log(req.body);
    
    let { title, description, price, tag, avatar } = JSON.parse( req.body.body );
    (title?.length <= 0 || price <= 0 || tag?.length <= 0) && res.json({ status: "failure", message: "All data must be valid" }) ;
    const owner = req.id;

    if(avatar === undefined){
      avatar = "http://localhost:5000/static/storage/default-product.png";
    }
    const product = await Product.create({ title, description, price, owner, tag, avatar });
    res.json({ status: "success", data: product });
  }),
  // Upload Product Image
  uploadAvatar: catchAsync(async (req, res) => {
    console.log("Body: ",req.body);
    const product = await Product.findByIdAndUpdate(
      req.productId,
      { avatar: `http://localhost:5000/static/storage/${req.body.file? req.body.file.path : "default-product.png"}` },
      { new: true }
    );
    res.json({ status: "success", data: product });
  }),
  // Update Product
  updateProduct: catchAsync(async (req, res) => {
    const { id } = req.params;
    req.productId = id;
    console.log(req.body.body);
    const { title, price, tag } = JSON.parse( req.body.body );
    (title?.length <= 0 || price <= 0 || tag?.length <= 0) && res.json({ status: "failure", message: "All data must be valid" }) ;

    const product = await Product.findByIdAndUpdate(req.productId, JSON.parse(req.body.body), {
      new: true,
    });
    res.json({
      status: "success",
      data: product,
    });
  }),
  // Delete Product
  deleteProduct: catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({
      status: "success",
    });
  }),
};
