const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { catchAsync } = require("../utils/utils");

module.exports = {
  login: async (req, res) => {
    console.log(req.body);
    const { email, password } = JSON.parse(req.body.body);
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        status: "failure",
        message: "invalid email or password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.json({ status: "success", token });
  },
  signup: catchAsync(async (req, res) => {
    const { name, email, password, address,
      phone, avatar } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "failure",
        message: "invalid email or password",
      });
    }

    const user = await User.create({ name, email, password, address, phone });
    let token;
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({
      status: "success",
      data: user,
      token: token,
    });
  }),
  authenticated: (req, res, next) => {
    try {

      const token = req.headers.authorization.split(" "[1]);
      console.log("token:: ", token[0]);
      const decodedToken = jwt.verify(token[0], process.env.JWT_SECRET);
      console.log("decodedToken ", decodedToken);
      const { userId } = decodedToken;
      console.log(userId);

      req.userId = userId;
      return next();
    } catch (err) {
      res.json({
        status: "failure",
        message: "You are not authenticated",
        err: err,
      });
    }
  },
};
