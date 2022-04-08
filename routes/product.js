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
  getProductsByCategory,
  getOwnedProductsByCategory,
  getUserProducts
} = require("../controllers/product");

const router = express.Router();

// http:://localhost:5000/posts
router.post("/userproducts", authenticated, getUserProducts);


router.post("/", authenticated, createProduct);
router.get("/", getAllProduct);

router.get("/find", getProductsByCategory);
router.get("/findByUser", authenticated, getOwnedProductsByCategory);

router.use("/:id", findProductByID);
router.patch("/:id", authenticated, upload.single("avatar"), uploadAvatar);
router.get("/:id", getProductById);
router.post("/:id",authenticated, updateProduct);
router.delete("/:id", authenticated, deleteProduct);

module.exports = router;
