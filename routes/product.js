const express = require('express');
const { getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product')

const router = express.Router();

// http:://localhost:5000/posts
router.get('/', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// router.patch('/:id/likePost', likePost);

module.exports = router;