const express = require("express");
const upload = require("../utils/file-storage");
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
router.post("/avatar", upload.single("avatar"), uploadAvatar);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
// router.patch("/:id", uploadAvatar);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// router.patch('/:id/likePost', likePost);

module.exports = router;
