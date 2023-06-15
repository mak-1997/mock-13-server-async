const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const { username, email, password, image } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: err.message });
        } else {
          const newUser = new UserModel({
            username,
            email,
            password: hash,
            image,
          });
          await newUser.save();

          res.status(200).send({ msg: "Registration Successfull." });
        }
      });
    } else {
      res.status(400).send({
        msg: "Email already in use. Either login or use a different email.",
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              msg: "Login Successful !!",
              username: user.username,
              token: jwt.sign({ userID: user._id }, "signature"),
            });
        } else {
          res.status(400).send({ msg: "Wrong Password !!" });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Email !!" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = { userSignup, userLogin };
