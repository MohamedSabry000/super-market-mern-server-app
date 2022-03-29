const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { catchAsync } = require('../utils/utils');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        status: 'failure',
        message: 'invalid email or password',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    res.json({ status: 'success', token });
  },
  signup: catchAsync(async (req, res) => { }),
  authenticated: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decodedToken;
      req.userId = id;
      return next();
    } catch (err) {
      res.json({
        status: 'failure',
        message: 'You are not authenticated',
        err: err,
      });
    }
  },
};
