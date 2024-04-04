const express = require("express");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    await user.save();
    res.send({ msg: "Register Successfully" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});

// ...............................................................................................

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email, pass });
    console.log(user);
    res.send({ msg: "Login Successfully" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});

module.exports = {
  userRouter,
};
