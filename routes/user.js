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
    getMyData
} = require('../controllers/user')
const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.post(
    '/avatar',
    authenticated,
    upload.single('avatar'),
    uploadAvatar
);
//router.get('/', authenticated, getAllUsers);
router.get('/', authenticated, getMyData);
router.post('/', createUser);
router.use('/:id', authenticated, findUserByID);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;