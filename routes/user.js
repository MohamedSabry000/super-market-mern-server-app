const express = require("express");
const upload = require("../utils/file-storage");
const { authenticated, login, signup } = require("../controllers/auth");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  findUserByID,
  uploadAvatar,
} = require("../controllers/user");
const router = express.Router();

// http:://localhost:5000/posts
router.route("/").get(authenticated, getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(authenticated, updateUser).delete(authenticated, deleteUser);

router.get("/login", login);
router.get("/signup", signup);
router.post("/avatar", authenticated, upload.single("avatar"), uploadAvatar);

module.exports = router;
