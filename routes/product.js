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
} = require("../controllers/product");

const router = express.Router();

// http:://localhost:5000/posts

router.use("/:id", findProductByID);
router.post("/", createProduct);
router.post("/:id", upload.single("avatar"), uploadAvatar);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
