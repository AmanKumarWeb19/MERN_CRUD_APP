const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../models/noteModel");

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ msg: "Not get any notes", error: error.message });
  }
});

noteRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(200).send({ msg: "A New Note has been added" });
  } catch (error) {
    res.status(400).send({ msg: "Not Added", error: error.message });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
    res.status(200).send({ msg: "Upadte SuccessFul" });
  } catch (error) {
    res.status(400).send({ msg: "not Updated", error: error.message });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: ID });
    res.status(200).send({ msg: "Delete SuccessFul" });
  } catch (error) {
    res.status(400).send({ msg: "not deleted", error: error.message });
  }
});

module.exports = {
  noteRouter,
};
