const express = require("express");

const router = express.Router();

const { loginUser } = require("../controller/authController");

router.post("/login", loginUser);
//router.post("/signup", registerUser);

module.exports = router;
