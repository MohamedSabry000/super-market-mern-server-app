const User = require('../models/User');
const { catchAsync } = require('../utils/utils');

module.exports = {
    findUserByID: catchAsync(async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            req.user = user;
            next();
        }
        catch {
            res.json({
                status: 'Faluier',
                message: 'User not found',
            })

        }

    }),
    getUserName: catchAsync(async (req, res) => {
        console.log("here");
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            res.json({
                status: 'success',
                data: user,
            })
        }
        catch {
            res.json({
                status: 'Faluier',
                message: 'User not found',
            })

        }
    }),
    getAllUsers: catchAsync(async (req, res) => {
        const users = await User.find();
        res.json({
            status: 'success',
            data: users,
        });
    }),
    getMyData: catchAsync(async (req, res) => {
        console.log("GetMyData");
        //  console.log(req);
        const user = await User.findById(req.id);
        console.log(user);
        res.json({
            status: 'success',
            data: user,
        });
    }),
    getUser: async (req, res) => {
        res.json({
            status: 'success',
            data: req.user
        });
    },
    createUser: catchAsync(async (req, res) => {
        console.log("Create User");
        console.log(req.body);
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
        console.log("Upload Avatar");
        console.log(req.body);
        const user = await User.findByIdAndUpdate(
            req.id,
            { avatar: `http://localhost:5000/static/storage/${req.body.file? req.body.file.path : "default-user.webp"}` },
            { new: true }
        );
        res.json({ status: 'success', data: user });
    },
    updateUser: async (req, res) => {
        console.log("update User");
        console.log(req.body);
        const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(id, req.body.body, {
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
