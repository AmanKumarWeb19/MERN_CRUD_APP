// const express = require("express");
// const { UserModel } = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const userRouter = express.Router();

// userRouter.post("/register", async (req, res) => {
//   const payload = req.body;
//   try {
//     const user = new UserModel(payload);
//     await user.save();
//     res.send({ msg: "Register Successfully" });
//   } catch (error) {
//     res.send({ msg: "something went wrong", error: error.message });
//   }
// });

// // ...............................................................................................

// userRouter.post("/login", async (req, res) => {
//   const { email, pass } = req.body;
//   try {
//     const user = await UserModel.find({ email, pass });
//     if (user.length > 0) {
//       const token = jwt.sign({ name: "batman" }, "bruce");
//       res.status(200).send({ msg: "Login Successfull!", token: token });
//     } else {
//       res.status(400).send({ msg: "Login failed!" });
//     }
//   } catch (error) {
//     res.send({ msg: "something went wrong", error: error.message });
//   }
// });

// userRouter.get("/details", (req, res) => {
//   const token = req.headers.authorization;
//   jwt.verify(token, "bruce", (err, decoded) => {
//     if (decoded) {
//       res.status(200).send({ msg: "User Details" });
//     } else {
//       res.status(400).send({ msg: err.message });
//     }
//   });
// });

// userRouter.get("/movie", (req, res) => {
//   const token = req.headers.authorization;
//   jwt.verify(token, "bruce", (err, decoded) => {
//     if (decoded) {
//       res.status(200).send({ msg: "Movie Details" });
//     } else {
//       res.status(400).send({ msg: "access denied" });
//     }
//   });
// });

// module.exports = {
//   userRouter,
// };

const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");

userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "Err hashing password", error: err.message });
      } else {
        const user = new UserModel({ email, pass: hash, location, age });
        await user.save();
        res.send({ msg: "register Successful!" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "Can't Register!", error: error.message });
  }
});

/**................................................................................................ */

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        const token = jwt.sign({ course: "backend" }, "masai");
        if (result) {
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.status(400).send({ msg: "Wrong Credential" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "Can't Login!", error: error.message });
  }
});

/**................................................................................................ */

// userRouter.get("/details", (req, res) => {
//   const token = req.headers.authorization;
//   try {
//     jwt.verify(token, "bruce", (err, decoded) => {
//       if (decoded) {
//         res.send({ msg: "Details Page" });
//       } else {
//         res.send({ msg: "Login First!", err: err.message });
//       }
//     });
//   } catch (error) {
//     res.send({ msg: "Access denied Login First!", error: error.message });
//   }
// });

// /**............................................................................................... */

module.exports = {
  userRouter,
};
