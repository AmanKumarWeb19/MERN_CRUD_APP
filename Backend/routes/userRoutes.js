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
    if (user.length > 0) {
      res.status(200).send({ msg: "Login Successfull!", token: "abc123" });
    } else {
      res.status(400).send({ msg: "Login failed!" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});

userRouter.get("/details", (req, res) => {
  const { token } = req.query;

  if (token === "abc123") {
    res.status(200).send({ msg: "User Details" });
  } else {
    res.status(400).send({ msg: "access denied" });
  }
});

userRouter.get("/movie", (req, res) => {
  const { token } = req.query;

  if (token === "abc123") {
    res.status(200).send({ msg: "Movie Details" });
  } else {
    res.status(400).send({ msg: "login required cannot access" });
  }
});
module.exports = {
  userRouter,
};
