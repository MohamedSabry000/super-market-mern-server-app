const User = require('../models/User');
const { catchAsync } = require('../utils/utils');

module.exports = {
    getAllUsers: catchAsync(async (req, res) => {
        const users = await User.find();
        res.json({
            status: 'success',
            data: users,
        });
    }),
    createUser: catchAsync(async (req, res) => {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });
        res.json({
            status: 'success',
            data: user,
        });
    }),
    uploadAvatar: async (req, res) => {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { avatar: req.file.path },
            { new: true }
        );
        res.json({ status: 'success', data: user });
    },
    updateUser: async (req, res) => {
        console.log('updateProduct');
    }
    ,
    deleteUser: async (req, res) => {
        console.log('deleteProduct');
    }

};
