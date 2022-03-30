const User = require('../models/User');
const { catchAsync } = require('../utils/utils');

module.exports = {
    findUserByID: catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user === null) {
            return next({ status: 'failure', message: 'user not found' });
        }
        req.user = user;
        next();
    }),
    getAllUsers: catchAsync(async (req, res) => {
        const users = await User.find();
        res.json({
            status: 'success',
            data: users,
        });
    }),
    getUser: async (req, res) => {
        res.json({
            status: 'success',
            data: req.user
        });
    },
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
        console.log(">........", req.userId
        );
        console.log(">........", req.file.path);
        const user = await User.findByIdAndUpdate(
            req.userId,
            { avatar: req.file.path },
            { new: true }
        );
        res.json({ status: 'success', data: user });
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });

            res.json({
                status: 'success',
                data: user
            });
        } catch (error) {
            res.status(500).json({ status: 'failure', message: err.message });
        }
    }
    ,
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            await User.findByIdAndDelete(id);


            res.json({
                status: 'success',
                message: "deleted"
            });
        } catch (error) {
            res.status(500).json({ status: 'failure', message: err.message });
        }
    }

};
