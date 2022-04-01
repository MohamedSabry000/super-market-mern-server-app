const express = require("express");
const upload = require("../utils/file-storage");
const { authenticated } = require("../controllers/auth");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadAvatar,
  getProductById,
  findProductByID,
  getUserProducts
} = require("../controllers/product");

const router = express.Router();

// http:://localhost:5000/posts
router.get("/userproducts/:id", getUserProducts);
router.use("/:id", findProductByID);
router.patch("/:id", upload.single("avatar"), uploadAvatar);

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
