const express = require("express");
const router = express.Router();

const { loginUser, getUser, registerUser } = require("../controller/auth");

router.route("/").get(getUser).post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
