require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { noteRouter } = require("./routes/noteRoutes");
const { auth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("WELCOME TO MY SERVER");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log({ msg: "Didn't Connected", error: error.message });
  }
  console.log(`Server is Running at Port ${process.env.PORT}`);
});
