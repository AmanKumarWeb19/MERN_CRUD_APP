require("dotenv").config()
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO MY SERVER");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at Port ${process.env.PORT}`);
});
