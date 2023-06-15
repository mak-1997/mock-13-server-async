const express = require("express");
const {userSignup, userLogin} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", userSignup);
userRouter.post("/login", userLogin);

module.exports = { userRouter };
