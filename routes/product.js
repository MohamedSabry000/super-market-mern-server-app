import express from 'express';

import {getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/product.js'

const router = express.Router();

// http:://localhost:5000/posts
router.get('/', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// router.patch('/:id/likePost', likePost);

export default router;