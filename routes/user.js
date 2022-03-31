const express = require('express');
const upload = require('../utils/file-storage');
const { authenticated, login, signup } = require('../controllers/auth');
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    findUserByID,
    uploadAvatar,
} = require('../controllers/user')
const router = express.Router();

// http:://localhost:5000/posts
router.get('/login', login);
router.post('/signup', signup);
router.post(
    '/avatar',
    authenticated,
    upload.single('avatar'),
    uploadAvatar
);
router.get('/', authenticated, getAllUsers);
router.post('/', createUser);
router.use('/:id', authenticated, findUserByID);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
// router.get('/:id', getUser);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);
// router.patch('/:id/likePost', likePost);

module.exports = router;