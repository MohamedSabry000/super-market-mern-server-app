const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { catchAsync } = require("../utils/utils");

module.exports = {
  login: async (req, res) => {
    console.log("Sign In");
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
    console.log("Sign Up");
    // console.log(req.body);
    let { name, email, password, address, phone, avatar } = JSON.parse(req.body.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "failure",
        message: "invalid email or password",
      });
    }

    if(avatar === undefined){
      avatar = "http://localhost:5000/static/storage/default-user.webp";
    }

    const user = await User.create({ name, email, password, address, phone, avatar });
    let token;
    token = jwt.sign(
      { id: user.id, email: user.email },
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
      console.log("Authenticated");
      // console.log(req);
      const token = req.headers.authorization? req.headers.authorization.split(" ")[1] : req.body.headers.authorization.split(" ")[1];
      console.log("token:: ", token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decodedToken;
      console.log(id);
      req.id = id;
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
