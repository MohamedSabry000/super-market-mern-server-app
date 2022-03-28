import express from 'express';

import {getUser, createUser, updateUser, deleteUser} from '../controllers/user.js'

const router = express.Router();

// http:://localhost:5000/posts
router.get('/', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
// router.patch('/:id/likePost', likePost);

export default router;