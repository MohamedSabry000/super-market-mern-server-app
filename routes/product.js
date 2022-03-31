const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadAvatar,
} = require("../controllers/product");

const router = express.Router();

// http:://localhost:5000/posts
router.get("/", getAllProduct);
router.post("/", createProduct);
router.get("/", uploadAvatar);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// router.patch('/:id/likePost', likePost);

module.exports = router;
