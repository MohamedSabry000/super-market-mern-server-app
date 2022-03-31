const express = require('express');
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product')

const router = express.Router();

// http:://localhost:5000/posts
router.get('/', getAllProducts);
router.post('/', createProduct);

router.get('/', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// router.patch('/:id/likePost', likePost);

module.exports = router;